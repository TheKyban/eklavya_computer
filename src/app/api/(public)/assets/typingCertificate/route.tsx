import { Prisma } from "../../../../../../prisma/prisma";
import { ImageResponse } from "@vercel/og";
import qrcode from "qrcode";
import { format } from "date-fns";
import { TO_CAPITALIZE } from "@/lib/STYLES";
import { loadGoogleFont } from "@/lib/FONTS";

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
            !student?.certificate
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

        const fontData = await loadGoogleFont("Noto+Serif");

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
                        {TO_CAPITALIZE(student?.name)}
                    </span>
                    <span style={{ position: "absolute", top: 340, left: 360 }}>
                        {TO_CAPITALIZE(student?.fatherName)}
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
        console.log("[STUDENT ZONE]", error);
        return Response.json(
            { message: "Internal Error", error },
            { status: 500 },
        );
    }
};
