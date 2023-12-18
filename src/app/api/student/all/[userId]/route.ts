import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Prisma } from "../../../../../../prisma/prisma";
import { per_page } from "@/lib/constants";

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
            },
            orderBy: {
                id: "desc",
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
            },
        });

        return NextResponse.json({ total, students });
    } catch (error) {
        console.log("[GET USERS]", error);
        return new NextResponse("Internal Error");
    }
};
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
        });

        if (!student) {
            return NextResponse.json({ messagae: "Invalid data" });
        }

        return NextResponse.json({ message: "Updated successfully" });
    } catch (error) {
        console.log("[GET USERS]", error);
        return new NextResponse("Internal Error");
    }
};
