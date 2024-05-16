import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { Prisma } from "../../../../../../prisma/prisma";
import { per_page } from "@/lib/constants";
import { STATUS_CODE } from "@/lib/statusCode";

/**
 * GET STUDENTS
 */
export const GET = async (req: Request) => {
    try {
        /**
         * VERIFY THAT ADMIN IS LOGIN
         */

        const session = await getServerSession(authOptions);
        if (!session?.user || session?.user.role !== "ADMIN") {
            return Response.json(
                {
                    message: "Unauthorized",
                },
                { status: STATUS_CODE.UNAUTHENTICATE },
            );
        }

        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1;
        const registration = searchParams.get("registration") || "";
        const userId = searchParams.get("userId");
        const pending = searchParams.get("pending") === "true" ? false : true;

        if (!userId) {
            return Response.json(
                {
                    message: "UserId is required",
                },
                { status: STATUS_CODE.CLIENT_ERROR },
            );
        }
        /**
         * FINDING STUDENTS
         */

        const students = await Prisma.student.findMany({
            take: per_page,
            skip: per_page * (page - 1),
            where: {
                branch: userId,
                registration: {
                    contains: registration,
                },
                Course: {
                    name: {
                        not: "COMPUTER TYPING",
                    },
                },
                marksheet: pending,
                marks: {
                    isNot: null,
                },
            },
            orderBy: {
                id: "desc",
            },
            include: {
                Course: true,
                marks: true,
            },
        });

        /**
         * TOTAL STUDENTS
         */

        const total = await Prisma.student.count({
            where: {
                branch: userId,
                registration: {
                    contains: registration,
                },
                Course: {
                    name: {
                        not: "COMPUTER TYPING",
                    },
                },
                marks: {
                    isNot: null,
                },
                marksheet: pending,
            },
        });

        return Response.json({ total, students }, { status: STATUS_CODE.OK });
    } catch (error) {
        console.log("[GET Marksheet]", error);
        return Response.json(
            {
                message: "Internal Error",
                error,
            },
            {
                status: STATUS_CODE.INTERNAL_ERROR,
            },
        );
    }
};

export const PUT = async (req: Request) => {
    try {
        /**
         * VERIFY THAT ADMIN IS LOGIN
         */

        const session = await getServerSession(authOptions);
        if (!session?.user || session?.user.role !== "ADMIN") {
            return Response.json(
                {
                    message: "Unauthorized",
                },
                {
                    status: STATUS_CODE.UNAUTHENTICATE,
                },
            );
        }

        const data = await req.json();

        if (!data?.registration) {
            return Response.json(
                {
                    message: "Registration Number is required",
                },
                {
                    status: STATUS_CODE.CLIENT_ERROR,
                },
            );
        }

        /**
         * FINDING STUDENTS
         */

        const isExist = await Prisma.student.findUnique({
            where: {
                registration: data.registration,
                marks: {
                    isNot: null,
                },
            },
            include: {
                Course: true,
                marks: true,
            },
        });

        if (!isExist || isExist.Course.name === "COMPUTER TYPING") {
            return Response.json(
                { messagae: "Invalid Registration" },
                {
                    status: STATUS_CODE.CLIENT_ERROR,
                },
            );
        }

        const issued = isExist.marksheet;

        const student = await Prisma?.student?.update({
            where: {
                registration: data?.registration,
            },
            data: {
                marksheet: !issued,
            },
            include: {
                Course: true,
                marks: true,
            },
        });

        return Response.json(
            {
                student,
                message: "Successfully updated.",
            },
            {
                status: STATUS_CODE.OK,
            },
        );
    } catch (error) {
        console.log("[PUT Marksheet]", error);
        return Response.json(
            {
                message: "Internal Error",
                error,
            },
            {
                status: STATUS_CODE.INTERNAL_ERROR,
            },
        );
    }
};
