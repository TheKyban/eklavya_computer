import { NextResponse } from "next/server";
import { Prisma } from "../../../../../prisma/prisma";
import { per_page } from "@/lib/CONSTANTS";
import { getServerSession } from "next-auth";
import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";

export const dynamic = "force-dynamic";

/**
 * GET CERTIFICATE INFO
 */

export const GET = async (req: Request) => {
    try {
        /**
         * CHECK ADMIN OR FRENCHISE IS LOGIN
         */

        const session = await getServerSession(AUTH_OPTIONS);

        if (!session) {
            return NextResponse.json({
                message: "Unauthorized",
                success: false,
            });
        }

        const { searchParams } = new URL(req.url);
        const page = Number(searchParams?.get("page")) || 1;
        const pending = !!searchParams?.get("pending") ? false : true;
        const registration = searchParams?.get("registration") || "";

        /**
         * FINDING CERTIFICATES
         */

        const certificates = await Prisma.student.findMany({
            take: per_page,
            skip: per_page * (page - 1),
            where: {
                branch: session.user.userId,
                registration: {
                    contains: registration,
                },
                certificate: {
                    is: {
                        issue: pending,
                    },
                },
            },
            orderBy: {
                id: "desc",
            },
            include: {
                Course: true,
            },
        });

        /**
         * TOTAL CERTIFICATES
         */

        const total = await Prisma.student.count({
            where: {
                branch: session.user.userId,
                registration: {
                    contains: registration,
                },
                certificate: {
                    is: {
                        issue: pending,
                    },
                },
            },
        });

        return NextResponse.json({ total, certificates });
    } catch (error) {
        console.log("[GET CERTIFICATE]", error);
        return new NextResponse("Internal Error");
    }
};
