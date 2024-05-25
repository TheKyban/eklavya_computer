import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { getServerSession } from "next-auth";
import { Prisma } from "../../../../../prisma/prisma";
import {
    GENERAL_COURSE_MARKS_SCHEMA,
    COMPUTER_TYPING_MARKS_SCHEMA,
} from "@/lib/SCHEMA";
import { z } from "zod";

/**
 * GET STUDENTS WHO DON'T HAVE MARKS
 */

export const GET = async (req: Request) => {
    try {
        /**
         * CHECK SESSION IS AVAILABLE
         */

        const session = await getServerSession(AUTH_OPTIONS);

        if (!session) {
            return Response.json({ message: "Unauthorized" });
        }

        /**
         * FIND STUDENTS WITHOUT MARKS
         */

        const { searchParams } = new URL(req.url);
        const computerTyping =
            Boolean(searchParams?.get("computerTyping")) || false;

        const studentsWithoutMarks = await Prisma.student.findMany({
            where: {
                branch: session.user.userId,

                Course: {
                    name: {
                        startsWith: computerTyping ? "COMPUTER TYPING" : "",
                        not: computerTyping ? "" : "COMPUTER TYPING",
                    },
                },
                marks: {
                    is: null,
                },
            },
            select: {
                registration: true,
            },
        });

        return Response.json(studentsWithoutMarks);
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: "Internal error",
            },
            {
                status: 500,
            },
        );
    }
};

/**
 * CREATE MARKS
 */

export const POST = async (req: Request) => {
    try {
        /**
         * CHECK SESSION IS AVAILABLE
         */

        const session = await getServerSession(AUTH_OPTIONS);

        if (!session) {
            return Response.json({ message: "Unauthorized" });
        }

        const data: z.infer<
            typeof COMPUTER_TYPING_MARKS_SCHEMA &
                typeof GENERAL_COURSE_MARKS_SCHEMA
        > = await req.json();

        const student = await Prisma.student.findUnique({
            where: {
                registration: data.registration,
            },
            include: {
                Course: true,
            },
        });

        if (!student) {
            return Response.json(
                {
                    message: "Invalid registration number.",
                    success: false,
                },
                {
                    status: 400,
                },
            );
        }
        /**
         * VALIDATING DATA ACCORDINGLY COURSE
         * COMPUTER TYPING OR OTHER
         */
        const { success: isTypingMarksValid } =
            COMPUTER_TYPING_MARKS_SCHEMA.safeParse(data);

        const { success: isMarksValid } =
            GENERAL_COURSE_MARKS_SCHEMA.safeParse(data);

        if (!isTypingMarksValid && !isMarksValid) {
            return Response.json({ message: "Invalid data" });
        }

        /**
         * CREATING MARKS
         */

        const createdMarks = await Prisma.marks.create({
            data: isTypingMarksValid
                ? {
                      studentRegistrationNumber: data.registration,
                      typingMarks: {
                          hindiTyping: data?.hindiTyping,
                          englishTyping: data?.englishTyping,
                      },
                  }
                : {
                      studentRegistrationNumber: data.registration,
                      marks: {
                          practical: data?.practical,
                          viva: data?.viva,
                          written: data?.written,
                          project: data?.project,
                      },
                  },
        });

        if (!createdMarks) {
            return Response.json(
                {
                    message: "Invalid registration",
                    success: false,
                },
                {
                    status: 400,
                },
            );
        }

        return Response.json(
            {
                message: "Marks registered",
                success: true,
                marks: createdMarks,
            },
            {
                status: 201,
            },
        );
    } catch (error) {
        console.log(error);
        return Response.json({
            message: "Internal Error",
        });
    }
};
/**
 * UPDATE MARKS
 */

export const PUT = async (req: Request) => {
    try {
        /**
         * CHECK SESSION IS AVAILABLE
         */

        const session = await getServerSession(AUTH_OPTIONS);

        if (!session) {
            return Response.json({ message: "Unauthorized" });
        }

        const data: z.infer<
            typeof COMPUTER_TYPING_MARKS_SCHEMA &
                typeof GENERAL_COURSE_MARKS_SCHEMA
        > = await req.json();

        const student = await Prisma.student.findUnique({
            where: {
                registration: data.registration,
            },
            include: {
                Course: true,
            },
        });

        if (!student) {
            return Response.json(
                {
                    message: "Invalid registration number.",
                    success: false,
                },
                {
                    status: 400,
                },
            );
        }

        /**
         * VALIDATING DATA ACCORDINGLY COURSE
         * COMPUTER TYPING OR OTHER
         */

        const { success: isTypingMarksValid } =
            COMPUTER_TYPING_MARKS_SCHEMA.safeParse(data);

        const { success: isMarksValid } =
            GENERAL_COURSE_MARKS_SCHEMA.safeParse(data);

        if (!isTypingMarksValid && !isMarksValid) {
            return Response.json({ message: "Invalid data" });
        }
        /**
         * UPDATE MARKS
         */
        const marks = await Prisma.marks.update({
            where: {
                studentRegistrationNumber: data.registration,
            },
            data: isTypingMarksValid
                ? {
                      typingMarks: {
                          hindiTyping: data?.hindiTyping,
                          englishTyping: data?.englishTyping,
                      },
                  }
                : {
                      marks: {
                          practical: data?.practical,
                          viva: data?.viva,
                          written: data?.written,
                          project: data?.project,
                      },
                  },
        });

        return Response.json(
            {
                message: "Marks Updated",
                success: true,
                marks,
            },
            {
                status: 202,
            },
        );
    } catch (error) {
        console.log(error);
        return Response.json({
            message: "Internal Error",
        });
    }
};

/**
 * DELETE MARKS
 */
export const DELETE = async (req: Request) => {
    try {
        /**
         * CHECK SESSION IS AVAILABLE
         */

        const session = await getServerSession(AUTH_OPTIONS);

        if (!session) {
            return Response.json({ message: "Unauthorized" });
        }

        const { searchParams } = new URL(req.url);
        const registration = searchParams?.get("registration");

        if (!registration) {
            return Response.json(
                {
                    message: "Registration Number is required",
                },
                {
                    status: 400,
                },
            );
        }

        /**
         * delete MARKS
         */

        const marks = await Prisma.marks.delete({
            where: {
                studentRegistrationNumber: registration,
            },
            select: {
                studentRegistrationNumber: true,
            },
        });

        if (!marks) {
            return Response.json(
                { message: "Invalid data" },
                {
                    status: 400,
                },
            );
        }

        return Response.json(
            {
                message: "Marks deleted Successfully",
                success: true,
            },
            {
                status: 202,
            },
        );
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: "Internal Error",
            },
            {
                status: 500,
            },
        );
    }
};
