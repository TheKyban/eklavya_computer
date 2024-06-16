import { ImageResponse } from "@vercel/og";
import { loadGoogleFont } from "@/lib/FONTS";
import { Prisma } from "../../../../../../prisma/prisma";
import { ICardTemplate } from "./ICARD_TEMPLATE";

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

        if (!student?.isVerified || !student?.icard?.issue) {
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

        const fontData = await loadGoogleFont("Noto+Serif");

        return new ImageResponse(
            <ICardTemplate image={image} student={student} />,
            {
                // width: 204,
                // height: 324,
                width: 404,
                height: 645,
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
