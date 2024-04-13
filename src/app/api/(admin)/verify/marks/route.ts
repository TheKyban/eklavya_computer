import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Prisma } from "../../../../../../prisma/prisma";
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
        const computerTyping =
            Boolean(searchParams.get("computerTyping")) || false;
        const formNumber = searchParams.get("formNumber") || "";
        const page = Number(searchParams.get("page")) || 1;
        const userId = searchParams.get("userId");
        const verified = searchParams.get("verified") === "true" ? true : false;
        if (!userId) {
            return NextResponse.json({
                message: "UserId is required",
            });
        }
        /**
         * FIND STUDENTS WITH MARKS
         */

        const studentsWithMarks = await Prisma.student.findMany({
            take: per_page,
            skip: per_page * (page - 1),
            where: {
                branch: userId,
                course: {
                    startsWith: computerTyping ? "Computer Typing" : "",
                    not: computerTyping ? "" : "Computer Typing",
                },
                certificate: verified,

                isVerified: true,

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
                certificate: true,
                course: true,
            },
        });

        const total = await Prisma.student.count({
            where: {
                branch: userId,
                certificate: verified,
                course: {
                    startsWith: computerTyping ? "Computer Typing" : "",
                    not: computerTyping ? "" : "Computer Typing",
                },

                formNumber: {
                    startsWith: formNumber,
                },

                isVerified: true,

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

/**
 * UPDATE VERIFICATION
 */

export const PUT = async (req: Request) => {
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

        const { userId, verified, course, formNumber } = await req.json();
        if (!userId || !course || !formNumber) {
            return NextResponse.json({ message: "All fields are required" });
        }

        /**
         * UPDATE MARKS VERIFICATION
         */

        const student = await Prisma.student.update({
            where: {
                branch: userId,
                formNumber: formNumber,
                course: course,
            },
            data: {
                certificate: verified,
            },
            select: {
                formNumber: true,
                written: true,
                viva: true,
                practical: true,
                project: true,
                certificate: true,
                hindiTyping: true,
                englishTyping: true,
                course: true,
            },
        });

        if (!student) {
            return NextResponse.json({
                message: "Invalid fields",
            });
        }

        return NextResponse.json({
            message: "Successfully updated",
            student,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Error" });
    }
};
