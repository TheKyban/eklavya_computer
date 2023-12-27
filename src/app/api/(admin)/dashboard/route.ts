import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Prisma } from "../../../../../prisma/prisma";
import { role } from "@prisma/client";
import { details } from "@/lib/types";

export const dynamic = "force-dynamic";

export const GET = async () => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({
                message: "Unauthorized",
                success: false,
            });
        }

        const data: details[] = [];

        if (session.user.role === role.ADMIN) {
            const totalUser = await Prisma.user.count({
                where: {
                    NOT: {
                        userId: session.user.userId,
                    },
                },
            });
            const totalRegisteredStudent = await Prisma.student.count();
            const totalPendingStudent = await Prisma.student.count({
                where: {
                    isVerified: false,
                },
            });
            const totalVerifiedStudent = await Prisma.student.count({
                where: {
                    isVerified: true,
                },
            });
            const totalIssuedCertificate = await Prisma.student.count({
                where: {
                    certificate: true,
                },
            });
            const totalPendingCertificate = await Prisma.student.count({
                where: {
                    certificate: false,
                },
            });

            data.push({
                count: totalUser,
                title: "Total User",
                Logo: "Users",
                color: "teal",
            });
            data.push({
                title: "Total Registered Student",
                count: totalRegisteredStudent,
                Logo: "GraduationCap",
                color: "indigo",
            });
            data.push({
                title: "Total Pending Student",
                count: totalPendingStudent,
                Logo: "ShieldAlert",
                color: "red",
            });

            data.push({
                title: "Total Verified Student",
                count: totalVerifiedStudent,
                Logo: "ShieldCheck",
                color: "zinc",
            });
            data.push({
                title: "Total Pending Certificate",
                count: totalPendingCertificate,
                Logo: "Ribbon",
                color: "orange",
            });
            data.push({
                title: "Total Issued Certificate",
                count: totalIssuedCertificate,
                Logo: "Medal",
                color: "blue",
            });
        }

        const registeredStudent = await Prisma.student.count({
            where: {
                branch: session.user.userId,
            },
        });
        const pendingStudent = await Prisma.student.count({
            where: {
                branch: session.user.userId,
                isVerified: false,
            },
        });
        const verifiedStudent = await Prisma.student.count({
            where: {
                branch: session.user.userId,
                isVerified: true,
            },
        });
        const pendingCertificate = await Prisma.student.count({
            where: {
                branch: session.user.userId,
                certificate: false,
            },
        });
        const issuedCertificate = await Prisma.student.count({
            where: {
                branch: session.user.userId,
                certificate: true,
            },
        });

        data.push({
            title: "Registered Student",
            count: registeredStudent,
            Logo: "GraduationCap",
            color: "indigo",
        });
        data.push({
            title: "Pending Student",
            count: pendingStudent,
            Logo: "ShieldAlert",
            color: "red",
        });
        data.push({
            title: "Verified Student",
            count: verifiedStudent,
            Logo: "ShieldCheck",
            color: "zinc",
        });
        data.push({
            title: "Pending Certificate",
            count: pendingCertificate,
            Logo: "Ribbon",
            color: "orange",
        });
        data.push({
            title: "Issued Certificate",
            count: issuedCertificate,
            Logo: "Medal",
            color: "blue",
        });

        return NextResponse.json(data);
    } catch (error) {
        console.log("[DASHBOARD]", error);
        return NextResponse.json({
            message: "Internal Error.",
            success: false,
        });
    }
};
