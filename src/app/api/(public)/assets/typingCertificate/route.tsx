import { Prisma } from "../../../../../../prisma/prisma";
import { ImageResponse } from "@vercel/og";
import { loadGoogleFont } from "@/lib/FONTS";
import GENERATE_QR from "@/lib/GENERATE_QR";
import { TypingCertificateTemplate } from "./TYPING_CERTIFICATE_TEMPLATE";
import { StudentWithAllDetails } from "@/lib/TYPES";
import { DOCUMENT_SIZES } from "@/lib/CONSTANTS";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const GET = async (req: Request) => {
    try {
        /**
         * GET REGISTRATION
         */
        const { searchParams } = new URL(req.url);
        const registration = searchParams?.get("registration");
        const image = !!searchParams?.get("no_image") ? false : true;

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
                marks: true,
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

        if (
            !student?.isVerified ||
            student?.Course?.name !== "COMPUTER TYPING" ||
            !student?.certificate?.issue
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

        const fontData = await loadGoogleFont();

        const qrCodeURl = await GENERATE_QR(student);

        return new ImageResponse(
            (
                <TypingCertificateTemplate
                    student={
                        student as StudentWithAllDetails & {
                            Branch: { branch: string };
                        }
                    }
                    image={image}
                    qrCodeURl={qrCodeURl}
                />
            ),
            {
                height: DOCUMENT_SIZES.TYPING_CERTIFICATE.height,
                fonts: [
                    {
                        name: "NotoSerif",
                        data: fontData,
                        style: "normal",
                    },
                ],
            },
        );
    } catch (error) {
        console.log("[STUDENT ZONE]", error);
        return Response.json(
            { message: "Internal Error", error },
            { status: 500 },
        );
    }
};
