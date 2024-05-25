import { Prisma } from "../../../../../../prisma/prisma";
import { ImageResponse } from "@vercel/og";
import qrcode from "qrcode";
import { TO_CAPITALIZE } from "@/lib/STYLES";
import STUDENT_STATS from "@/lib/STUDENT_STATS";
import { loadGoogleFont } from "@/lib/FONTS";
import { format } from "date-fns";
import { Duration } from "@/lib/CONSTANTS";

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
            !student?.certificate ||
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

        const fontData = await loadGoogleFont("Noto+Serif");

        const str = await qrcode.toBuffer(`${{ name: "aditya" }}`, {
            width: 80,
            margin: 0,
            color: {
                light: "#fff7ed",
            },
        });

        var encoding = "base64";
        var base64Data = Buffer.from(str).toString("base64");
        var qrCodeURl =
            "data:" + "image/png" + ";" + encoding + "," + base64Data;

        const studentStats = new STUDENT_STATS(
            [
                student?.marks?.marks?.practical!,
                student?.marks?.marks?.project!,
                student?.marks?.marks?.viva!,
                student?.marks?.marks?.written!,
            ],
            400,
        );

        const completeDate = (new Date(student.dor).getTime() +
            1000 *
                Duration[
                    student.Course.duration as keyof typeof Duration
                ]) as number;

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
                            src="https://res.cloudinary.com/ddgjcyk0q/image/upload/q_5/v1715183433/ekavaya_assets/z37jjeti3t0lasea40sn.jpg"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                            }}
                            alt="cert"
                        />
                    )}

                    <span
                        style={{
                            position: "absolute",
                            top: 120,
                            left: 1000,
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
                        }}
                    >
                        {student?.registration}
                    </span>
                    <span style={{ position: "absolute", top: 353, left: 480 }}>
                        {TO_CAPITALIZE(student?.name)}
                    </span>
                    <span style={{ position: "absolute", top: 400, left: 460 }}>
                        {TO_CAPITALIZE(student?.fatherName)}
                    </span>
                    <span
                        style={{
                            position: "absolute",
                            top: 450,
                            left: 500,
                            fontSize: 22,
                        }}
                    >
                        {student?.Course?.name} ({student?.Course?.fullName})
                    </span>
                    <span style={{ position: "absolute", top: 490, left: 480 }}>
                        {student?.Branch?.branch}
                    </span>

                    <span style={{ position: "absolute", top: 535, left: 230 }}>
                        {student?.branch}
                    </span>

                    <span
                        style={{
                            position: "absolute",
                            top: 540,
                            left: 560,
                            fontSize: 22,
                        }}
                    >
                        {student?.Course?.duration}
                    </span>
                    <span
                        style={{
                            position: "absolute",
                            top: 540,
                            left: 860,
                            fontSize: 22,
                        }}
                    >
                        {format(new Date(completeDate), "MMM yyyy")}
                    </span>

                    <span
                        style={{
                            position: "absolute",
                            top: 590,
                            left: 500,
                            fontSize: 22,
                        }}
                    >
                        {studentStats?.getGrade()}
                    </span>

                    <span
                        style={{
                            position: "absolute",
                            top: 650,
                            left: 220,
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
                            top: 670,
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
