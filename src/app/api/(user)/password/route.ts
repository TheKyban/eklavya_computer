import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { PASSWORD_SCHEMA } from "@/lib/SCHEMA";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "../../../../../prisma/prisma";

export const POST = async (req: Request) => {
    try {
        /**
         * CHECK SESSION EXIST OR NOT
         */

        const session = await getServerSession(AUTH_OPTIONS);
        if (!session?.user) {
            return NextResponse.json({
                message: "Unauthenticated",
                success: false,
            });
        }

        /**
         * GET DATA AND VALIDATE
         */
        const data: z.infer<typeof PASSWORD_SCHEMA> = await req.json();

        const { success } = PASSWORD_SCHEMA.safeParse(data);
        if (!success) {
            return NextResponse.json({
                message: "invalid fields",
                success: false,
            });
        }

        /**
         * VALIDATE CHECK CURRENT PASSWORD
         */

        const user = await Prisma.user.findUnique({
            where: {
                userId: session.user.userId,
                password: data.currentPassword,
            },
            select: {
                password: true,
                userId: true,
            },
        });

        if (!user) {
            return NextResponse.json({
                message: "Incorrect Password.",
                success: false,
            });
        }

        /**
         * UPDATE PASSWORD
         */

        const changedPassword = await Prisma.user.update({
            where: {
                userId: session.user.userId,
            },
            data: {
                password: data.password,
            },
            select: {
                password: true,
                userId: true,
            },
        });

        if (!changedPassword) {
            return NextResponse.json({
                message: "Something went wrong.",
                success: false,
            });
        }

        return NextResponse.json({
            message: "Password updated.",
            success: true,
        });
    } catch (error) {
        console.log("[Password]", error);
        return NextResponse.json({ message: "Internal error", success: false });
    }
};
