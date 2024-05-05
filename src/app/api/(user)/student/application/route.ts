import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { Prisma } from "../../../../../../prisma/prisma";
import { NextRequest } from "next/server";
import { gender, role } from "@prisma/client";
import { DELETE_FILE } from "@/lib/cloudinary";
import { per_page } from "@/lib/constants";
import { studentSchema } from "@/lib/schema";
import { z } from "zod";

export const dynamic = "force-dynamic";

/**
 * REGISTER STUDENTS and DELETE Application
 */
export const POST = async (req: Request) => {
    try {
        /**
         * CHECK ADMIN OR FRENCHISE IS LOGIN
         */

        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return Response.json({
                message: "Unauthorized",
                success: false,
            });
        }

        /**
         * CHECK FRANCHISE IS ACTIVE OR NOT
         */

        if (session?.user.role === role.FRANCHISE && !session?.user?.isActive) {
            return Response.json({
                message: "Unauthorized",
                success: false,
            });
        }

        /**
         * VALIDATE DATA
         */
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return Response.json({
                message: "id is required",
                success: false,
            });
        }

        const data: z.infer<typeof studentSchema> = await req.json();
        const dataVerify = studentSchema.safeParse({
            ...data,
            dob: new Date(data.dob),
            dor: new Date(data.dor),
        });
        if (!dataVerify.success) {
            return Response.json({
                message:
                    dataVerify.error?.errors?.[0].message ||
                    "All fields are required",
                success: false,
            });
        }

        /**
         * Validate Student form
         */

        // form number and branch id should not to be same
        if (data.registration === data.branch) {
            return Response.json(
                {
                    message: "Form number must be unique",
                    success: false,
                },
                {
                    status: 400,
                }
            );
        }

        // from number should be followed by branch userId
        if (!data.registration.startsWith(data.branch)) {
            return Response.json(
                {
                    message: "Form number must be follow by branch id",
                    success: false,
                },
                {
                    status: 400,
                }
            );
        }

        const isFormNumberExist = await Prisma.student.findUnique({
            where: {
                registration: data.registration,
            },
        });

        if (!!isFormNumberExist) {
            return Response.json(
                {
                    message: "Form number must be unique",
                    success: false,
                },
                {
                    status: 400,
                }
            );
        }

        /**
         * UPDATE SERIAL NUMBER
         */

        const serialNumber = await Prisma.studentSerialNumber.findMany();
        let StudentSerialNumber = 1;

        if (!serialNumber?.[0]) {
            await Prisma.studentSerialNumber.create({
                data: {
                    serialNumber: 1,
                },
            });
        } else {
            StudentSerialNumber = serialNumber[0].serialNumber + 1;
            await Prisma.studentSerialNumber.update({
                where: {
                    id: serialNumber[0].id,
                },
                data: {
                    serialNumber: StudentSerialNumber,
                },
            });
        }

        /**
         * CREATE STUDENT
         */

        const student = await Prisma.student.create({
            data: {
                img: data.img,
                name: data.name,
                fatherName: data.fatherName,
                motherName: data.motherName,
                gender: data.gender as gender,
                phone: data.phone,
                email: data.email,
                address: {
                    district: data.district,
                    pincode: data.pincode,
                    state: data.state,
                    street: data.address,
                },
                dob: new Date(data.dob),
                dor: new Date(data.dor),
                qualification: data.qualification,
                course: data.course,
                branch: data.branch,
                registration: data.registration,
                serialNumber: StudentSerialNumber,
            },
        });

        const application = await Prisma.studentApplication.delete({
            where: {
                id,
            },
        });

        return Response.json(
            {
                message: "Student Registered Successfully",
                success: true,
                student,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.log("[STUDENT APPLICATION]", error);
        return Response.json({ message: "INTERNAL ERROR", success: false });
    }
};

export const GET = async (req: NextRequest) => {
    try {
        /**
         * CHECK SESSION IS AVAILABLE
         */

        const session = await getServerSession(authOptions);
        if (!session) {
            return Response.json({ message: "Unauthorized", success: false });
        }

        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1;

        /**
         * GET APPLICATIONS
         */

        const applications = await Prisma.studentApplication.findMany({
            where: {
                branch: session.user.userId,
            },
            take: per_page,
            skip: per_page * (page - 1),
        });
        const total = await Prisma.studentApplication.count({
            where: {
                branch: session.user.userId,
            },
        });

        if (!applications) {
            return Response.json({
                message: "Student's application fetching failed",
                success: false,
            });
        }

        return Response.json({
            applications,
            total,
            success: true,
        });
    } catch (error) {
        console.log("[STUDENT APPLICATIONS]", error);
        return Response.json(
            {
                message: "Something went wrong while fetching application.",
                success: false,
            },
            {
                status: 500,
            }
        );
    }
};

/**
 * DELETE Application
 */

export const DELETE = async (req: Request) => {
    try {
        /**
         * CHECK ADMIN OR FRENCHISE IS LOGIN
         */

        const session = await getServerSession(authOptions);
        if (!session) {
            return Response.json({ message: "Unauthorized", success: false });
        }

        /**
         * CHECK FRANCHISE IS ACTIVE OR NOT
         */

        if (session?.user.role === role.FRANCHISE && !session?.user?.isActive) {
            return Response.json({
                message: "Unauthorized",
                success: false,
            });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return Response.json({
                message: "id is required",
                success: false,
            });
        }

        const application = await Prisma.studentApplication.delete({
            where: {
                id,
            },
        });

        if (!application) {
            return Response.json({
                message: "Invalid registration",
                success: false,
            });
        }

        await DELETE_FILE(application.img);

        return Response.json({
            message: "application Deleted successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return Response.json({ message: "Internal Error" });
    }
};
