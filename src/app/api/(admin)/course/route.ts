import { authOptions } from "@/lib/auth-options";
import { courseEditSchema, courseSchema } from "@/lib/schema";
import { role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { Prisma } from "../../../../../prisma/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const POST = async (req: Request) => {
    try {
        /**
         * CHECK ADMIN IS LOGIN OR NOT
         */

        const session = await getServerSession(authOptions);

        if (!session?.user || session?.user.role === role.FRANCHISE) {
            return Response.json({
                message: "Unauthorized",
                success: false,
            });
        }

        const data = await req.json();

        const validData = courseSchema.safeParse(data);
        if (!validData.success) {
            return Response.json(
                {
                    message:
                        validData?.error?.errors?.[0].message ||
                        "Please fill all requirements",
                    success: false,
                },
                {
                    status: 400,
                },
            );
        }

        const isCourseExist = await Prisma.course.findUnique({
            where: {
                name: validData.data.name,
            },
        });

        if (!!isCourseExist) {
            return Response.json(
                {
                    message: "Course already exist",
                    success: false,
                },
                {
                    status: 400,
                },
            );
        }

        const course = await Prisma.course.create({
            data: {
                name: validData.data.name,
                fullName: validData.data.fullName,
                duration: validData.data.duration,
                modules: validData.data.modules,
            },
        });

        if (!course) {
            return Response.json(
                {
                    message: "Internal error`",
                    success: false,
                },
                {
                    status: 500,
                },
            );
        }

        return Response.json(
            {
                message: "Created successfully.",
                success: true,
                course,
            },
            {
                status: 201,
            },
        );
    } catch (err) {
        console.log("COURSE", err);
        return Response.json(
            {
                message: "Internal error`",
                success: false,
            },
            {
                status: 500,
            },
        );
    }
};

export const GET = async () => {
    try {
        const courses = await Prisma.course.findMany();
        return Response.json(
            {
                message: "Success",
                success: true,
                data: courses,
            },
            {
                status: 200,
            },
        );
    } catch (err) {
        console.log("COURSE", err);
        return Response.json(
            {
                message: "Internal error`",
                success: false,
            },
            {
                status: 500,
            },
        );
    }
};

export const PUT = async (req: Request) => {
    try {
        /**
         * CHECK ADMIN IS LOGIN OR NOT
         */

        const session = await getServerSession(authOptions);

        if (!session?.user || session?.user.role === role.FRANCHISE) {
            return Response.json({
                message: "Unauthorized",
                success: false,
            });
        }

        const data = await req.json();

        const validData = courseEditSchema.safeParse(data);
        if (!validData.success) {
            return Response.json(
                {
                    message:
                        validData?.error?.errors?.[0].message ||
                        "Please fill all requirements",
                    success: false,
                },
                {
                    status: 400,
                },
            );
        }

        const isCourseExist = await Prisma.course.findUnique({
            where: {
                id: validData?.data.id,
            },
        });

        if (!isCourseExist) {
            return Response.json(
                {
                    message: "Course not found",
                    success: false,
                },
                {
                    status: 400,
                },
            );
        }

        const course = await Prisma.course.update({
            where: {
                id: validData?.data.id,
            },
            data: {
                name: validData.data.name,
                fullName: validData.data.fullName,
                duration: validData.data.duration,
                modules: validData.data.modules,
            },
        });

        return Response.json(
            {
                message: "Success",
                success: true,
                course,
            },
            {
                status: 202,
            },
        );
    } catch (err) {
        console.log("COURSE", err);
        return Response.json(
            {
                message: "Internal error`",
                success: false,
            },
            {
                status: 500,
            },
        );
    }
};

export const DELETE = async (req: Request) => {
    try {
        /**
         * CHECK ADMIN IS LOGIN OR NOT
         */

        const session = await getServerSession(authOptions);

        if (!session?.user || session?.user.role === role.FRANCHISE) {
            return Response.json({
                message: "Unauthorized",
                success: false,
            });
        }

        const params = new URL(req.url);
        const id = params.searchParams.get("id");
        if (!id) {
            return Response.json(
                {
                    message: "id is required",
                    success: false,
                },
                {
                    status: 400,
                },
            );
        }

        const course = await Prisma.course.delete({
            where: {
                id,
            },
        });

        if (!course) {
            return Response.json(
                {
                    message: "Course not found",
                    success: false,
                },
                {
                    status: 400,
                },
            );
        }

        return Response.json(
            {
                message: "Success",
                success: true,
            },
            {
                status: 202,
            },
        );
    } catch (err) {
        console.log("COURSE", err);
        return Response.json(
            {
                message:
                    (err as PrismaClientKnownRequestError)?.message ||
                    "Internal error",
                success: false,
            },
            {
                status: 500,
            },
        );
    }
};
