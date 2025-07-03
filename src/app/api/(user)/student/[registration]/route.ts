import { Prisma } from "../../../../../../prisma/prisma";

export const GET = async (
    req: Request,
    {
        params,
    }: {
        params: Promise<{ registration: string }>;
    },
) => {
    const registration = (await params).registration;
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
            Course: true,
            Branch: {
                select: {
                    branch: true,
                },
            },
            marks: true,
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

    if (
        !student?.isVerified ||
        !student?.marksheet?.issue ||
        student?.Course?.name === "COMPUTER TYPING"
    ) {
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

    return Response.json(
        {
            message: "Student fetched successfully",
            success: true,
            student,
        },
        {
            status: 200,
        },
    );
};
