import { authOptions } from "@/lib/auth-options";
import { gender, role } from "@prisma/client";
import { getServerSession } from "next-auth";
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
         * CREATING REGISTRATION NUMBER
         */

        let registrationNumber: string;

        if (session.user.students < 100) {
            if (session.user.students < 10) {
                registrationNumber =
                    session.user.userId + "00" + session.user.students + 1;
            } else {
                registrationNumber =
                    session.user.userId + "0" + session.user.students + 1;
            }
        } else {
            registrationNumber =
                session.user.userId + session.user.students + 1;
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
                registration: registrationNumber,
                branch: data.branch,
                formNumber: data.formNumber,
            },
        });

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
        const registration = searchParams.get("registration");
        /**
         * FINDING STUDENTS
         */

        const students = await Prisma.student.findMany({
            take: per_page,
            skip: per_page * (page - 1),
            where: {
                branch: session.user.userId,
                registration: {
                    contains: registration ? registration : "",
                },
                isVerified: false,
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
                registration: {
                    contains: registration ? registration : "",
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
        const registration = searchParams.get("registration");

        if (!registration) {
            return NextResponse.json({
                message: "Required registration",
                success: false,
            });
        }

        const student = await Prisma.student.delete({
            where: {
                registration,
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
    } catch (error) {}
};
