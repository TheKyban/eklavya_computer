import { NextResponse } from "next/server";
import { Prisma } from "../../../../../prisma/prisma";

export const POST = async (req: Request) => {
    try {
        const { branch, password }: { branch: string; password: string } =
            await req.json();
        if (!branch || !password || branch.length < 5 || password.length < 8) {
            return NextResponse.json({
                message: "Branch Code and Password are required.",
                success: false,
            });
        }

        const user = await Prisma.user.findUnique({
            where: {
                userId: branch,
                password: password,
            },
            select: {
                userId: true,
                img: true,
                name: true,
                branch: true,
                address: true,
            },
        });

        if (!user) {
            return NextResponse.json({
                message: "Branch code or password may wrong.",
                success: false,
            });
        }

        return NextResponse.json({
            user,
            success: true,
        });
    } catch (error) {
        console.log("[SEARCH USER]", error);
        return NextResponse.json({ message: "Internal Error", success: false });
    }
};
