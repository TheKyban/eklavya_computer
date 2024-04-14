import { NextResponse } from "next/server";
import { Prisma } from "../../../../../prisma/prisma";

export const GET = async (req: Request) => {
    try {
        const branch = await Prisma.user.findMany({
            select: {
                branch: true,
                userId: true,
            },
        });

        return NextResponse.json({
            branches: branch,
            success: true,
            message: "Branches fetched successfully.",
        });
    } catch (error) {
        console.log("[STUDENT ZONE]", error);
        return NextResponse.json(
            { message: "Internal Error" },
            { status: 500 }
        );
    }
};
