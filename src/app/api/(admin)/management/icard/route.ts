import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { getServerSession } from "next-auth";
import { Prisma } from "../../../../../../prisma/prisma";
import { per_page } from "@/lib/CONSTANTS";
import { STATUS_CODE } from "@/lib/STATUS_CODE";

export const dynamic = "force-dynamic";

export const GET = async (req: Request) => {
    try {
        /**
         * VERIFY THAT ADMIN IS LOGIN
         */

        const session = await getServerSession(AUTH_OPTIONS);
        if (!session?.user || session?.user.role !== "ADMIN") {
            return Response.json(
                {
                    message: "Unauthorized",
                },
                { status: STATUS_CODE.UNAUTHENTICATE },
            );
        }

        const { searchParams } = new URL(req.url);
        const page = Number(searchParams?.get("page")) || 1;
        const registration = searchParams?.get("registration") || "";
        const userId = searchParams?.get("userId");
        const pending = searchParams?.get("issue") === "true" ? true : false;

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
                icard: {
                    is: {
                        issue: pending,
                    },
                },
            },
            orderBy: {
                id: "desc",
            },
            include: {
                Course: true,
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
                icard: {
                    is: {
                        issue: pending,
                    },
                },
            },
        });

        return Response.json({ total, students }, { status: STATUS_CODE.OK });
    } catch (error) {
        console.log("[GET ICARD]", error);
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

        const session = await getServerSession(AUTH_OPTIONS);
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

        const { registration, issue, date } = await req.json();

        if (!registration) {
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

        const student = await Prisma?.student?.update({
            where: {
                registration: registration,
            },
            data: {
                icard: {
                    date,
                    issue,
                },
            },
            include: {
                Course: true,
            },
        });

        if (!student) {
            return Response.json(
                { messagae: "Invalid Registration" },
                {
                    status: STATUS_CODE.CLIENT_ERROR,
                },
            );
        }
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
