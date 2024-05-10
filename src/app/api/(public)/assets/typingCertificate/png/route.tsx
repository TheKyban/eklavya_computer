import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { Prisma } from "../../../../../../../prisma/prisma";
import { ImageResponse } from "@vercel/og";
import qrcode from "qrcode";
import ToCapitalize from "@/lib/toCapitalize";
import { loadGoogleFont } from "@/lib/fonts";
import { format } from "date-fns";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { Course, Marks, Student } from "@prisma/client";

export const dynamic = "force-dynamic";

export const GET = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const image = !!searchParams.get("no_image") ? false : true;

        const token = cookies().get("student");
        if (!token)
            return Response.json(
                {
                    message: "Invalid request",
                    success: false,
                },
                {
                    status: 404,
                },
            );

        const decoded = jwt.verify(token.value, process.env.JWT_STUDENT_KEY!);

        const student = decoded as Student & {
            Course: Course;
            marks: Marks;
            Branch: { branch: string };
        };

        const fontData = await loadGoogleFont("Noto+Serif");

        /**
         * SEND IMAGE AS RESPONSE IF STUDENT IS FOUND AND CERTIFICATE AND ISVERIFIED TRUE
         */

        const Typing_Certificate =
            "https://res.cloudinary.com/ddgjcyk0q/image/upload/q_10/v1715264416/ekavaya_assets/n3htsehgv01jksnqh76z.jpg";

        const QR_Buffer = await qrcode.toBuffer(`${{ name: "aditya" }}`, {
            width: 80,
            margin: 0,
            color: {
                light: "#fff7ed",
            },
        });

        var encoding = "base64";
        var base64Data = Buffer.from(QR_Buffer).toString("base64");
        var qrCodeURl =
            "data:" + "image/png" + ";" + encoding + "," + base64Data;

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
                    {/* CERTIFICATE TEMPLATES */}

                    {image && (
                        // eslint-disable-next-line
                        <img
                            src={Typing_Certificate}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                            }}
                            alt="cert"
                        />
                    )}

                    {/* Student details */}

                    <span
                        style={{
                            position: "absolute",
                            top: 120,
                            left: 1000,
                            color: "white",
                            fontSize: 20,
                        }}
                    >
                        EUPL/{student?.serialNumber}
                    </span>
                    <span
                        style={{
                            position: "absolute",
                            top: 178,
                            left: 1005,
                            fontSize: 20,
                            color: "white",
                        }}
                    >
                        {student?.registration}
                    </span>
                    <span style={{ position: "absolute", top: 295, left: 350 }}>
                        {ToCapitalize(student?.name)}
                    </span>
                    <span style={{ position: "absolute", top: 340, left: 360 }}>
                        {ToCapitalize(student?.fatherName)}
                    </span>
                    <span style={{ position: "absolute", top: 385, left: 380 }}>
                        {student?.registration}
                    </span>
                    <span style={{ position: "absolute", top: 430, left: 370 }}>
                        {student?.Course?.name}
                    </span>
                    <span
                        style={{ position: "absolute", top: 430, right: 130 }}
                    >
                        {student?.Course?.duration}
                    </span>
                    <span style={{ position: "absolute", top: 480, left: 330 }}>
                        {student?.Branch?.branch}
                    </span>
                    <span style={{ position: "absolute", top: 525, left: 330 }}>
                        {student?.branch}
                    </span>

                    {/* Performance */}
                    <span
                        style={{ position: "absolute", top: 620, right: 490 }}
                    >
                        {student?.marks?.typingMarks?.englishTyping}
                    </span>
                    <span
                        style={{ position: "absolute", top: 665, right: 500 }}
                    >
                        {student?.marks?.typingMarks?.hindiTyping}
                    </span>

                    <span
                        style={{
                            position: "absolute",
                            top: 695,
                            left: 240,
                            fontWeight: "bolder",
                            fontSize: 18,
                        }}
                    >
                        {format(new Date(student.updatedAt), "dd/MM/yyyy")}
                    </span>

                    {/* QR CODE */}
                    {/* eslint-disable-next-line  */}
                    <img
                        src={qrCodeURl}
                        alt=""
                        style={{
                            maxWidth: "80px",
                            maxHeight: "80px",
                            position: "absolute",
                            top: 730,
                            right: 430,
                        }}
                    />
                </div>
            ),
            {
                height: 848,
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
        console.log("GET CERTIFICATE", error);
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
