import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { Prisma } from "../../../../../../prisma/prisma";
import { ImageResponse } from "@vercel/og";
import ToCapitalize from "@/lib/toCapitalize";
import { format } from "date-fns";
import { loadGoogleFont } from "@/lib/fonts";

export const dynamic = "force-dynamic";

export const GET = async (req: Request) => {
    try {
        /**
         * GET REGISTRATION
         */
        const { searchParams } = new URL(req.url);
        const registration = searchParams.get("registration");
        const image = !!searchParams.get("no_image") ? false : true;

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

        /**
         * FIND STUDENT FROM REGISTRATION
         */

        const student = await Prisma.student.findUnique({
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

        /**
         * SEND ERROR IF STUDENT IS NOT FOUND
         */

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
        } else if (!student?.isVerified || !student?.icard) {
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

        const I_CARD_IMG =
            "https://res.cloudinary.com/ddgjcyk0q/image/upload/q_10/v1715232604/ekavaya_assets/zc3imktyxfxg8fk2zqfo.jpg";

        return new ImageResponse(
            (
                <div
                    style={{
                        fontSize: 25,
                        color: "black",
                        background: "white",
                        display: "flex",
                        height: "100%",
                        width: "100%",
                        fontFamily: "NotoSerif",
                    }}
                >
                    {/* I-CARD TEMPLATES */}
                    {image && (
                        // eslint-disable-next-line
                        <img
                            src={I_CARD_IMG}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                            }}
                            alt="cert"
                        />
                    )}
                    {/* Student Image */}
                    {/* eslint-disable-next-line  */}
                    <img
                        src={student?.img}
                        style={{
                            position: "absolute",
                            top: 145,
                            left: 160,
                            width: 280,
                            height: 290,
                        }}
                    />

                    <span
                        style={{
                            position: "absolute",
                            top: 450,
                            fontSize: 30,
                            fontWeight: "bolder",
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        {ToCapitalize(student?.name)}
                    </span>
                    <span style={{ position: "absolute", top: 495, left: 280 }}>
                        {student?.registration}
                    </span>
                    <span style={{ position: "absolute", top: 535, left: 280 }}>
                        {ToCapitalize(student?.fatherName)}
                    </span>

                    <span style={{ position: "absolute", top: 575, left: 280 }}>
                        {format(new Date(student.dob), "dd/MM/yyyy")}
                    </span>

                    <span style={{ position: "absolute", top: 615, left: 280 }}>
                        {student?.Course?.name}
                    </span>
                    <span style={{ position: "absolute", top: 655, left: 280 }}>
                        {student?.Course?.duration}
                    </span>
                    <span
                        style={{
                            position: "absolute",
                            top: 740,
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        {student?.Branch?.branch}
                    </span>
                </div>
            ),
            {
                width: 599,
                height: 957,
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
        console.log("GET ICARD", error);
        return Response.json(
            {
                message:
                    (error as PrismaClientUnknownRequestError)?.message ||
                    "Internal Error",
            },
            {
                status: 500,
            },
        );
    }
};
