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
        const computerTyping = !!searchParams.get("computerTyping") || false;
        const registration = searchParams.get("registration") || "";
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
                Course: {
                    name: {
                        startsWith: computerTyping ? "COMPUTER TYPING" : "",
                        not: computerTyping ? "" : "COMPUTER TYPING",
                    },
                },
                certificate: verified,
                isVerified: true,
                registration: {
                    startsWith: registration,
                },
                marks: {
                    isNot: null,
                },
            },
            include: {
                marks: true,
                Course: true,
            },
        });

        const total = await Prisma.student.count({
            where: {
                branch: userId,
                certificate: verified,
                Course: {
                    name: {
                        startsWith: computerTyping ? "COMPUTER TYPING" : "",
                        not: computerTyping ? "" : "COMPUTER TYPING",
                    },
                },
                registration: {
                    startsWith: registration,
                },
                isVerified: true,
                marks: {
                    isNot: null,
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

        const { userId, verified, course, registration } = await req.json();
        if (!userId || !course || !registration) {
            return NextResponse.json({ message: "All fields are required" });
        }

        /**
         * UPDATE MARKS VERIFICATION
         */

        const student = await Prisma.student.update({
            where: {
                branch: userId,
                registration: registration,
                course: course,
            },
            data: {
                certificate: verified,
            },
            include: {
                Course: true,
                marks: true,
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
