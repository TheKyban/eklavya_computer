import { franchiseSchema } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "../../../../prisma/prisma";
import { z } from "zod";

export const POST = async (req: Request) => {
    try {
        /**
         * CHECK IS ADMIN LOGIN
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
