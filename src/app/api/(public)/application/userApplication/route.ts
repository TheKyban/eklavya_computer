import { userApplicationSchema } from "@/lib/schema";
import { z } from "zod";
import { Prisma } from "../../../../../../prisma/prisma";

export const POST = async (req: Request) => {
    try {
        const data: z.infer<typeof userApplicationSchema> = await req.json();

        /**
         * VALIDATE DATA
         */

        const { success } = userApplicationSchema.safeParse(data);
        if (!success) {
            return Response.json({
                message: "Invalid data",
                success: false,
            });
        }

        /**
         * CHECK USER IS REGISTERED OR NOT
         */

        const isExist = await Prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (isExist) {
            return Response.json(
                {
                    message: "Already registered",
                    success: false,
                },
                {
                    status: 400,
                }
            );
        }

        /**
         * CREATE APPLICATION
         */

        const application = await Prisma.userApplication.create({
            data: {
                img: data.img,
                name: data.name,
                phone: data.phone,
                email: data.email,
                branch: data.branch,
                address: {
                    district: data.district,
                    pincode: data.pincode,
                    state: data.state,
                    street: data.address,
                },
            },
        });

        if (!application) {
            return Response.json(
                {
                    message:
                        "Something went wrong while submitting application",
                    success: false,
                },
                { status: 500 }
            );
        }

        return Response.json(
            { message: "Application submited", success: true },
            { status: 201 }
        );
    } catch (error) {
        console.error("userApplication ", error);
        return Response.json(
            { message: "Internal Error", success: false },
            { status: 500 }
        );
    }
};
