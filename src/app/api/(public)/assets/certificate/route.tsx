import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { Prisma } from "../../../../../../prisma/prisma";
import { ImageResponse } from "@vercel/og";
import qrcode from "qrcode";

export const dynamic = "force-dynamic";

export const GET = async (req: Request) => {
    try {
        /**
         * GET REGISTRATION
         */
        const { searchParams } = new URL(req.url);
        const registration = searchParams.get("registration");

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
        }

        if (!student?.isVerified || !student?.certificate) {
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
                    }}
                >
                    {/* CERTIFICATE TEMPLATES */}

                    {/* eslint-disable-next-line  */}
                    <img
                        src="https://res.cloudinary.com/ddgjcyk0q/image/upload/q_5/v1715183433/ekavaya_assets/z37jjeti3t0lasea40sn.jpg"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                        alt="cert"
                    />

                    {/* QR CODE */}
                    {/* eslint-disable-next-line  */}
                    <img
                        src={qrCodeURl}
                        alt=""
                        style={{
                            maxWidth: "80px",
                            maxHeight: "80px",
                            position: "absolute",
                            top: "100px",
                            right: "125px",
                        }}
                    />

                    <span style={{ position: "absolute", top: 380, left: 380 }}>
                        Aditya
                    </span>
                    <span style={{ position: "absolute", top: 420, left: 380 }}>
                        Mother name
                    </span>
                    <span style={{ position: "absolute", top: 460, left: 380 }}>
                        Father name
                    </span>
                    <span style={{ position: "absolute", top: 500, left: 380 }}>
                        course name
                    </span>
                </div>
            ),
            {
                height: 848,
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
