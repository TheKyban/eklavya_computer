import { ImageResponse } from "@vercel/og";
import { TO_CAPITALIZE } from "@/lib/STYLES";
import { format } from "date-fns";
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

        if (!student?.isVerified || !student?.icard) {
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
                        fontSize: 10,
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
                                objectFit: "contain",
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
                            top: 50,
                            left: 55,
                            width: 95,
                            height: 100,
                            borderRadius: 15,
                        }}
                    />

                    <span
                        style={{
                            position: "absolute",
                            top: 155,
                            fontSize: 10,
                            fontWeight: "bolder",
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        {TO_CAPITALIZE(student?.name)}
                    </span>
                    <span style={{ position: "absolute", top: 166, left: 100 }}>
                        {student?.registration}
                    </span>
                    <span
                        style={{
                            position: "absolute",
                            top: 180,
                            left: 86,
                        }}
                    >
                        {TO_CAPITALIZE(student?.fatherName)}
                    </span>

                    <span style={{ position: "absolute", top: 194, left: 85 }}>
                        {format(new Date(student.dob), "dd/MM/yyyy")}
                    </span>

                    <span style={{ position: "absolute", top: 208, left: 75 }}>
                        {student?.Course?.name}
                    </span>
                    <span style={{ position: "absolute", top: 220, left: 80 }}>
                        {student?.Course?.duration}
                    </span>
                    <span
                        style={{
                            position: "absolute",
                            top: 253,
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        {student?.Branch?.branch}
                    </span>
                </div>
            ),
            {
                width: 204,
                height: 324,
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
