import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { DELETE_FILE, UPLOAD_TO_CLOUDINARY } from "@/lib/cloudinary";
import { role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

export async function POST(request: Request): Promise<NextResponse> {
    try {
        /**
         * CHECK ADMIN OR FRENCHISE IS LOGIN
         */

        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({
                message: "Unauthorized",
                success: false,
            });
        }

        /**
         * CHECK FRANCHISE IS ACTIVE OR NOT
         */

        if (session?.user.role === role.FRANCHISE && !session?.user?.isActive) {
            return NextResponse.json({
                message: "Unauthorized",
                success: false,
            });
        }

        const data = await request.formData();
        const file = data.get("file") as File;
        const results = await UPLOAD_TO_CLOUDINARY(file,"eklavaya");

        return NextResponse.json(results, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "some error occured while uploading" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    /**
     * CHECK ADMIN OR FRENCHISE IS LOGIN
     */

    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({
            message: "Unauthorized",
            success: false,
        });
    }

    /**
     * CHECK FRANCHISE IS ACTIVE OR NOT
     */

    if (session?.user.role === role.FRANCHISE && !session?.user?.isActive) {
        return NextResponse.json({
            message: "Unauthorized",
            success: false,
        });
    }
    const { searchParams } = new URL(request.url);
    const urlToDelete = searchParams.get("url") as string;

    const result = await DELETE_FILE(urlToDelete);
    return NextResponse.json(result, { status: 200 });
}
