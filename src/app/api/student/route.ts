import { authOptions } from "@/lib/auth-options";
import { gender, role } from "@prisma/client";
import { Session, getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Prisma } from "../../../../prisma/prisma";
import { studentSchema } from "@/lib/schema";
import { z } from "zod";
import { per_page } from "@/lib/constants";

/**
 * REGISTER STUDENTS
 */
export const POST = async (req: Request) => {
    try {
        /**
         * CHECK ADMIN OR FRENCHISE IS LOGIN
         */

        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({
                message: "Unauthorized",
                success: false,
            });
        }

        /**
         * CHECK FRANCHISE IS ACTIVE OR NOT
         */

        if (session?.user.role === role.FRANCHISE && !session?.user?.isActive) {
            return NextResponse.json({
                message: "Unauthorized",
                success: false,
            });
        }

        /**
         * VALIDATE DATA
         */

        const data: z.infer<typeof studentSchema> = await req.json();
        const { success } = studentSchema.safeParse({
            ...data,
            dob: new Date(data.dob),
            dor: new Date(data.dor),
        });
        if (!success) {
            return NextResponse.json({
                message: "All fields are required",
                success: false,
            });
        }

        /**
         * Validate Student form
         */

        // form number and branch id should not to be same
        if (data.formNumber === data.branch) {
            return NextResponse.json({
                message: "Form number must be unique",
                success: false,
            });
        }

        // from number should be followed by branch userId
        if (!data.formNumber.startsWith(data.branch)) {
            return NextResponse.json({
                message: "Form number must be follow by branch id",
                success: false,
            });
        }

        const isFormNumberExist = await Prisma.student.findUnique({
            where: {
                formNumber: data.formNumber,
            },
        });

        if (!!isFormNumberExist) {
            return NextResponse.json({
                message: "Form number must be unique",
                success: false,
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
                formNumber: data.formNumber,
            },
        });

        /**
         * Disconnect Db
         */

        return NextResponse.json({
            message: "Student Registered Successfully",
            success: true,
            student,
        });
    } catch (error) {
        console.log("[STUDENT]", error);
        return NextResponse.json({ message: "INTERNAL ERROR", success: false });
    }
};
/**
 * UPDATE STUDENTS
 */
export const PUT = async (req: Request) => {
    try {
        /**
         * CHECK ADMIN OR FRENCHISE IS LOGIN
         */

        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({
                message: "Unauthorized",
                success: false,
            });
        }

        /**
         * CHECK FRANCHISE IS ACTIVE OR NOT
         */

        if (session?.user.role === role.FRANCHISE && !session?.user?.isActive) {
            return NextResponse.json({
                message: "Unauthorized",
                success: false,
            });
        }

        /**
         * VALIDATE DATA
         */

        const data: z.infer<typeof studentSchema> = await req.json();
        const { success } = studentSchema.safeParse({
            ...data,
            dob: new Date(data.dob),
            dor: new Date(data.dor),
        });
        if (!success) {
            return NextResponse.json({
                message: "Invalid data",
                success: false,
            });
        }

        /**
         * Validate Student form
         */

        // form number and branch id should not to be same
        if (data.formNumber === data.branch) {
            return NextResponse.json({
                message: "Invalid form number",
                success: false,
            });
        }

        // from number should be followed by branch userId
        if (!data.formNumber.startsWith(data.branch)) {
            return NextResponse.json({
                message: "Invalid form number",
                success: false,
            });
        }

        const isFormNumberExist = await Prisma.student.findUnique({
            where: {
                formNumber: data.formNumber,
            },
        });

        /**
         * UPDATE STUDENT
         */

        const student = await Prisma.student.update({
            where: {
                formNumber: data.formNumber,
                branch: data.branch,
            },
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
            },
        });

        if (!student) {
            return NextResponse.json({
                message: "Invalid details",
                success: false,
                student,
            });
        }

        return NextResponse.json({
            message: "Student Updated Successfully",
            success: true,
            student,
        });
    } catch (error) {
        console.log("[STUDENT UPDATE]", error);
        return NextResponse.json({ message: "INTERNAL ERROR", success: false });
    }
};

/**
 * GET STUDENTS
 */

export const GET = async (req: Request) => {
    try {
        /**
         * CHECK ADMIN OR FRENCHISE IS LOGIN
         */

        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({
                message: "Unauthorized",
                success: false,
            });
        }

        /**
         * CHECK FRANCHISE IS ACTIVE OR NOT
         */

        if (session?.user.role === role.FRANCHISE && !session?.user?.isActive) {
            return NextResponse.json({
                message: "Unauthorized",
                success: false,
            });
        }
        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1;
        const pending = !!searchParams.get("pending") ? false : true;
        const formNumber = searchParams.get("formNumber") || "";

        /**
         * FINDING STUDENTS
         */

        const students = await Prisma.student.findMany({
            take: per_page,
            skip: per_page * (page - 1),
            where: {
                branch: session.user.userId,
                formNumber: {
                    contains: formNumber,
                },
                isVerified: pending,
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
                branch: session.user.userId,
                formNumber: {
                    contains: formNumber,
                },
                isVerified: pending,
            },
        });

        return NextResponse.json({ total, students });
    } catch (error) {
        console.log("[GET STUDENT]", error);
        return new NextResponse("Internal Error");
    }
};

/**
 * DELETE USER
 */

export const DELETE = async (req: Request) => {
    try {
        /**
         * CHECK ADMIN OR FRENCHISE IS LOGIN
         */

        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({
                message: "Unauthorized",
                success: false,
            });
        }

        /**
         * CHECK FRANCHISE IS ACTIVE OR NOT
         */

        if (session?.user.role === role.FRANCHISE && !session?.user?.isActive) {
            return NextResponse.json({
                message: "Unauthorized",
                success: false,
            });
        }

        const url = req.url;
        const { searchParams } = new URL(url);
        const formNumber = searchParams.get("formNumber");

        if (!formNumber) {
            return NextResponse.json({
                message: "Required formNumber",
                success: false,
            });
        }

        const student = await Prisma.student.delete({
            where: {
                formNumber,
            },
        });

        if (!student) {
            return NextResponse.json({
                message: "Invalid registration",
                success: false,
            });
        }

        return NextResponse.json({
            message: "Student Deleted successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Error" });
    }
};
