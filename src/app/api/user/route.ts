import { franchiseSchema } from "@/lib/utils";
import { NextResponse } from "next/server";
import { Prisma } from "../../../../prisma/prisma";
import { z } from "zod";
import { per_page } from "@/lib/constants";

/**
 * CREATE USER
 */
export const POST = async (req: Request) => {
    try {
        /**
         * TODO 1
         * CHECK ADMIN IS LOGIN
         */

        const data: z.infer<typeof franchiseSchema> = await req.json();
        const { success } = franchiseSchema.safeParse(data);

        /**
         * VALIDATE DATA
         */

        if (!success) {
            return NextResponse.json({
                message: "Please fill all requirements",
                success: false,
            });
        }

        /**
         * CHECk USER EXIST
         * BY EMAIL
         * BY USER ID
         */

        // BY EMAIL
        const byEmail = await Prisma.user.findFirst({
            where: {
                email: data.email,
            },
        });

        if (byEmail) {
            return NextResponse.json({
                message: "Franchise all ready exist with this email",
                success: false,
            });
        }

        // BY USER ID
        const byUserId = await Prisma.user.findFirst({
            where: {
                userId: data.userId,
            },
        });

        if (byUserId) {
            return NextResponse.json({
                message: "Franchise all ready exist with this userid",
                success: false,
            });
        }

        /**
         * CREATE FRANCHISE
         */
        const {
            name,
            email,
            img,
            phone,
            address,
            branch,
            district,
            password,
            pincode,
            state,
            userId,
        } = data;
        const franchise = await Prisma.user.create({
            data: {
                name,
                email,
                img,
                phone,
                branch,
                userId,
                password,
                address: {
                    state,
                    district,
                    pincode,
                    street: address,
                },
            },
        });

        return NextResponse.json({
            message: "Franchise Registered",
            success: true,
        });
    } catch (error) {
        console.log("[USER POST]", error);
        return NextResponse.json({ message: "INTERNAL ERROR", success: false });
    }
};

export const GET = async (req: Request) => {
    try {
        /**
         * VERIFY THAT ADMIN IS LOGIN
         */
        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1;
        const userId = searchParams.get("userId");

        /**
         * FINDING USERS
         */

        const users = await Prisma.user.findMany({
            take: per_page,
            skip: per_page * (page - 1),
            where: {
                userId: {
                    contains: userId ? userId : "",
                },
            },
            orderBy:{
                id:"desc"
            }
        });

        /**
         * TOTAL USER
         */

        const total = await Prisma.user.count({
            where: {
                userId: {
                    contains: userId ? userId : "",
                },
            },
        });

        return NextResponse.json({ total, users });
    } catch (error) {
        console.log("[GET USERS]", error);
        return new NextResponse("Internal Error");
    }
};
