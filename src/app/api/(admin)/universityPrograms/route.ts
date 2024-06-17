import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { STATUS_CODE } from "@/lib/STATUS_CODE";
import { getServerSession } from "next-auth";
import { Prisma } from "../../../../../prisma/prisma";
import { DELETE_FILE, UPLOAD_TO_CLOUDINARY } from "@/lib/CLOUDINARY";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(AUTH_OPTIONS);

        if (!session?.user || session.user.role !== "ADMIN") {
            return Response.json(
                {
                    message: "Unauthorized",
                    success: false,
                },
                {
                    status: STATUS_CODE?.UNAUTHENTICATE,
                },
            );
        }

        const images = await Prisma.universityPrograms.findMany();
        return Response.json({ images }, { status: STATUS_CODE.OK });
    } catch (error) {
        console.log("GET ALL ASSETS");
        return Response.json(
            { message: "Something went wrong", error },
            { status: STATUS_CODE.INTERNAL_ERROR },
        );
    }
}

export async function POST(res: Request): Promise<Response> {
    try {
        /**
         * CHECK ADMIN OR FRENCHISE IS LOGIN
         */

        const session = await getServerSession(AUTH_OPTIONS);

        if (!session?.user || session.user.role !== "ADMIN") {
            return Response.json(
                {
                    message: "Unauthorized",
                    success: false,
                },
                {
                    status: STATUS_CODE?.UNAUTHENTICATE,
                },
            );
        }

        const data = await res.formData();
        const file = data.get("file") as File;
        const folder = "university_programs";
        const results = await UPLOAD_TO_CLOUDINARY(file, folder);

        const image = await Prisma.universityPrograms.create({
            data: {
                url: results?.secure_url as string,
            },
        });

        return Response.json(image, { status: STATUS_CODE.OK });
    } catch (error) {
        console.log;
        return Response.json(
            { message: "some error occured while uploading", error },
            { status: STATUS_CODE.INTERNAL_ERROR },
        );
    }
}

export async function DELETE(res: Request) {
    try {
        /**
         * CHECK ADMIN OR FRENCHISE IS LOGIN
         */

        const session = await getServerSession(AUTH_OPTIONS);

        if (!session?.user || session.user.role !== "ADMIN") {
            return Response.json(
                {
                    message: "Unauthorized",
                    success: false,
                },
                {
                    status: STATUS_CODE.UNAUTHENTICATE,
                },
            );
        }
        const { searchParams } = new URL(res.url);
        const id = searchParams?.get("id") as string;

        const carousel = await Prisma.universityPrograms.delete({
            where: {
                id,
            },
        });

        if (!carousel) {
            return Response.json(
                { message: "No Carousel" },
                {
                    status: STATUS_CODE.NOT_FOUND,
                },
            );
        }
        const result = await DELETE_FILE(carousel.url);
        return Response.json(result, { status: STATUS_CODE.OK });
    } catch (error) {
        console.log("ERROR WHILE DELETE CAROUSEL", error);
        return Response.json(
            {
                message: "Internal Error",
                error,
            },
            { status: STATUS_CODE.INTERNAL_ERROR },
        );
    }
}
