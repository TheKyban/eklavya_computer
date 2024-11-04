import { DELETE_FILE, UPLOAD_TO_CLOUDINARY } from "@/lib/CLOUDINARY";
import { getServerSession } from "next-auth";
import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { STATUS_CODE } from "@/lib/STATUS_CODE";
import { IMAGE_SIZE } from "@/lib/CONSTANTS";

export async function POST(res: Request): Promise<Response> {
    try {
        const data = await res.formData();
        const file = data.get("file") as File;
        if (file.size > IMAGE_SIZE) {
            return Response.json(
                {
                    message: "Image is too large.",
                    success: false,
                },
                {
                    status: STATUS_CODE?.CLIENT_ERROR,
                },
            );
        }

        const folder = "eklavaya";
        const results = await UPLOAD_TO_CLOUDINARY(file, folder);

        return Response.json(results, { status: STATUS_CODE.OK });
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
