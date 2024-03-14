import { NextResponse } from "next/server";
import { Prisma } from "../../../../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { per_page } from "@/lib/constants";

export const dynamic = "force-dynamic";

/**
 * GET STUDENTS WHO HAVE MARKS
 */

export const GET = async (req: Request) => {
    try {
        /**
         * CHECK SESSION IS AVAILABLE
         */

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" });
        }

        /**
         * FIND STUDENTS WITH MARKS
         */

        const { searchParams } = new URL(req.url);
        const computerTyping =
            Boolean(searchParams.get("computerTyping")) || false;
        const formNumber = searchParams.get("formNumber") || "";
        const page = Number(searchParams.get("page")) || 1;

        const studentsWithMarks = await Prisma.student.findMany({
            take: per_page,
            skip: per_page * (page - 1),
            where: {
                branch: session.user.userId,
                course: {
                    startsWith: computerTyping ? "Computer Typing" : "",
                    not: computerTyping ? "" : "Computer Typing",
                },

                formNumber: {
                    startsWith: formNumber,
                },
                englishTyping: {
                    isSet: computerTyping,
                },
                hindiTyping: {
                    isSet: computerTyping,
                },
                written: {
                    isSet: !computerTyping,
                },
                viva: {
                    isSet: !computerTyping,
                },
                practical: {
                    isSet: !computerTyping,
                },
                project: {
                    isSet: !computerTyping,
                },
            },
            select: {
                formNumber: true,
                englishTyping: computerTyping,
                hindiTyping: computerTyping,
                written: !computerTyping,
                viva: !computerTyping,
                practical: !computerTyping,
                project: !computerTyping,
            },
        });

        const total = await Prisma.student.count({
            where: {
                branch: session.user.userId,
                course: {
                    startsWith: computerTyping ? "Computer Typing" : "",
                    not: computerTyping ? "" : "Computer Typing",
                },

                formNumber: {
                    startsWith: formNumber,
                },

                englishTyping: {
                    isSet: computerTyping,
                },
                hindiTyping: {
                    isSet: computerTyping,
                },
                written: {
                    isSet: !computerTyping,
                },
                viva: {
                    isSet: !computerTyping,
                },
                practical: {
                    isSet: !computerTyping,
                },
                project: {
                    isSet: !computerTyping,
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
