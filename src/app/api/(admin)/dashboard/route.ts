import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Prisma } from "../../../../../prisma/prisma";
import { role } from "@prisma/client";
import { details, UserType } from "@/lib/types";

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
            try {
                //@ts-ignore
                const allUsers: UserType[] = await Prisma.user.aggregateRaw({
                    pipeline: [
                        {
                            $lookup: {
                                from: "Student",
                                foreignField: "branch",
                                localField: "userId",
                                as: "students",
                                pipeline: [
                                    {
                                        $group: {
                                            _id: "$isVerified",
                                            total: {
                                                $count: {},
                                            },
                                        },
                                    },
                                ],
                            },
                        },

                        {
                            $lookup: {
                                from: "Student",
                                foreignField: "branch",
                                localField: "userId",
                                as: "certificates",
                                pipeline: [
                                    {
                                        $group: {
                                            _id: "$certificate",
                                            total: {
                                                $count: {},
                                            },
                                        },
                                    },
                                ],
                            },
                        },

                        {
                            $addFields: {
                                totalStudents: {
                                    $sum: "$students.total",
                                },
                                pendingStudents: {
                                    $cond: {
                                        if: {
                                            $eq: [{ $size: "$students" }, 2],
                                        },
                                        then: {
                                            $cond: {
                                                if: {
                                                    $eq: [
                                                        {
                                                            $getField: {
                                                                field: "_id",
                                                                input: {
                                                                    $arrayElemAt:
                                                                        [
                                                                            "$students",
                                                                            0,
                                                                        ],
                                                                },
                                                            },
                                                        },
                                                        false,
                                                    ],
                                                },
                                                then: {
                                                    $getField: {
                                                        field: "total",
                                                        input: {
                                                            $arrayElemAt: [
                                                                "$students",
                                                                0,
                                                            ],
                                                        },
                                                    },
                                                },
                                                else: {
                                                    $getField: {
                                                        field: "total",
                                                        input: {
                                                            $arrayElemAt: [
                                                                "$students",
                                                                1,
                                                            ],
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                        else: {
                                            $cond: {
                                                if: {
                                                    $eq: [
                                                        { $size: "$students" },
                                                        1,
                                                    ],
                                                },

                                                then: {
                                                    $cond: {
                                                        if: {
                                                            $eq: [
                                                                {
                                                                    $getField: {
                                                                        field: "_id",
                                                                        input: {
                                                                            $arrayElemAt:
                                                                                [
                                                                                    "$students",
                                                                                    0,
                                                                                ],
                                                                        },
                                                                    },
                                                                },
                                                                false,
                                                            ],
                                                        },
                                                        then: {
                                                            $getField: {
                                                                field: "total",
                                                                input: {
                                                                    $arrayElemAt:
                                                                        [
                                                                            "$students",
                                                                            0,
                                                                        ],
                                                                },
                                                            },
                                                        },
                                                        else: 0,
                                                    },
                                                },
                                                else: 0,
                                            },
                                        },
                                    },
                                },
                                verifiedStudents: {
                                    $cond: {
                                        if: {
                                            $eq: [{ $size: "$students" }, 2],
                                        },
                                        then: {
                                            $cond: {
                                                if: {
                                                    $eq: [
                                                        {
                                                            $getField: {
                                                                field: "_id",
                                                                input: {
                                                                    $arrayElemAt:
                                                                        [
                                                                            "$students",
                                                                            0,
                                                                        ],
                                                                },
                                                            },
                                                        },
                                                        true,
                                                    ],
                                                },
                                                then: {
                                                    $getField: {
                                                        field: "total",
                                                        input: {
                                                            $arrayElemAt: [
                                                                "$students",
                                                                0,
                                                            ],
                                                        },
                                                    },
                                                },
                                                else: {
                                                    $getField: {
                                                        field: "total",
                                                        input: {
                                                            $arrayElemAt: [
                                                                "$students",
                                                                1,
                                                            ],
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                        else: {
                                            $cond: {
                                                if: {
                                                    $eq: [
                                                        { $size: "$students" },
                                                        1,
                                                    ],
                                                },

                                                then: {
                                                    $cond: {
                                                        if: {
                                                            $eq: [
                                                                {
                                                                    $getField: {
                                                                        field: "_id",
                                                                        input: {
                                                                            $arrayElemAt:
                                                                                [
                                                                                    "$students",
                                                                                    0,
                                                                                ],
                                                                        },
                                                                    },
                                                                },
                                                                true,
                                                            ],
                                                        },
                                                        then: {
                                                            $getField: {
                                                                field: "total",
                                                                input: {
                                                                    $arrayElemAt:
                                                                        [
                                                                            "$students",
                                                                            0,
                                                                        ],
                                                                },
                                                            },
                                                        },
                                                        else: 0,
                                                    },
                                                },
                                                else: 0,
                                            },
                                        },
                                    },
                                },
                                pendingCertificates: {
                                    $cond: {
                                        if: {
                                            $eq: [
                                                { $size: "$certificates" },
                                                2,
                                            ],
                                        },
                                        then: {
                                            $cond: {
                                                if: {
                                                    $eq: [
                                                        {
                                                            $getField: {
                                                                field: "_id",
                                                                input: {
                                                                    $arrayElemAt:
                                                                        [
                                                                            "$certificates",
                                                                            0,
                                                                        ],
                                                                },
                                                            },
                                                        },
                                                        false,
                                                    ],
                                                },
                                                then: {
                                                    $getField: {
                                                        field: "total",
                                                        input: {
                                                            $arrayElemAt: [
                                                                "$certificates",
                                                                0,
                                                            ],
                                                        },
                                                    },
                                                },
                                                else: {
                                                    $getField: {
                                                        field: "total",
                                                        input: {
                                                            $arrayElemAt: [
                                                                "$certificates",
                                                                1,
                                                            ],
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                        else: {
                                            $cond: {
                                                if: {
                                                    $eq: [
                                                        {
                                                            $size: "$certificates",
                                                        },
                                                        1,
                                                    ],
                                                },

                                                then: {
                                                    $cond: {
                                                        if: {
                                                            $eq: [
                                                                {
                                                                    $getField: {
                                                                        field: "_id",
                                                                        input: {
                                                                            $arrayElemAt:
                                                                                [
                                                                                    "$certificates",
                                                                                    0,
                                                                                ],
                                                                        },
                                                                    },
                                                                },
                                                                false,
                                                            ],
                                                        },
                                                        then: {
                                                            $getField: {
                                                                field: "total",
                                                                input: {
                                                                    $arrayElemAt:
                                                                        [
                                                                            "$certificates",
                                                                            0,
                                                                        ],
                                                                },
                                                            },
                                                        },
                                                        else: 0,
                                                    },
                                                },
                                                else: 0,
                                            },
                                        },
                                    },
                                },
                                issuedCertificates: {
                                    $cond: {
                                        if: {
                                            $eq: [
                                                { $size: "$certificates" },
                                                2,
                                            ],
                                        },
                                        then: {
                                            $cond: {
                                                if: {
                                                    $eq: [
                                                        {
                                                            $getField: {
                                                                field: "_id",
                                                                input: {
                                                                    $arrayElemAt:
                                                                        [
                                                                            "$certificates",
                                                                            0,
                                                                        ],
                                                                },
                                                            },
                                                        },
                                                        true,
                                                    ],
                                                },
                                                then: {
                                                    $getField: {
                                                        field: "total",
                                                        input: {
                                                            $arrayElemAt: [
                                                                "$certificates",
                                                                0,
                                                            ],
                                                        },
                                                    },
                                                },
                                                else: {
                                                    $getField: {
                                                        field: "total",
                                                        input: {
                                                            $arrayElemAt: [
                                                                "$certificates",
                                                                1,
                                                            ],
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                        else: {
                                            $cond: {
                                                if: {
                                                    $eq: [
                                                        {
                                                            $size: "$certificates",
                                                        },
                                                        1,
                                                    ],
                                                },

                                                then: {
                                                    $cond: {
                                                        if: {
                                                            $eq: [
                                                                {
                                                                    $getField: {
                                                                        field: "_id",
                                                                        input: {
                                                                            $arrayElemAt:
                                                                                [
                                                                                    "$certificates",
                                                                                    0,
                                                                                ],
                                                                        },
                                                                    },
                                                                },
                                                                true,
                                                            ],
                                                        },
                                                        then: {
                                                            $getField: {
                                                                field: "total",
                                                                input: {
                                                                    $arrayElemAt:
                                                                        [
                                                                            "$certificates",
                                                                            0,
                                                                        ],
                                                                },
                                                            },
                                                        },
                                                        else: 0,
                                                    },
                                                },
                                                else: 0,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        {
                            $project: {
                                name: 1,
                                img: 1,
                                role: 1,
                                userId: 1,
                                isActive: 1,
                                branch: 1,
                                totalStudents: 1,
                                pendingStudents: 1,
                                verifiedStudents: 1,
                                pendingCertificates: 1,
                                issuedCertificates: 1,
                            },
                        },
                    ],
                });

                const totalUser = allUsers?.length;
                let totalRegisteredStudent = 0;
                let totalPendingStudent = 0;
                let totalVerifiedStudent = 0;
                let totalIssuedCertificate = 0;
                let totalPendingCertificate = 0;

                for (let i = 0; i < allUsers?.length; i++) {
                    totalRegisteredStudent += allUsers[i]?.totalStudents;
                    totalPendingStudent += allUsers[i].pendingStudents;
                    totalVerifiedStudent += allUsers[i].verifiedStudents;
                    totalIssuedCertificate += allUsers[i].issuedCertificates;
                    totalPendingCertificate += allUsers[i].pendingCertificates;
                }

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
                return NextResponse.json(
                    { details: data, allUsers },
                    { status: 200 }
                );
            } catch (error) {
                console.log(error);
                return NextResponse.json(
                    {
                        message: "Faild while fetching details",
                        success: false,
                    },
                    {
                        status: 500,
                    }
                );
            }
        } else {
            try {
                // @ts-ignore
                const user: UserType[] = await Prisma.user.aggregateRaw({
                    pipeline: [
                        {
                            $match: {
                                userId: session.user.userId,
                            },
                        },
                        {
                            $lookup: {
                                from: "Student",
                                foreignField: "branch",
                                localField: "userId",
                                as: "students",
                                pipeline: [
                                    {
                                        $group: {
                                            _id: "$isVerified",
                                            total: {
                                                $count: {},
                                            },
                                        },
                                    },
                                ],
                            },
                        },

                        {
                            $lookup: {
                                from: "Student",
                                foreignField: "branch",
                                localField: "userId",
                                as: "certificates",
                                pipeline: [
                                    {
                                        $group: {
                                            _id: "$certificate",
                                            total: {
                                                $count: {},
                                            },
                                        },
                                    },
                                ],
                            },
                        },

                        {
                            $addFields: {
                                totalStudents: {
                                    $sum: "$students.total",
                                },
                                pendingStudents: {
                                    $cond: {
                                        if: {
                                            $eq: [{ $size: "$students" }, 2],
                                        },
                                        then: {
                                            $cond: {
                                                if: {
                                                    $eq: [
                                                        {
                                                            $getField: {
                                                                field: "_id",
                                                                input: {
                                                                    $arrayElemAt:
                                                                        [
                                                                            "$students",
                                                                            0,
                                                                        ],
                                                                },
                                                            },
                                                        },
                                                        false,
                                                    ],
                                                },
                                                then: {
                                                    $getField: {
                                                        field: "total",
                                                        input: {
                                                            $arrayElemAt: [
                                                                "$students",
                                                                0,
                                                            ],
                                                        },
                                                    },
                                                },
                                                else: {
                                                    $getField: {
                                                        field: "total",
                                                        input: {
                                                            $arrayElemAt: [
                                                                "$students",
                                                                1,
                                                            ],
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                        else: {
                                            $cond: {
                                                if: {
                                                    $eq: [
                                                        { $size: "$students" },
                                                        1,
                                                    ],
                                                },

                                                then: {
                                                    $cond: {
                                                        if: {
                                                            $eq: [
                                                                {
                                                                    $getField: {
                                                                        field: "_id",
                                                                        input: {
                                                                            $arrayElemAt:
                                                                                [
                                                                                    "$students",
                                                                                    0,
                                                                                ],
                                                                        },
                                                                    },
                                                                },
                                                                false,
                                                            ],
                                                        },
                                                        then: {
                                                            $getField: {
                                                                field: "total",
                                                                input: {
                                                                    $arrayElemAt:
                                                                        [
                                                                            "$students",
                                                                            0,
                                                                        ],
                                                                },
                                                            },
                                                        },
                                                        else: 0,
                                                    },
                                                },
                                                else: 0,
                                            },
                                        },
                                    },
                                },
                                verifiedStudents: {
                                    $cond: {
                                        if: {
                                            $eq: [{ $size: "$students" }, 2],
                                        },
                                        then: {
                                            $cond: {
                                                if: {
                                                    $eq: [
                                                        {
                                                            $getField: {
                                                                field: "_id",
                                                                input: {
                                                                    $arrayElemAt:
                                                                        [
                                                                            "$students",
                                                                            0,
                                                                        ],
                                                                },
                                                            },
                                                        },
                                                        true,
                                                    ],
                                                },
                                                then: {
                                                    $getField: {
                                                        field: "total",
                                                        input: {
                                                            $arrayElemAt: [
                                                                "$students",
                                                                0,
                                                            ],
                                                        },
                                                    },
                                                },
                                                else: {
                                                    $getField: {
                                                        field: "total",
                                                        input: {
                                                            $arrayElemAt: [
                                                                "$students",
                                                                1,
                                                            ],
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                        else: {
                                            $cond: {
                                                if: {
                                                    $eq: [
                                                        { $size: "$students" },
                                                        1,
                                                    ],
                                                },

                                                then: {
                                                    $cond: {
                                                        if: {
                                                            $eq: [
                                                                {
                                                                    $getField: {
                                                                        field: "_id",
                                                                        input: {
                                                                            $arrayElemAt:
                                                                                [
                                                                                    "$students",
                                                                                    0,
                                                                                ],
                                                                        },
                                                                    },
                                                                },
                                                                true,
                                                            ],
                                                        },
                                                        then: {
                                                            $getField: {
                                                                field: "total",
                                                                input: {
                                                                    $arrayElemAt:
                                                                        [
                                                                            "$students",
                                                                            0,
                                                                        ],
                                                                },
                                                            },
                                                        },
                                                        else: 0,
                                                    },
                                                },
                                                else: 0,
                                            },
                                        },
                                    },
                                },
                                pendingCertificates: {
                                    $cond: {
                                        if: {
                                            $eq: [
                                                { $size: "$certificates" },
                                                2,
                                            ],
                                        },
                                        then: {
                                            $cond: {
                                                if: {
                                                    $eq: [
                                                        {
                                                            $getField: {
                                                                field: "_id",
                                                                input: {
                                                                    $arrayElemAt:
                                                                        [
                                                                            "$certificates",
                                                                            0,
                                                                        ],
                                                                },
                                                            },
                                                        },
                                                        false,
                                                    ],
                                                },
                                                then: {
                                                    $getField: {
                                                        field: "total",
                                                        input: {
                                                            $arrayElemAt: [
                                                                "$certificates",
                                                                0,
                                                            ],
                                                        },
                                                    },
                                                },
                                                else: {
                                                    $getField: {
                                                        field: "total",
                                                        input: {
                                                            $arrayElemAt: [
                                                                "$certificates",
                                                                1,
                                                            ],
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                        else: {
                                            $cond: {
                                                if: {
                                                    $eq: [
                                                        {
                                                            $size: "$certificates",
                                                        },
                                                        1,
                                                    ],
                                                },

                                                then: {
                                                    $cond: {
                                                        if: {
                                                            $eq: [
                                                                {
                                                                    $getField: {
                                                                        field: "_id",
                                                                        input: {
                                                                            $arrayElemAt:
                                                                                [
                                                                                    "$certificates",
                                                                                    0,
                                                                                ],
                                                                        },
                                                                    },
                                                                },
                                                                false,
                                                            ],
                                                        },
                                                        then: {
                                                            $getField: {
                                                                field: "total",
                                                                input: {
                                                                    $arrayElemAt:
                                                                        [
                                                                            "$certificates",
                                                                            0,
                                                                        ],
                                                                },
                                                            },
                                                        },
                                                        else: 0,
                                                    },
                                                },
                                                else: 0,
                                            },
                                        },
                                    },
                                },
                                issuedCertificates: {
                                    $cond: {
                                        if: {
                                            $eq: [
                                                { $size: "$certificates" },
                                                2,
                                            ],
                                        },
                                        then: {
                                            $cond: {
                                                if: {
                                                    $eq: [
                                                        {
                                                            $getField: {
                                                                field: "_id",
                                                                input: {
                                                                    $arrayElemAt:
                                                                        [
                                                                            "$certificates",
                                                                            0,
                                                                        ],
                                                                },
                                                            },
                                                        },
                                                        true,
                                                    ],
                                                },
                                                then: {
                                                    $getField: {
                                                        field: "total",
                                                        input: {
                                                            $arrayElemAt: [
                                                                "$certificates",
                                                                0,
                                                            ],
                                                        },
                                                    },
                                                },
                                                else: {
                                                    $getField: {
                                                        field: "total",
                                                        input: {
                                                            $arrayElemAt: [
                                                                "$certificates",
                                                                1,
                                                            ],
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                        else: {
                                            $cond: {
                                                if: {
                                                    $eq: [
                                                        {
                                                            $size: "$certificates",
                                                        },
                                                        1,
                                                    ],
                                                },

                                                then: {
                                                    $cond: {
                                                        if: {
                                                            $eq: [
                                                                {
                                                                    $getField: {
                                                                        field: "_id",
                                                                        input: {
                                                                            $arrayElemAt:
                                                                                [
                                                                                    "$certificates",
                                                                                    0,
                                                                                ],
                                                                        },
                                                                    },
                                                                },
                                                                true,
                                                            ],
                                                        },
                                                        then: {
                                                            $getField: {
                                                                field: "total",
                                                                input: {
                                                                    $arrayElemAt:
                                                                        [
                                                                            "$certificates",
                                                                            0,
                                                                        ],
                                                                },
                                                            },
                                                        },
                                                        else: 0,
                                                    },
                                                },
                                                else: 0,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        {
                            $project: {
                                name: 1,
                                img: 1,
                                role: 1,
                                userId: 1,
                                isActive: 1,
                                branch: 1,
                                totalStudents: 1,
                                pendingStudents: 1,
                                verifiedStudents: 1,
                                pendingCertificates: 1,
                                issuedCertificates: 1,
                            },
                        },
                    ],
                });

                data.push({
                    title: "Registered Student",
                    count: user?.[0].totalStudents,
                    Logo: "GraduationCap",
                    color: "indigo",
                });
                data.push({
                    title: "Pending Student",
                    count: user?.[0].pendingStudents,
                    Logo: "ShieldAlert",
                    color: "red",
                });
                data.push({
                    title: "Verified Student",
                    count: user?.[0].verifiedStudents,
                    Logo: "ShieldCheck",
                    color: "zinc",
                });
                data.push({
                    title: "Pending Certificate",
                    count: user?.[0].pendingCertificates,
                    Logo: "Ribbon",
                    color: "orange",
                });
                data.push({
                    title: "Issued Certificate",
                    count: user?.[0].issuedCertificates,
                    Logo: "Medal",
                    color: "blue",
                });

                return NextResponse.json({ details: data }, { status: 200 });
            } catch (error) {
                console.log(error);
                return NextResponse.json(
                    {
                        message: "Faild while fetching details",
                        success: false,
                    },
                    {
                        status: 500,
                    }
                );
            }
        }
    } catch (error) {
        console.log("[DASHBOARD]", error);
        return NextResponse.json(
            {
                message: "Internal Error.",
                success: false,
            },
            {
                status: 500,
            }
        );
    }
};
