import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { Prisma } from "../../../../../../prisma/prisma";
import { NextRequest } from "next/server";
import { role } from "@prisma/client";
import { DELETE_FILE } from "@/lib/cloudinary";
import { per_page } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
    try {
        /**
         * CHECK SESSION IS AVAILABLE
         */

        const session = await getServerSession(authOptions);
        if (!session) {
            return Response.json({ message: "Unauthorized", success: false });
        }

        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1;

        /**
         * GET APPLICATIONS
         */

        const applications = await Prisma.studentApplication.findMany({
            where: {
                branch: session.user.userId,
            },
            take: per_page,
            skip: per_page * (page - 1),
        });
        const total = await Prisma.studentApplication.count({
            where: {
                branch: session.user.userId,
            },
        });

        if (!applications) {
            return Response.json({
                message: "Student's application fetching failed",
                success: false,
            });
        }

        return Response.json({
            applications,
            total,
            success: true,
        });
    } catch (error) {
        console.log("[STUDENT APPLICATIONS]", error);
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

        if (session?.user.role === role.FRANCHISE && !session?.user?.isActive) {
            return Response.json({
                message: "Unauthorized",
                success: false,
            });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const imgDelete: "yes" | "no" =
            (searchParams.get("img") as "yes" | "no") || "no";

        if (!id) {
            return Response.json({
                message: "id is required",
                success: false,
            });
        }

        const application = await Prisma.studentApplication.delete({
            where: {
                id,
            },
        });

        if (!application) {
            return Response.json({
                message: "Invalid registration",
                success: false,
            });
        }
        if (imgDelete === "yes") {
            await DELETE_FILE(application.img);
        }

        return Response.json({
            message: "application Deleted successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return Response.json({ message: "Internal Error" });
    }
};
