import { Prisma } from "../../../../../../prisma/prisma";
import { ImageResponse } from "@vercel/og";
import { loadGoogleFont } from "@/lib/FONTS";
import GENERATE_QR from "@/lib/GENERATE_QR";
import { CertificateTemplate } from "./CERTIFICATE_TEMPLATE";
import { StudentWithAllDetails } from "@/lib/TYPES";
import { DOCUMENT_SIZES } from "@/lib/CONSTANTS";

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
            !student?.certificate.issue ||
            student?.Course?.name === "COMPUTER TYPING" ||
            !student?.marks
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
                <CertificateTemplate
                    student={student as StudentWithAllDetails}
                    image={image}
                    qrCodeURl={qrCodeURl}
                />
            ),
            {
                height: DOCUMENT_SIZES.CERTIFICATE.height,
                width: DOCUMENT_SIZES.CERTIFICATE.width,
                fonts: [
                    {
                        name: "NotoSerif",
                        data: fontData,
                        style: "normal",
                        // weight: 200,
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
