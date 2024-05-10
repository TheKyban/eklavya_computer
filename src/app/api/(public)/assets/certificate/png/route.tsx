import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { Prisma } from "../../../../../../../prisma/prisma";
import { ImageResponse } from "@vercel/og";
import qrcode from "qrcode";
import ToCapitalize from "@/lib/toCapitalize";
import StudentStats from "@/lib/StudentStats";
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

        const studentStats = new StudentStats(
            [
                student?.marks?.marks?.practical!,
                student?.marks?.marks?.project!,
                student?.marks?.marks?.viva!,
                student?.marks?.marks?.written!,
            ],
            400,
        );
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
                        {ToCapitalize(student?.name)}
                    </span>
                    <span style={{ position: "absolute", top: 400, left: 460 }}>
                        {ToCapitalize(student?.fatherName)}
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
        console.log("GET CERTIFICATE", error);
        return Response.json(
            {
                message:
                    (error as PrismaClientUnknownRequestError)?.message ||
                    "Internal Error",
                error,
            },
            {
                status: 500,
            },
        );
    }
};
