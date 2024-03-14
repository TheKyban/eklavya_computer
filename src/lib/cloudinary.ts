import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

export const UPLOAD_TO_CLOUDINARY = async (file: File, folder?: string) => {
    const fileBuffer = await file.arrayBuffer();
    var mime = file.type;
    var encoding = "base64";
    var base64Data = Buffer.from(fileBuffer).toString("base64");
    var fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

    try {
        const uploadToCloudinary = () => {
            return new Promise((resolve, reject) => {
                var result = cloudinary.uploader
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
        console.log("server err", error);
        return error;
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
    let fileUrl = url.split("/");
    let publicId = fileUrl[fileUrl.length - 1].split(".")[0];

    const result = await DELETE_IMG(publicId);
    return result;
};
