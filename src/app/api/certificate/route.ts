import { NextResponse } from "next/server";
import { Prisma } from "../../../../prisma/prisma";
import { per_page } from "@/lib/constants";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export const dynamic = "force-dynamic";
export const GET = async (req: Request) => {
    try {
        /**
         * CHECK ADMIN OR FRENCHISE IS LOGIN
         */

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({
                message: "Unauthorized",
                success: false,
            });
        }

        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1;
        const pending = !!searchParams.get("pending") ? false : true;
        const formNumber = searchParams.get("formNumber") || "";

        /**
         * FINDING CERTIFICATES
         */

        const certificates = await Prisma.student.findMany({
            take: per_page,
            skip: per_page * (page - 1),
            where: {
                branch: session.user.userId,
                formNumber: {
                    contains: formNumber,
                },
                certificate: pending,
            },
            orderBy: {
                id: "desc",
            },
        });

        /**
         * TOTAL CERTIFICATES
         */

        const total = await Prisma.student.count({
            where: {
                branch: session.user.userId,
                formNumber: {
                    contains: formNumber,
                },
                certificate: pending,
            },
        });

        return NextResponse.json({ total, certificates });
    } catch (error) {
        console.log("[GET CERTIFICATE]", error);
        return new NextResponse("Internal Error");
    }
};
