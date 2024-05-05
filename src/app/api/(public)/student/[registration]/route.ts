import { Prisma } from "../../../../../../prisma/prisma";

export const GET = async (
    req: Request,
    { params }: { params: { registration: string } }
) => {
    try {
        if (!params.registration) {
            return Response.json(
                {
                    message: "Regisatration number is required.",
                },
                { status: 400 }
            );
        }

        /**
         * REGISTRATION VERIFICATION OR I CARD VERIFICATION
         */

        const student = await Prisma.student.findFirst({
            where: {
                registration: params.registration,
            },
            include: {
                Branch: {
                    select: {
                        branch: true,
                        userId: true,
                    },
                },
                Course: {
                    select: {
                        name: true,
                        fullName: true,
                        duration: true,
                        modules: true,
                    },
                },
                marks: true,
            },
        });

        if (!student) {
            return Response.json(
                { message: "Student not found." },
                { status: 400 }
            );
        }

        if (!student?.isVerified) {
            return Response.json(
                {
                    message: "Not Verified.",
                    success: false,
                },
                { status: 400 }
            );
        }

        return Response.json(
            {
                student,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log("[STUDENT ZONE]", error);
        return Response.json({ message: "Internal Error" }, { status: 500 });
    }
};
