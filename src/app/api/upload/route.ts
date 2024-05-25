import { v2 as cloudinary } from "cloudinary";
import { DELETE_FILE, UPLOAD_TO_CLOUDINARY } from "@/lib/CLOUDINARY";
import { getServerSession } from "next-auth";
import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { STATUS_CODE } from "@/lib/STATUS_CODE";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

export async function GET(req: Request) {
    try {
        const session = await getServerSession(AUTH_OPTIONS);

        if (!session?.user) {
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

        const { searchParams } = new URL(req.url);
        const folder = searchParams?.get("folder");
        if (!folder) {
            return Response.json(
                { message: "Folder or Prefix is required" },
                { status: STATUS_CODE.CLIENT_ERROR },
            );
        }
        const assets = await cloudinary.api.resources({
            type: "upload",
            prefix: "eklavaya-carousel", // add your folder
        });
        if (!assets?.resources) {
            return Response.json(
                {
                    message: "Something went wrong while fetching assets",
                },
                { status: STATUS_CODE.INTERNAL_ERROR },
            );
        }
        return Response.json(
            { assets: assets?.resources },
            { status: STATUS_CODE.OK },
        );
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

        if (!session?.user || !session.user?.isActive) {
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
        const folder = (data.get("folder") as string) || "eklavaya";
        const results = await UPLOAD_TO_CLOUDINARY(file, folder);

        return Response.json(results, { status: 201 });
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

        if (!session?.user || !session.user?.isActive) {
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
        const urlToDelete = searchParams?.get("url") as string;

        const result = await DELETE_FILE(urlToDelete);
        return Response.json(result, { status: STATUS_CODE.OK });
    } catch (error) {
        console.log("ERROR WHILE DELETE UPLOAD", error);
        return Response.json(
            {
                message: "Internal Error",
                error,
            },
            { status: STATUS_CODE.INTERNAL_ERROR },
        );
    }
}
