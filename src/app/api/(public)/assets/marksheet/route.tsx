import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { Prisma } from "../../../../../../prisma/prisma";
import { ImageResponse } from "@vercel/og";
import qrcode from "qrcode";
import StudentStats from "@/lib/StudentStats";
import { format } from "date-fns";
import ToCapitalize from "@/lib/toCapitalize";
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
                Course: true,
                Branch: {
                    select: {
                        branch: true,
                    },
                },
                marks: true,
            },
        });

        const studentStats = new StudentStats(
            [
                student?.marks?.marks?.practical!,
                student?.marks?.marks?.project!,
                student?.marks?.marks?.viva!,
                student?.marks?.marks?.written!,
            ],
            400,
        );
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
        } else if (
            !student?.isVerified ||
            !student?.marksheet ||
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

        const fontData = await loadGoogleFont("Noto+Serif");

        /**
         * SEND IMAGE AS RESPONSE IF STUDENT IS FOUND AND CERTIFICATE AND ISVERIFIED TRUE
         */
        const marksheetUrl =
            "https://res.cloudinary.com/ddgjcyk0q/image/upload/q_10/v1715263907/ekavaya_assets/kctsnnrujvfhkmoixley.jpg";

        const QR_buffer = await qrcode.toBuffer(`${{ name: "aditya" }}`, {
            width: 80,
            margin: 0,
            color: {
                light: "#fff7ed",
            },
        });

        var base64Data = Buffer.from(QR_buffer).toString("base64");
        var encoding = "base64";
        var qrCodeURl =
            "data:" + "image/png" + ";" + encoding + "," + base64Data;

        return new ImageResponse(
            (
                <div
                    style={{
                        fontSize: 25,
                        color: "black",
                        background: "white",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        fontFamily: "NotoSerif",
                    }}
                >
                    {/* MARKSHEET TEMPLATES */}
                    {image && (
                        // eslint-disable-next-line
                        <img
                            src={marksheetUrl}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                            }}
                            alt="cert"
                        />
                    )}
                    {/* Serial number */}
                    <span
                        style={{
                            position: "absolute",
                            top: 245,
                            left: 200,
                            fontSize: 22,
                        }}
                    >
                        {`EUPL/${student?.serialNumber}`}
                    </span>

                    {/* registration number */}
                    <span
                        style={{
                            position: "absolute",
                            top: 245,
                            left: 880,
                            fontSize: 22,
                        }}
                    >
                        {student?.registration}
                    </span>
                    <span style={{ position: "absolute", top: 383, left: 380 }}>
                        {ToCapitalize(student?.name)}
                    </span>
                    <span style={{ position: "absolute", top: 423, left: 380 }}>
                        {ToCapitalize(student?.motherName)}
                    </span>
                    <span style={{ position: "absolute", top: 463, left: 380 }}>
                        {ToCapitalize(student?.fatherName)}
                    </span>
                    <span style={{ position: "absolute", top: 503, left: 380 }}>
                        {student?.Course?.name} ( {student?.Course?.fullName} )
                    </span>
                    <span style={{ position: "absolute", top: 543, left: 380 }}>
                        {student?.Course?.duration}
                    </span>
                    <span style={{ position: "absolute", top: 583, left: 380 }}>
                        {student?.Branch.branch}
                    </span>
                    <span style={{ position: "absolute", top: 623, left: 380 }}>
                        {student?.branch}
                    </span>

                    {/* MODULES */}
                    <pre
                        style={{
                            position: "absolute",
                            top: 685,
                            left: 95,
                            fontSize: 21,
                            // border: "1px solid red",
                            height: 180,
                            width: 945,
                            lineHeight: 1.3,
                            whiteSpace: "pre-line",
                        }}
                    >
                        {`${student?.Course?.modules}`}
                    </pre>

                    {/* Marks */}
                    <span
                        style={{
                            position: "absolute",
                            top: 980,
                            right: 250,
                            fontSize: 22,
                            fontWeight: 600,
                            lineHeight: 0.7,
                        }}
                    >
                        {student?.marks?.marks?.written}
                    </span>
                    <span
                        style={{
                            position: "absolute",
                            top: 1030,
                            right: 250,
                            fontSize: 22,
                            fontWeight: 600,
                            lineHeight: 0.7,
                        }}
                    >
                        {student?.marks?.marks?.practical}
                    </span>
                    <span
                        style={{
                            position: "absolute",
                            top: 1072,
                            right: 250,
                            fontSize: 22,
                            fontWeight: 600,
                            lineHeight: 0.7,
                        }}
                    >
                        {student?.marks?.marks?.project}
                    </span>
                    <span
                        style={{
                            position: "absolute",
                            top: 1115,
                            right: 250,
                            fontSize: 22,
                            fontWeight: 600,
                            lineHeight: 0.7,
                        }}
                    >
                        {student?.marks?.marks?.viva}
                    </span>

                    {/* performance */}
                    <span
                        style={{
                            position: "absolute",
                            top: 1180,
                            left: 400,
                        }}
                    >
                        {studentStats?.getPercentage()}%
                    </span>
                    <span
                        style={{
                            position: "absolute",
                            top: 1180,
                            left: 860,
                        }}
                    >
                        {studentStats?.getPerformance()}
                    </span>
                    <span
                        style={{
                            position: "absolute",
                            top: 1370,
                            left: 250,
                            fontWeight: "bolder",
                            fontSize: 22,
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
                            top: 1400,
                            right: 450,
                        }}
                    />
                </div>
            ),
            {
                width: 1131,
                height: 1599,
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
        console.log("GET MARKSHEET", error);
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
