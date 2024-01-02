import { NextResponse } from "next/server";
import { Prisma } from "../../../../../../prisma/prisma";

export const GET = async (
    req: Request,
    { params }: { params: { formNumber: string } }
) => {
    try {
        if (!params.formNumber) {
            return NextResponse.json(
                {
                    message: "Form number or regisatration number is required.",
                },
                { status: 404 }
            );
        }

        const reqParams = new URLSearchParams(req.url);
        const type = reqParams.get("type") || "registration";

        /**
         * REGISTRATION VERIFICATION
         */

        if (type === "registration") {
            const student = await Prisma.student.findFirst({
                where: {
                    formNumber: params.formNumber,
                    isVerified: true,
                },
                select: {
                    img: true,
                    name: true,
                    branch: true,
                    course: true,
                    fatherName: true,
                    formNumber: true,
                },
            });

            if (!student) {
                return NextResponse.json(
                    { message: "Not Verified." },
                    { status: 200 }
                );
            }

            const branch = await Prisma.user.findFirst({
                where: {
                    userId: student.branch,
                },
                select: {
                    branch: true,
                },
            });

            return NextResponse.json({
                student: {
                    ...student,
                    branchName: branch?.branch,
                },
            });
        }
    } catch (error) {
        console.log("[STUDENT ZONE]", error);
        return NextResponse.json(
            { message: "Internal Error" },
            { status: 500 }
        );
    }
};
