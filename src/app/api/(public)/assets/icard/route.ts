import { cookies } from "next/headers";
import { Prisma } from "../../../../../../prisma/prisma";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

export const GET = async (req: Request) => {
    try {
        /**
         * GET REGISTRATION
         */
        const { searchParams } = new URL(req.url);
        const registration = searchParams.get("registration");
        const image = !!searchParams.get("no_image") ? true : false;

        if (!registration) {
            return Response.json(
                {
                    message: "Missing registration",
                    success: false,
                },
                {
                    status: 400,
                },
            );
        }

        // FIND STUDENT FROM REGISTRATION
        const student = await Prisma.student.findFirst({
            where: {
                registration,
            },
            include: {
                Course: {
                    select: {
                        name: true,
                        duration: true,
                        fullName: true,
                    },
                },
                Branch: {
                    select: {
                        branch: true,
                    },
                },
            },
        });

        // VALIDATE STUDENT
        if (!student) {
            return Response.json(
                {
                    message: "Student not found",
                    success: false,
                },
                {
                    status: 404,
                },
            );
        }

        if (!student?.isVerified || !student?.icard) {
            return Response.json(
                {
                    message: !student?.isVerified
                        ? "Not Verified"
                        : "Not Generated",
                    success: false,
                },
                {
                    status: 404,
                },
            );
        }

        // JWT TOKEN
        const STUDENT_JWT = jwt.sign(student, process.env.JWT_STUDENT_KEY!, {
            expiresIn: "5M",
        });

        cookies().set({
            name: "student",
            value: STUDENT_JWT,
            httpOnly: true,
            secure: true,
            expires: Date.now() + 1000 * 60,
            sameSite: "lax",
            path: "/",
        });

        return Response.json(
            {
                png: `/api/assets/icard/png${image ? "?no_image=true" : ""}`,
            },
            {
                status: 200,
            },
        );
    } catch (error) {
        console.log("[STUDENT ZONE]", error);
        return Response.json({ message: "Internal Error" }, { status: 500 });
    }
};
