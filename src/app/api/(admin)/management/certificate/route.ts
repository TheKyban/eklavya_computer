import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { getServerSession } from "next-auth";
import { Prisma } from "../../../../../../prisma/prisma";
import { per_page } from "@/lib/CONSTANTS";
import { STATUS_CODE } from "@/lib/STATUS_CODE";

export const dynamic = "force-dynamic";
/**
 * GET STUDENTS WHO HAVE MARKS
 */

export const GET = async (req: Request) => {
    try {
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
        const computerTyping =
            searchParams.get("computerTyping") === "false" ? false : true;
        const registration = searchParams.get("registration") || "";
        const page = Number(searchParams.get("page")) || 1;
        const userId = searchParams.get("userId");
        const verified = searchParams.get("verified") === "true" ? true : false;
        if (!userId) {
            return Response.json(
                {
                    message: "UserId is required",
                },
                { status: STATUS_CODE.CLIENT_ERROR },
            );
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

        return Response.json(
            { studentsWithMarks, total },
            { status: STATUS_CODE.OK },
        );
    } catch (error) {
        console.log("[GET CERTIFICATE]", error);
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

/**
 * UPDATE VERIFICATION
 */

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
                { status: STATUS_CODE.UNAUTHENTICATE },
            );
        }

        const { verified, course, registration } = await req.json();
        if (!course || !registration) {
            return Response.json(
                { message: "All fields are required" },
                { status: STATUS_CODE.CLIENT_ERROR },
            );
        }

        /**
         * UPDATE MARKS VERIFICATION
         */

        const student = await Prisma.student.update({
            where: {
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
            return Response.json(
                {
                    message: "Invalid fields",
                },
                { status: STATUS_CODE.CLIENT_ERROR },
            );
        }

        return Response.json(
            {
                message: "Successfully updated",
                student,
            },
            { status: STATUS_CODE.OK },
        );
    } catch (error) {
        console.log(error);
        return Response.json(
            { message: "Internal Error", error },
            { status: STATUS_CODE.INTERNAL_ERROR },
        );
    }
};
