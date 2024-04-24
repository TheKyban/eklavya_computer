import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { Prisma } from "../../../../../../prisma/prisma";
import { NextRequest } from "next/server";

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
            take: page,
            skip: page * (page - 1),
        });
        const total = await Prisma.studentApplication.count();

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
