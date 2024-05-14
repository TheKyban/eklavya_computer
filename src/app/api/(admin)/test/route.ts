import { Prisma } from "../../../../../prisma/prisma";

export const GET = async (req: Request) => {
    try {
        const fields = ["isVerified", "icard", "marksheet", "certificate"];

        const obj: {
            [key: string]: boolean;
        } = {};

        decodeURI(req.url)
            ?.split("?")[1]
            ?.split("&")
            ?.forEach((v) => {
                const p = v.split("=");
                if (fields.includes(p[0])) {
                    obj[p[0]] = p[1] === "true" ? true : false;
                }
            });

        const student = await Prisma.student.findMany({
            where: {
                ...obj,
            },
            select: {
                certificate: true,
                icard: true,
                marksheet: true,
                isVerified: true,
                name: true,
                registration: true,
            },
        });

        return Response.json({
            student,
        });
    } catch (err) {
        console.log(err);
    }
};

export const PUT = async (req: Request) => {
    try {
        const data = await req.json();
        const registration = data?.registration;

        if (!registration) {
            return Response.json(
                {
                    message: "Registration is required",
                },
                {
                    status: 400,
                },
            );
        }

        // keys from client
        const keys = Object.keys(data);

        const fieldsCanBeMutate = [
            "isVerified",
            "icard",
            "marksheet",
            "certificate",
        ];

        const obj: {
            [key: string]: boolean;
        } = {};

        keys?.forEach((key) => {
            if (fieldsCanBeMutate.includes(key)) {
                obj[key] = data[key] === "true" ? true : false;
            }
        });

        if (Object.keys(obj)?.length < 1) {
            return Response.json(
                {
                    message: "No Data Given",
                },
                {
                    status: 400,
                },
            );
        }

        try {
            const student = await Prisma.student.update({
                where: {
                    registration,
                },
                data: {
                    ...obj,
                },
                select: {
                    certificate: true,
                    icard: true,
                    marksheet: true,
                    isVerified: true,
                    name: true,
                    registration: true,
                },
            });

            return Response.json({
                student,
            });
        } catch (error) {
            console.log(error);
            return Response.json(
                {
                    message: "Invalid Registration",
                },
                {
                    status: 400,
                },
            );
        }
    } catch (err) {
        console.log(err);
        return Response.json(
            {
                message:
                    (err as { message: string })?.message || "Internal error",
            },
            {
                status: 500,
            },
        );
    }
};
