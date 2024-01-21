import { NextResponse } from "next/server";
import { Prisma } from "../../../../../prisma/prisma";

export const dynamic = "force-dynamic";

export const GET = async () => {
    try {
        const users = await Prisma.user.findMany({
            select: {
                img: true,
                name: true,
                branch: true,
            },
        });
        return NextResponse.json(users, {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Internal Error",
            },
            {
                status: 500,
            }
        );
    }
};
