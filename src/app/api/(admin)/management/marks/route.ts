import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { getServerSession } from "next-auth";
import { Prisma } from "../../../../../../prisma/prisma";
import { STATUS_CODE } from "@/lib/STATUS_CODE";

/**
 * GET STUDENTS WHO DON'T HAVE MARKS
 */

export const GET = async (req: Request) => {
    try {
        /**
         * CHECK SESSION IS AVAILABLE
         */

        const session = await getServerSession(AUTH_OPTIONS);

        if (!session) {
            return Response.json({ message: "Unauthorized" });
        }

        /**
         * FIND STUDENTS WITHOUT MARKS
         */

        const { searchParams } = new URL(req.url);
        const computerTyping =
            Boolean(searchParams?.get("computerTyping")) || false;
        const userId = searchParams?.get("userId");

        if (!userId) {
            return Response.json(
                {
                    message: "UserId is required",
                },
                { status: STATUS_CODE.CLIENT_ERROR },
            );
        }

        const studentsWithoutMarks = await Prisma.student.findMany({
            where: {
                branch: userId,

                Course: {
                    name: {
                        startsWith: computerTyping ? "COMPUTER TYPING" : "",
                        not: computerTyping ? "" : "COMPUTER TYPING",
                    },
                },
                marks: {
                    is: null,
                },
            },
            select: {
                registration: true,
            },
        });

        return Response.json(studentsWithoutMarks);
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: "Internal error",
            },
            {
                status: 500,
            },
        );
    }
};
