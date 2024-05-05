import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { Prisma } from "../../../../../../prisma/prisma";
import { NextRequest } from "next/server";
import { per_page } from "@/lib/constants";
import { DELETE_FILE } from "@/lib/cloudinary";
import { role } from "@prisma/client";
import { franchiseSchema } from "@/lib/schema";
import { z } from "zod";
import {
    PrismaClientKnownRequestError,
    PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export const dynamic = "force-dynamic";

export const POST = async (req: Request) => {
    try {
        /**
         * CHECK ADMIN IS LOGIN
         */
        const session = await getServerSession(authOptions);
        if (!session?.user || session?.user.role !== "ADMIN") {
            return Response.json({
                message: "Unauthorized",
            });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return Response.json({
                message: "id is required",
                success: false,
            });
        }

        const data: z.infer<typeof franchiseSchema> = await req.json();

        /**
         * VALIDATE DATA
         */
        const dataVerify = franchiseSchema.safeParse(data);

        if (!dataVerify.success) {
            return Response.json(
                {
                    message:
                        dataVerify?.error! || "Please fill all requirements",
                    success: false,
                },
                {
                    status: 400,
                }
            );
        }

        /**
         * CHECk USER EXIST
         * BY EMAIL
         * BY USER ID
         */

        const isUserExist = await Prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email: data.email,
                    },
                    {
                        userId: data.userId,
                    },
                ],
            },
        });

        if (isUserExist) {
            return Response.json(
                {
                    message: "Franchise already exist with email Id or user Id",
                    success: false,
                },
                {
                    status: 400,
                }
            );
        }

        /**
         * CREATE FRANCHISE
         */

        const user = await Prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                img: data.img,
                phone: data.phone,
                branch: data.branch,
                userId: data.userId,
                password: data.password,
                address: {
                    state: data.state,
                    district: data.district,
                    pincode: data.pincode,
                    street: data.address,
                },
            },
        });

        if (!user) {
            return Response.json(
                {
                    message: "User not registered. some error occurred",
                    success: false,
                },
                { status: 500 }
            );
        }

        await Prisma.userApplication.delete({
            where: {
                id,
            },
        });

        return Response.json(
            {
                message: "user registered and application Deleted successfully",
                success: true,
                user,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.log("user application accept", error);
        return Response.json(
            {
                message:
                    (error as PrismaClientKnownRequestError)?.meta?.cause ||
                    "Internal error",
                success: false,
            },
            { status: 500 }
        );
    }
};

export const GET = async (req: NextRequest) => {
    try {
        /**
         * CHECK SESSION IS AVAILABLE
         */

        const session = await getServerSession(authOptions);
        if (!session || session.user.role === "FRANCHISE") {
            return Response.json({ message: "Unauthorized", success: false });
        }

        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1;

        /**
         * GET APPLICATIONS
         */

        const applications = await Prisma.userApplication.findMany({
            take: per_page,
            skip: per_page * (page - 1),
        });
        const total = await Prisma.userApplication.count({
            take: per_page,
            skip: per_page * (page - 1),
        });

        if (!applications) {
            return Response.json({
                message: "User's application fetching failed",
                success: false,
            });
        }

        return Response.json({
            applications,
            total,
            success: true,
        });
    } catch (error) {
        console.log("USERS APPLICATION ", error);
        return Response.json(
            {
                message: "Something went wrong while fetching application.",
                success: false,
            },
            {
                status: 500,
            }
        );
    }
};

/**
 * DELETE Application
 */

export const DELETE = async (req: Request) => {
    try {
        /**
         * CHECK ADMIN OR FRENCHISE IS LOGIN
         */

        const session = await getServerSession(authOptions);
        if (!session) {
            return Response.json({ message: "Unauthorized", success: false });
        }

        /**
         * CHECK FRANCHISE IS ACTIVE OR NOT
         */

        if (session?.user.role === role.FRANCHISE) {
            return Response.json({
                message: "Unauthorized",
                success: false,
            });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return Response.json({
                message: "id is required",
                success: false,
            });
        }

        const application = await Prisma.userApplication.delete({
            where: {
                id,
            },
        });

        if (!application) {
            return Response.json({
                message: "Invalid id",
                success: false,
            });
        }
        await DELETE_FILE(application.img);

        return Response.json({
            message: "application Deleted successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return Response.json({ message: "Internal Error" });
    }
};
