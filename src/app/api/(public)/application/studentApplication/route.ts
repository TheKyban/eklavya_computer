import { studentAddmissionSchema } from "@/lib/schema";
import { z } from "zod";
import { Prisma } from "../../../../../../prisma/prisma";
import { gender } from "@prisma/client";

export const POST = async (req: Request) => {
    try {
        const data: z.infer<typeof studentAddmissionSchema> = await req.json();
        const { success } = studentAddmissionSchema.safeParse({
            ...data,
            dob: new Date(data.dob),
            dor: new Date(data.dor),
        });
        if (!success) {
            return Response.json({
                message: "Invalid data",
                success: false,
            });
        }

        /**
         * CREATE APPLICATION
         */

        const application = await Prisma.studentApplication.create({
            data: {
                img: data.img,
                name: data.name,
                fatherName: data.fatherName,
                motherName: data.motherName,
                gender: data.gender as gender,
                phone: data.phone,
                email: data.email,
                branch: data.branch,
                address: {
                    district: data.district,
                    pincode: data.pincode,
                    state: data.state,
                    street: data.address,
                },
                dob: new Date(data.dob),
                dor: new Date(data.dor),
                qualification: data.qualification,
                course: data.course,
            },
        });

        if (!application) {
            return Response.json(
                {
                    message:
                        "Something went wrong while submitting application",
                    success: false,
                },
                { status: 500 },
            );
        }

        return Response.json(
            { message: "Application submited", success: true },
            { status: 201 },
        );
    } catch (error) {
        console.error("studentApplication ", error);
        return Response.json(
            { message: "Internal Error", success: false },
            { status: 500 },
        );
    }
};
