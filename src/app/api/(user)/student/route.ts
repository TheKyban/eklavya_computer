import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { gender, role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Prisma } from "../../../../../prisma/prisma";
import { STUDENT_SCHEMA } from "@/lib/SCHEMA";
import { z } from "zod";
import { per_page } from "@/lib/CONSTANTS";
import { DELETE_FILE } from "@/lib/CLOUDINARY";

/**
 * REGISTER STUDENTS
 */
export const POST = async (req: Request) => {
    try {
        /**
         * CHECK ADMIN OR FRENCHISE IS LOGIN
         */

        const session = await getServerSession(AUTH_OPTIONS);

        if (
            !session?.user ||
            (session?.user.role === role.FRANCHISE && !session?.user?.isActive)
        ) {
            return NextResponse.json(
                {
                    message: "Unauthorized",
                    success: false,
                },
                {
                    status: 401,
                },
            );
        }

        /**
         * VALIDATE DATA
         */

        const data: z.infer<typeof STUDENT_SCHEMA> = await req.json();
        const dataVerify = STUDENT_SCHEMA.safeParse({
            ...data,
            dob: new Date(data.dob),
            dor: new Date(data.dor),
        });
        if (!dataVerify?.success) {
            return NextResponse.json(
                {
                    message:
                        dataVerify.error?.errors?.[0].message ||
                        "All fields are required",
                    success: false,
                },
                { status: 400 },
            );
        }

        /**
         * Validate Student form
         */

        // form number and branch id should not to be same
        if (data.registration === data.branch) {
            return NextResponse.json(
                {
                    message: "Form number must be unique",
                    success: false,
                },
                {
                    status: 400,
                },
            );
        }

        // from number should be followed by branch userId
        if (!data.registration.startsWith(data.branch)) {
            return NextResponse.json(
                {
                    message: "Form number must be follow by branch id",
                    success: false,
                },
                {
                    status: 400,
                },
            );
        }

        const isFormNumberExist = await Prisma.student.findUnique({
            where: {
                registration: data.registration,
            },
        });

        if (!!isFormNumberExist) {
            return NextResponse.json(
                {
                    message: "Form number must be unique",
                    success: false,
                },
                {
                    status: 400,
                },
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
                certificate: {
                    issue: false,
                },
                icard: {
                    issue: false,
                },
                marksheet: {
                    issue: false,
                },
            },
        });

        return NextResponse.json(
            {
                message: "Student Registered Successfully",
                success: true,
                student,
            },
            {
                status: 201,
            },
        );
    } catch (error) {
        console.log("[STUDENT]", error);
        return NextResponse.json(
            { message: "INTERNAL ERROR", success: false },
            {
                status: 500,
            },
        );
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

        const session = await getServerSession(AUTH_OPTIONS);

        if (
            !session?.user ||
            (session?.user.role === role.FRANCHISE && !session?.user?.isActive)
        ) {
            return NextResponse.json(
                {
                    message: "Unauthorized",
                    success: false,
                },
                {
                    status: 401,
                },
            );
        }

        /**
         * VALIDATE DATA
         */

        const data: z.infer<typeof STUDENT_SCHEMA> = await req.json();
        const { success } = STUDENT_SCHEMA.safeParse({
            ...data,
            dob: new Date(data.dob),
            dor: new Date(data.dor),
        });
        if (!success) {
            return NextResponse.json(
                {
                    message: "Invalid data",
                    success: false,
                },
                {
                    status: 400,
                },
            );
        }

        /**
         * Validate Student form
         */

        // form number and branch id should not to be same
        if (data.registration === data.branch) {
            return NextResponse.json(
                {
                    message: "Invalid form number",
                    success: false,
                },
                {
                    status: 400,
                },
            );
        }

        // from number should be followed by branch userId
        if (!data.registration.startsWith(data.branch)) {
            return NextResponse.json(
                {
                    message: "Invalid form number",
                    success: false,
                },
                {
                    status: 400,
                },
            );
        }

        /**
         * UPDATE STUDENT
         */

        const student = await Prisma.student.update({
            where: {
                registration: data.registration,
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
            include: {
                Course: true,
            },
        });

        if (!student) {
            return NextResponse.json(
                {
                    message: "Invalid details",
                    success: false,
                    student,
                },
                {
                    status: 400,
                },
            );
        }

        return NextResponse.json(
            {
                message: "Student Updated Successfully",
                success: true,
                student,
            },
            {
                status: 202,
            },
        );
    } catch (error) {
        console.log("[STUDENT UPDATE]", error);
        return NextResponse.json(
            { message: "INTERNAL ERROR", success: false },
            {
                status: 500,
            },
        );
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

        const session = await getServerSession(AUTH_OPTIONS);

        if (
            !session?.user ||
            (session?.user.role === role.FRANCHISE && !session?.user?.isActive)
        ) {
            return NextResponse.json(
                {
                    message: "Unauthorized",
                    success: false,
                },
                {
                    status: 401,
                },
            );
        }

        const { searchParams } = new URL(req.url);
        const page = Number(searchParams?.get("page")) || 1;
        const pending = !!searchParams?.get("pending") ? false : true;
        const registration = searchParams?.get("registration") || "";

        /**
         * FINDING STUDENTS
         */

        const students = await Prisma.student.findMany({
            take: per_page,
            skip: per_page * (page - 1),
            where: {
                branch: session.user.userId,
                registration: {
                    contains: registration,
                },
                isVerified: pending,
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
                branch: session.user.userId,
                registration: {
                    contains: registration,
                },
                isVerified: pending,
            },
        });

        return NextResponse.json(
            { total, students },
            {
                status: 200,
            },
        );
    } catch (error) {
        console.log("[GET STUDENT]", error);
        return new NextResponse("Internal Error", {
            status: 500,
        });
    }
};

/**
 * DELETE STUDENT
 */

export const DELETE = async (req: Request) => {
    try {
        /**
         * CHECK ADMIN OR FRENCHISE IS LOGIN
         */

        const session = await getServerSession(AUTH_OPTIONS);

        if (
            !session?.user ||
            (session?.user.role === role.FRANCHISE && !session?.user?.isActive)
        ) {
            return NextResponse.json(
                {
                    message: "Unauthorized",
                    success: false,
                },
                {
                    status: 401,
                },
            );
        }

        const { searchParams } = new URL(req.url);
        const registration = searchParams?.get("registration");

        if (!registration) {
            return NextResponse.json(
                {
                    message: "Required registration",
                    success: false,
                },
                {
                    status: 400,
                },
            );
        }

        const student = await Prisma.student.delete({
            where: {
                registration,
            },
        });

        if (!student) {
            return NextResponse.json(
                {
                    message: "Invalid registration",
                    success: false,
                },
                {
                    status: 400,
                },
            );
        }

        DELETE_FILE(student.img);

        return NextResponse.json(
            {
                message: "Student Deleted successfully",
                success: true,
            },
            {
                status: 202,
            },
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Error" },
            {
                status: 500,
            },
        );
    }
};
