import { v2 as cloudinary } from "cloudinary";
import { DELETE_FILE, UPLOAD_TO_CLOUDINARY } from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

// export const GET = async () => {
//     const assets = await cloudinary.api.resources({
//         type: "upload",
//         prefix: "ekavaya_assets", // add your folder
//         direction: "desc",
//     });

//     return Response.json(assets);
// };

export async function POST(res: Request): Promise<Response> {
    try {
        /**
         * CHECK ADMIN OR FRENCHISE IS LOGIN
         */

        const session = await getServerSession(authOptions);

        if (!session?.user || !session.user?.isActive) {
            return Response.json(
                {
                    message: "Unauthorized",
                    success: false,
                },
                {
                    status: 401,
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
            { status: 500 },
        );
    }
}

export async function DELETE(res: Request) {
    try {
        /**
         * CHECK ADMIN OR FRENCHISE IS LOGIN
         */

        const session = await getServerSession(authOptions);

        if (!session?.user || !session.user?.isActive) {
            return Response.json(
                {
                    message: "Unauthorized",
                    success: false,
                },
                {
                    status: 401,
                },
            );
        }
        const { searchParams } = new URL(res.url);
        const urlToDelete = searchParams.get("url") as string;

        const result = await DELETE_FILE(urlToDelete);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.log("ERROR WHILE DELETE UPLOAD", error);
        return Response.json(
            {
                message: "Internal Error",
                error,
            },
            { status: 500 },
        );
    }
}
