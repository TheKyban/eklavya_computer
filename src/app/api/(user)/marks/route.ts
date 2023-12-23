import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Prisma } from "../../../../../prisma/prisma";
import { generalMarksSchema, typingSpeedMarkSchema } from "@/lib/schema";
import { z } from "zod";

/**
 * GET STUDENTS WHO DON'T HAVE MARKS
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

        const studentsWithoutMarks = await Prisma.student.findMany({
            where: {
                branch: session.user.userId,
                course: {
                    startsWith: computerTyping ? "Computer Typing" : "",
                    not: computerTyping ? "" : "Computer Typing",
                },

                englishTyping: {
                    isSet: false,
                },
                hindiTyping: {
                    isSet: false,
                },
                written: {
                    isSet: false,
                },
                viva: {
                    isSet: false,
                },
                practical: {
                    isSet: false,
                },
                project: {
                    isSet: false,
                },
            },
            select: {
                formNumber: true,
            },
        });

        return NextResponse.json(studentsWithoutMarks);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Internal error",
        });
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

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" });
        }

        const data: z.infer<
            typeof typingSpeedMarkSchema & typeof generalMarksSchema
        > = await req.json();

        const { searchParams } = new URL(req.url);
        const computerTyping =
            Boolean(searchParams.get("computerTyping")) || false;

        /**
         * VALIDATING DATA ACCORDINGLY COURSE
         * COMPUTER TYPING OR OTHER
         */

        if (computerTyping) {
            /**
             * COMPUTER TYPING
             */
            const { success } = typingSpeedMarkSchema.safeParse({
                formNumber: data.formNumber,
                englishTyping: Number(data.englishTyping),
                hindiTyping: Number(data.hindiTyping),
            });

            if (!success) {
                return NextResponse.json({ message: "Invalid data" });
            }
        } else {
            /**
             * OTHER COURSE
             */
            const { success } = generalMarksSchema.safeParse({
                formNumber: data.formNumber,
                written: Number(data?.practical),
                practical: Number(data?.practical),
                viva: Number(data?.viva),
                project: Number(data?.project),
            });

            if (!success) {
                return NextResponse.json({ message: "Invalid data" });
            }
        }

        /**
         * CREATING MARKS
         */

        const marks = await Prisma.student.update({
            where: {
                formNumber: data.formNumber,
                branch: session.user.userId,
            },
            data: computerTyping
                ? {
                      hindiTyping: data?.hindiTyping,
                      englishTyping: data?.englishTyping,
                  }
                : {
                      practical: data?.practical,
                      viva: data?.viva,
                      written: data?.written,
                      project: data?.project,
                  },
            select: computerTyping
                ? {
                      hindiTyping: true,
                      englishTyping: true,
                      branch: true,
                      formNumber: true,
                  }
                : {
                      branch: true,
                      formNumber: true,
                      viva: true,
                      project: true,
                      written: true,
                      practical: true,
                  },
        });

        return NextResponse.json({
            message: "Marks registered",
            success: true,
            marks,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
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

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" });
        }

        const data: z.infer<
            typeof typingSpeedMarkSchema & typeof generalMarksSchema
        > = await req.json();

        const { searchParams } = new URL(req.url);
        const computerTyping =
            Boolean(searchParams.get("computerTyping")) || false;

        /**
         * VALIDATING DATA ACCORDINGLY COURSE
         * COMPUTER TYPING OR OTHER
         */

        if (computerTyping) {
            /**
             * COMPUTER TYPING
             */
            const { success } = typingSpeedMarkSchema.safeParse({
                formNumber: data.formNumber,
                englishTyping: Number(data.englishTyping),
                hindiTyping: Number(data.hindiTyping),
            });

            if (!success) {
                return NextResponse.json({ message: "Invalid data" });
            }
        } else {
            /**
             * OTHER COURSE
             */
            const { success } = generalMarksSchema.safeParse({
                formNumber: data.formNumber,
                written: Number(data?.practical),
                practical: Number(data?.practical),
                viva: Number(data?.viva),
                project: Number(data?.project),
            });

            if (!success) {
                return NextResponse.json({ message: "Invalid data" });
            }
        }

        /**
         * UPDATE MARKS
         */

        const marks = await Prisma.student.update({
            where: {
                formNumber: data.formNumber,
                branch: session.user.userId,
            },
            data: computerTyping
                ? {
                      hindiTyping: data?.hindiTyping,
                      englishTyping: data?.englishTyping,
                  }
                : {
                      practical: data?.practical,
                      viva: data?.viva,
                      written: data?.written,
                      project: data?.project,
                  },
            select: computerTyping
                ? {
                      hindiTyping: true,
                      englishTyping: true,
                      branch: true,
                      formNumber: true,
                  }
                : {
                      branch: true,
                      formNumber: true,
                      viva: true,
                      project: true,
                      written: true,
                      practical: true,
                  },
        });

        return NextResponse.json({
            message: "Marks Updated",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
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

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" });
        }

        const { searchParams } = new URL(req.url);
        const computerTyping =
            Boolean(searchParams.get("computerTyping")) || false;
        const formNumber = searchParams.get("formNumber");

        if (!formNumber) {
            return NextResponse.json({ message: "FormNumber is required" });
        }

        /**
         * UPDATE MARKS
         */

        const marks = await Prisma.student.update({
            where: {
                formNumber: formNumber,
                branch: session.user.userId,
            },
            data: computerTyping
                ? {
                      hindiTyping: {
                          unset: true,
                      },
                      englishTyping: {
                          unset: true,
                      },
                  }
                : {
                      practical: {
                          unset: true,
                      },
                      viva: {
                          unset: true,
                      },
                      written: {
                          unset: true,
                      },
                      project: {
                          unset: true,
                      },
                  },

            select: {
                formNumber: true,
            },
        });

        if (!marks) {
            return NextResponse.json({ message: "Invalid data" });
        }

        return NextResponse.json({
            message: "Marks deleted Successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Internal Error",
        });
    }
};
