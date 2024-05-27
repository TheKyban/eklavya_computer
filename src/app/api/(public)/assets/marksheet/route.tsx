import { ImageResponse } from "@vercel/og";
import qrcode from "qrcode";
import STUDENT_STATS from "@/lib/STUDENT_STATS";
import { format } from "date-fns";
import { TO_CAPITALIZE } from "@/lib/STYLES";
import { loadGoogleFont } from "@/lib/FONTS";
import { Prisma } from "../../../../../../prisma/prisma";

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

        const studentStats = new STUDENT_STATS(
            [
                student?.marks?.marks?.practical!,
                student?.marks?.marks?.project!,
                student?.marks?.marks?.viva!,
                student?.marks?.marks?.written!,
            ],
            400,
        );

        const fontData = await loadGoogleFont("Noto+Serif");

        const marksheetUrl =
            "https://res.cloudinary.com/ddgjcyk0q/image/upload/q_10/v1715263907/ekavaya_assets/kctsnnrujvfhkmoixley.jpg";

        const QR_buffer = await qrcode.toBuffer(
            `${{
                name: student?.name,
                registration: student?.registration,
                fatherName: student?.fatherName,
                motherName: student?.motherName,
                branch: student?.Branch?.branch,
                branchCode: student?.branch,
            }}`,
            {
                width: 80,
                margin: 0,
                color: {
                    light: "#fff7ed",
                },
            },
        );

        var base64Data = Buffer.from(QR_buffer).toString("base64");
        var encoding = "base64";
        var qrCodeURl =
            "data:" + "image/png" + ";" + encoding + "," + base64Data;

        return new ImageResponse(
            (
                <div
                    style={{
                        fontSize: 16,
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
                            top: 170,
                            left: 130,
                        }}
                    >
                        {`EUPL/${student?.serialNumber}`}
                    </span>

                    {/* registration number */}
                    <span
                        style={{
                            position: "absolute",
                            top: 170,
                            left: 600,
                        }}
                    >
                        {student?.registration}
                    </span>

                    <span style={{ position: "absolute", top: 270, left: 280 }}>
                        {TO_CAPITALIZE(student?.name)}
                    </span>
                    <span style={{ position: "absolute", top: 300, left: 280 }}>
                        {TO_CAPITALIZE(student?.motherName)}
                    </span>
                    <span style={{ position: "absolute", top: 327, left: 280 }}>
                        {TO_CAPITALIZE(student?.fatherName)}
                    </span>
                    <span style={{ position: "absolute", top: 357, left: 280 }}>
                        {student?.Course?.name} ( {student?.Course?.fullName} )
                    </span>
                    <span style={{ position: "absolute", top: 383, left: 280 }}>
                        {student?.Course?.duration}
                    </span>
                    <span style={{ position: "absolute", top: 410, left: 280 }}>
                        {student?.Branch.branch}
                    </span>
                    <span style={{ position: "absolute", top: 440, left: 280 }}>
                        {student?.branch}
                    </span>

                    {/* MODULES */}
                    <pre
                        style={{
                            position: "absolute",
                            top: 485,
                            left: 60,
                            fontSize: 14,
                            // border: "1px solid red",
                            height: 130,
                            width: 700,
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
                            top: 687,
                            right: 170,
                            fontSize: 16,
                            fontWeight: 600,
                        }}
                    >
                        {student?.marks?.marks?.written}
                    </span>
                    <span
                        style={{
                            position: "absolute",
                            top: 720,
                            right: 170,
                            fontSize: 16,
                            fontWeight: 600,
                        }}
                    >
                        {student?.marks?.marks?.practical}
                    </span>
                    <span
                        style={{
                            position: "absolute",
                            top: 752,
                            right: 170,
                            fontSize: 16,
                            fontWeight: 600,
                        }}
                    >
                        {student?.marks?.marks?.project}
                    </span>
                    <span
                        style={{
                            position: "absolute",
                            top: 783,
                            right: 170,
                            fontSize: 16,
                            fontWeight: 600,
                        }}
                    >
                        {student?.marks?.marks?.viva}
                    </span>

                    {/* performance */}
                    <span
                        style={{
                            position: "absolute",
                            top: 830,
                            left: 300,
                        }}
                    >
                        {studentStats?.getPercentage()}%
                    </span>
                    <span
                        style={{
                            position: "absolute",
                            top: 830,
                            left: 600,
                        }}
                    >
                        {studentStats?.getPerformance()}
                    </span>

                    <span
                        style={{
                            position: "absolute",
                            top: 965,
                            left: 180,
                            fontWeight: "bolder",
                            fontSize: 16,
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
                            maxWidth: "60px",
                            maxHeight: "60px",
                            position: "absolute",
                            top: 1005,
                            right: 300,
                        }}
                    />
                </div>
            ),
            {
                width: 796.8,
                height: 1123.2,
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
