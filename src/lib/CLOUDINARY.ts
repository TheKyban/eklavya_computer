import {
    UploadApiErrorResponse,
    UploadApiResponse,
    v2 as cloudinary,
} from "cloudinary";
import { extractPublicId } from "cloudinary-build-url";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

export const UPLOAD_TO_CLOUDINARY = async (
    file: File,
    folder?: string,
): Promise<UploadApiResponse | UploadApiErrorResponse> => {
    try {
        const fileBuffer = await file?.arrayBuffer();
        var mime = file?.type;
        var encoding = "base64";
        var base64Data = Buffer?.from(fileBuffer)?.toString("base64");
        var fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

        const uploadToCloudinary = (): Promise<UploadApiResponse> => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader
                    .upload(fileUri, {
                        invalidate: true,
                        folder,
                    })
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            });
        };

        const result = await uploadToCloudinary();

        return result;
    } catch (error) {
        console.log("ERROR While UPLOADING MEDIA", error);
        return error as UploadApiErrorResponse;
    }
};
export const DELETE_IMG = async (publicId: string) => {
    const result = await cloudinary.uploader.destroy(publicId, {
        invalidate: true,
        resource_type: "image",
    });

    return result;
};

export const DELETE_FILE = async (url: string) => {
    const publicId = extractPublicId(url);
    const result = await DELETE_IMG(publicId);
    return result;
};
