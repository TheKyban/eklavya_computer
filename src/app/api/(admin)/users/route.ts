import { franchiseEditSchema, franchiseSchema } from "@/lib/schema";
import { NextResponse } from "next/server";
import { Prisma } from "../../../../../prisma/prisma";
import { z } from "zod";
import { per_page } from "@/lib/constants";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { role as ROLE } from "@prisma/client";
import { del } from "@vercel/blob";

/**
 * CREATE USER
 */

export const POST = async (req: Request) => {
    try {
        /**
         * CHECK ADMIN IS LOGIN
         */
        const session = await getServerSession(authOptions);
        if (!session?.user || session?.user.role !== "ADMIN") {
            return NextResponse.json({
                message: "Unauthorized",
            });
        }

        const data: z.infer<typeof franchiseSchema> = await req.json();

        /**
         * VALIDATE DATA
         */

        const { success } = franchiseSchema.safeParse(data);

        if (!success) {
            return NextResponse.json({
                message: "Please fill all requirements",
                success: false,
            });
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
            return NextResponse.json({
                message: "Franchise already exist with email Id or user Id",
                success: false,
            });
        }

        /**
         * CREATE FRANCHISE
         */
        const {
            name,
            email,
            img,
            phone,
            address,
            branch,
            district,
            password,
            pincode,
            state,
            userId,
        } = data;
        const franchise = await Prisma.user.create({
            data: {
                name,
                email,
                img,
                phone,
                branch,
                userId,
                password,
                address: {
                    state,
                    district,
                    pincode,
                    street: address,
                },
            },
        });

        return NextResponse.json({
            message: "Franchise Registered",
            success: true,
        });
    } catch (error) {
        console.log("[USER POST]", error);
        return NextResponse.json({ message: "INTERNAL ERROR", success: false });
    }
};

/**
 * GET ALL USER
 */

export const GET = async (req: Request) => {
    try {
        /**
         * VERIFY THAT ADMIN IS LOGIN
         */

        const session = await getServerSession(authOptions);
        if (!session?.user || session?.user.role !== "ADMIN") {
            return NextResponse.json({
                message: "Unauthorized",
            });
        }
        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1;
        const userId = searchParams.get("userId");
        const select = !!searchParams.get("select");
        interface selectOtions {
            [propName: string]: boolean;
        }
        const selectOtions: selectOtions = {};

        searchParams
            .get("select")
            ?.split(",")
            .forEach((parameter: string) => {
                selectOtions[parameter] = true;
            });

        /**
         * FINDING USERS
         */

        const users = await Prisma.user.findMany({
            take: per_page,
            skip: per_page * (page - 1),
            where: {
                userId: {
                    contains: userId ? userId : "",
                    not: session.user.userId,
                },
            },
            orderBy: {
                id: "desc",
            },
            select: select
                ? selectOtions
                : {
                      userId: true,
                      id: true,
                      address: true,
                      branch: true,
                      _count: true,
                      createdAt: true,
                      email: true,
                      img: true,
                      isActive: true,
                      name: true,
                      password: true,
                      phone: true,
                      role: true,
                      updatedAt: true,
                  },
        });

        /**
         * TOTAL USER
         */

        const total = await Prisma.user.count({
            where: {
                userId: {
                    contains: userId ? userId : "",
                    not: session.user.userId,
                },
            },
        });

        return NextResponse.json({ total, users });
    } catch (error) {
        console.log("[GET USERS]", error);
        return new NextResponse("Internal Error");
    }
};

/**
 * UPDATE USER DETAILS
 */

export const PUT = async (req: Request) => {
    try {
        /**
         * CHECK ADMIN IS LOGIN
         */

        const session = await getServerSession(authOptions);

        if (!session?.user || session?.user.role !== "ADMIN") {
            return NextResponse.json({
                message: "Unauthorized",
                success: false,
            });
        }

        const data: z.infer<typeof franchiseEditSchema> = await req.json();

        /**
         * VALIDATE DATA
         */

        const { success } = franchiseEditSchema.safeParse(data);

        if (!success) {
            return NextResponse.json({
                message: "Please fill all requirements",
                success: false,
            });
        }

        /**
         * FIND USER BY ID
         */

        const {
            id,
            name,
            email,
            img,
            phone,
            address,
            branch,
            district,
            password,
            pincode,
            state,
            userId,
            isActive,
            role,
        } = data;
        const user = await Prisma.user.update({
            where: { id },
            data: {
                name,
                email,
                img,
                phone,
                branch,
                userId,
                password,
                isActive: isActive === "true" ? true : false,
                role: role === "ADMIN" ? ROLE.ADMIN : ROLE.FRANCHISE,
                address: {
                    state,
                    district,
                    pincode,
                    street: address,
                },
            },
        });

        if (!user) {
            return NextResponse.json({
                message: "Invalid details",
                success: false,
            });
        }

        return NextResponse.json({
            message: "Successfully updated",
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

/**
 * DELETE USER
 */

export const DELETE = async (req: Request) => {
    try {
        /**
         * CHECK ADMIN IS LOGIN
         */

        const session = await getServerSession(authOptions);

        if (!session?.user || session?.user.role !== "ADMIN") {
            return NextResponse.json({
                message: "Unauthorized",
                success: false,
            });
        }
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({
                message: "Required userId",
                success: false,
            });
        }

        const user = await Prisma.user.delete({
            where: {
                userId,
            },
        });

        if (!user) {
            return NextResponse.json({
                message: "Invalid userId",
                success: false,
            });
        }

        await del(user.img!);

        return NextResponse.json({
            message: "User Deleted successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Invalid data",
            success: false,
        });
    }
};
