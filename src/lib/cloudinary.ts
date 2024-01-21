import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

// export const UPLOAD_TO_CLOUDINARY = async (file: File) => {
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = new Uint8Array(arrayBuffer);
//     const results: any = await new Promise((resolve, reject) => {
//         cloudinary.uploader
//             .upload_stream(function (error, result) {
//                 if (error) {
//                     reject(error);
//                     return;
//                 }
//                 resolve(result);
//             })
//             .end(buffer);
//     });

//     return results;
// };
export const UPLOAD_TO_CLOUDINARY = async (file: File) => {
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
                    })
                    .then((result) => {
                        console.log(result);
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

export const DELETE_FILE = async (url: string) => {
    let fileUrl = url.split("/");
    let publicId = fileUrl[fileUrl.length - 1].split(".")[0];

    const result = await cloudinary.uploader.destroy(publicId, {
        invalidate: true,
        resource_type: "image",
    });

    return result;
};
