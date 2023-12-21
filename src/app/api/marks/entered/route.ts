import { NextResponse } from "next/server";
import { Prisma } from "../../../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

/**
 * GET STUDENTS
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
         * FIND STUDENTS WITHOUT MARKS
         */

        const { searchParams } = new URL(req.url);
        const computerTyping =
            Boolean(searchParams.get("computerTyping")) || false;

        const studentsWithMarks = await Prisma.student.findMany({
            where: {
                branch: session.user.userId,
                course: {
                    startsWith: computerTyping ? "Computer Typing" : "",
                    not: computerTyping ? "" : "Computer Typing",
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
        console.log(error);
        return NextResponse.json({
            message: "Internal error",
        });
    }
};
