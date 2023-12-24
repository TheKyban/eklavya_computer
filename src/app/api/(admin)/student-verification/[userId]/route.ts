import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Prisma } from "../../../../../../prisma/prisma";
import { per_page } from "@/lib/constants";

/**
 * GET STUDENTS
 */
export const GET = async (
    req: Request,
    { params }: { params: { userId: string } }
) => {
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

        if (!params.userId) {
            return NextResponse.json({
                message: "UserId is required",
            });
        }

        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1;
        const formNumber = searchParams.get("formNumber") || "";
        const pending = searchParams.get("pending") === "true" ? true : false;
        /**
         * FINDING STUDENTS
         */

        const students = await Prisma.student.findMany({
            take: per_page,
            skip: per_page * (page - 1),
            where: {
                branch: params.userId,
                formNumber: {
                    contains: formNumber,
                },
                isVerified: pending,
            },
            orderBy: {
                id: "desc",
            },
            select: {
                formNumber: true,
                name: true,
                fatherName: true,
                motherName: true,
                course: true,
                isVerified: true,
                dor: true,
            },
        });

        /**
         * TOTAL STUDENTS
         */

        const total = await Prisma.student.count({
            where: {
                branch: params.userId,
                formNumber: {
                    contains: formNumber,
                },
                isVerified: pending,
            },
        });

        return NextResponse.json({ total, students });
    } catch (error) {
        console.log("[GET USERS]", error);
        return new NextResponse("Internal Error");
    }
};

/**
 * VERIFY STUDENTS
 */

export const PUT = async (
    req: Request,
    { params }: { params: { userId: string } }
) => {
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

        if (!params.userId) {
            return NextResponse.json({
                message: "UserId is required",
            });
        }

        const data = await req.json();

        /**
         * FINDING STUDENTS
         */

        const student = await Prisma.student.update({
            where: {
                branch: params.userId,
                formNumber: data.formNumber,
            },
            data: {
                isVerified: data.isVerified,
            },
            select: {
                formNumber: true,
                name: true,
                fatherName: true,
                motherName: true,
                course: true,
                isVerified: true,
                dor: true,
            },
        });

        if (!student) {
            return NextResponse.json({ messagae: "Invalid data" });
        }

        return NextResponse.json({
            message: "Updated successfully",
            student,
        });
    } catch (error) {
        console.log("[GET USERS]", error);
        return new NextResponse("Internal Error");
    }
};
