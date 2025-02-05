import { NextResponse } from "next/server";
import { Prisma } from "../../../../../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { per_page } from "@/lib/CONSTANTS";
import { STATUS_CODE } from "@/lib/STATUS_CODE";

export const dynamic = "force-dynamic";

/**
 * GET STUDENTS WHO HAVE MARKS
 */

export const GET = async (req: Request) => {
    try {
        /**
         * CHECK SESSION IS AVAILABLE
         */

        const session = await getServerSession(AUTH_OPTIONS);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" });
        }

        /**
         * FIND STUDENTS WITH MARKS
         */

        const { searchParams } = new URL(req.url);
        const computerTyping =
            Boolean(searchParams?.get("computerTyping")) || false;
        const registration = searchParams?.get("registration") || "";
        const page = Number(searchParams?.get("page")) || 1;
        const userId = searchParams?.get("userId");

        if (!userId) {
            return Response.json(
                {
                    message: "UserId is required",
                },
                { status: STATUS_CODE.CLIENT_ERROR },
            );
        }

        const studentsWithMarks = await Prisma.student.findMany({
            take: per_page,
            skip: per_page * (page - 1),
            where: {
                branch: userId,
                Course: {
                    name: {
                        startsWith: computerTyping ? "COMPUTER TYPING" : "",
                        not: computerTyping ? "" : "COMPUTER TYPING",
                    },
                },
                registration: {
                    startsWith: registration,
                },
                marks: {
                    isNot: null,
                },
            },
            include: {
                marks: true,
            },
        });

        const total = await Prisma.student.count({
            where: {
                branch: session.user.userId,
                Course: {
                    name: {
                        startsWith: computerTyping ? "COMPUTER TYPING" : "",
                        not: computerTyping ? "" : "COMPUTER TYPING",
                    },
                },
                registration: {
                    startsWith: registration,
                },
                marks: {
                    isNot: null,
                },
            },
        });

        return NextResponse.json({ studentsWithMarks, total });
    } catch (error) {
        console.log("[GET ENTERED MARKS]", error);
        return NextResponse.json({
            message: "Internal error",
        });
    }
};
