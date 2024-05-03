import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
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
            return Response.json({ message: "Unauthorized" });
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

                Course: {
                    name: {
                        startsWith: computerTyping ? "Computer Typing" : "",
                        not: computerTyping ? "" : "Computer Typing",
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
            }
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

        const session = await getServerSession(authOptions);

        if (!session) {
            return Response.json({ message: "Unauthorized" });
        }

        const data: z.infer<
            typeof typingSpeedMarkSchema & typeof generalMarksSchema
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
                }
            );
        }
        /**
         * VALIDATING DATA ACCORDINGLY COURSE
         * COMPUTER TYPING OR OTHER
         */

        if (student.Course.name === "computer typing") {
            const { success } = typingSpeedMarkSchema.safeParse({
                registration: data.registration,
                englishTyping: Number(data.englishTyping),
                hindiTyping: Number(data.hindiTyping),
            });

            if (!success) {
                return Response.json({ message: "Invalid data" });
            }
        } else {
            const { success } = generalMarksSchema.safeParse({
                registration: data.registration,
                written: Number(data?.practical),
                practical: Number(data?.practical),
                viva: Number(data?.viva),
                project: Number(data?.project),
            });

            if (!success) {
                return Response.json({ message: "Invalid data" });
            }
        }

        /**
         * CREATING MARKS
         */

        // const marks = await Prisma.marks.create({
        //     data:
        //         student.Course.name === "computer typing"
        //             ? {
        //                   studentRegistrationNumber: data.registration,
        //                   typingMarks: {
        //                       hindiTyping: data?.hindiTyping,
        //                       englishTyping: data?.englishTyping,
        //                   },
        //               }
        //             : {
        //                   studentRegistrationNumber: data.registration,
        //                   marks: {
        //                       practical: data?.practical,
        //                       viva: data?.viva,
        //                       written: data?.written,
        //                       project: data?.project,
        //                   },
        //               },
        //     // select:
        //     //     student.Course.name === "computer typing"
        //     //         ? {
        //     //               typingMarks: true,
        //     //               branch: true,
        //     //               registration: true,
        //     //           }
        //     //         : {
        //     //               branch: true,
        //     //               registration: true,
        //     //               marks: true,
        //     //           },
        // });

        const createdMarks = await Prisma.student.update({
            where: {
                registration: data.registration,
            },
            data:
                student.Course.name === "computer typing"
                    ? {
                          marks: {
                              create: {
                                  typingMarks: {
                                      hindiTyping: data?.hindiTyping,
                                      englishTyping: data?.englishTyping,
                                  },
                              },
                          },
                      }
                    : {
                          marks: {
                              create: {
                                  marks: {
                                      practical: data?.practical,
                                      viva: data?.viva,
                                      written: data?.written,
                                      project: data?.project,
                                  },
                              },
                          },
                      },
            select: {
                marks: true,
                branch: true,
                registration: true,
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
                }
            );
        }

        return Response.json(
            {
                message: "Marks registered",
                success: true,
                // marks,
            },
            {
                status: 201,
            }
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

        const session = await getServerSession(authOptions);

        if (!session) {
            return Response.json({ message: "Unauthorized" });
        }

        const data: z.infer<
            typeof typingSpeedMarkSchema & typeof generalMarksSchema
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
                }
            );
        }

        /**
         * VALIDATING DATA ACCORDINGLY COURSE
         * COMPUTER TYPING OR OTHER
         */

        if (student.Course.name === "computer typing") {
            const { success } = typingSpeedMarkSchema.safeParse({
                registration: data.registration,
                englishTyping: Number(data.englishTyping),
                hindiTyping: Number(data.hindiTyping),
            });

            if (!success) {
                return Response.json({ message: "Invalid data" });
            }
        } else {
            const { success } = generalMarksSchema.safeParse({
                registration: data.registration,
                written: Number(data?.practical),
                practical: Number(data?.practical),
                viva: Number(data?.viva),
                project: Number(data?.project),
            });

            if (!success) {
                return Response.json({ message: "Invalid data" });
            }
        }

        /**
         * UPDATE MARKS
         */

        const marks = await Prisma.marks.update({
            where: {
                studentRegistrationNumber: data.registration,
            },
            data:
                student.Course.name === "computer typing"
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
            },
            {
                status: 202,
            }
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

        const session = await getServerSession(authOptions);

        if (!session) {
            return Response.json({ message: "Unauthorized" });
        }

        const { searchParams } = new URL(req.url);
        const registration = searchParams.get("registration");

        if (!registration) {
            return Response.json(
                {
                    message: "Registration Number is required",
                },
                {
                    status: 400,
                }
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
                }
            );
        }

        await Prisma.student.update({
            where: {
                registration,
            },
            data: {
                marks: {
                    delete: true,
                },
            },
        });

        return Response.json(
            {
                message: "Marks deleted Successfully",
                success: true,
            },
            {
                status: 202,
            }
        );
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: "Internal Error",
            },
            {
                status: 500,
            }
        );
    }
};
