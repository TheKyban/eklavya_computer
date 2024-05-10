import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { Prisma } from "../../../../../../prisma/prisma";
import { ImageResponse } from "@vercel/og";

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
                    {/* I-CARD TEMPLATES */}

                    {/* eslint-disable-next-line  */}
                    <img
                        src="https://res.cloudinary.com/ddgjcyk0q/image/upload/q_10/v1715232604/ekavaya_assets/zc3imktyxfxg8fk2zqfo.jpg"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                        alt="cert"
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
                width: 599,
                height: 957,
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
