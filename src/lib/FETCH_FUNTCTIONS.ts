import { UserType, details } from "./TYPES";
import { Prisma } from "../../prisma/prisma";
import {
    GraduationCap,
    Medal,
    Ribbon,
    ShieldAlert,
    ShieldCheck,
    Users,
} from "lucide-react";

export const fetchBranch = async () => {
    const branches = await Prisma.user.findMany({
        where: {
            role: "FRANCHISE",
        },
        select: {
            branch: true,
            userId: true,
        },
    });
    return branches;
};

export const fetchAdminDashboardData = async () => {
    const data: details[] = [
        {
            count: 0,
            title: "Total User",
            Logo: Users,
            color: "teal",
        },
        {
            title: "Total Registered Student",
            count: 0,
            Logo: GraduationCap,
            color: "indigo",
        },
        {
            title: "Total Pending Student",
            count: 0,
            Logo: ShieldAlert,
            color: "red",
        },

        {
            title: "Total Verified Student",
            count: 0,
            Logo: ShieldCheck,
            color: "zinc",
        },
        {
            title: "Total Pending Certificate",
            count: 0,
            Logo: Ribbon,
            color: "orange",
        },
        {
            title: "Total Issued Certificate",
            count: 0,
            Logo: Medal,
            color: "blue",
        },
    ];

    //@ts-ignore
    const allUsers: Array<UserType> = await Prisma.user.aggregateRaw({
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
                                                        $arrayElemAt: [
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
                                                $arrayElemAt: ["$students", 0],
                                            },
                                        },
                                    },
                                    else: {
                                        $getField: {
                                            field: "total",
                                            input: {
                                                $arrayElemAt: ["$students", 1],
                                            },
                                        },
                                    },
                                },
                            },
                            else: {
                                $cond: {
                                    if: {
                                        $eq: [{ $size: "$students" }, 1],
                                    },

                                    then: {
                                        $cond: {
                                            if: {
                                                $eq: [
                                                    {
                                                        $getField: {
                                                            field: "_id",
                                                            input: {
                                                                $arrayElemAt: [
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
                                                        $arrayElemAt: [
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
                                                $arrayElemAt: ["$students", 0],
                                            },
                                        },
                                    },
                                    else: {
                                        $getField: {
                                            field: "total",
                                            input: {
                                                $arrayElemAt: ["$students", 1],
                                            },
                                        },
                                    },
                                },
                            },
                            else: {
                                $cond: {
                                    if: {
                                        $eq: [{ $size: "$students" }, 1],
                                    },

                                    then: {
                                        $cond: {
                                            if: {
                                                $eq: [
                                                    {
                                                        $getField: {
                                                            field: "_id",
                                                            input: {
                                                                $arrayElemAt: [
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
                                $eq: [{ $size: "$certificates" }, 2],
                            },
                            then: {
                                $cond: {
                                    if: {
                                        $eq: [
                                            {
                                                $getField: {
                                                    field: "_id",
                                                    input: {
                                                        $arrayElemAt: [
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
                                                                $arrayElemAt: [
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
                                $eq: [{ $size: "$certificates" }, 2],
                            },
                            then: {
                                $cond: {
                                    if: {
                                        $eq: [
                                            {
                                                $getField: {
                                                    field: "_id",
                                                    input: {
                                                        $arrayElemAt: [
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
                                                                $arrayElemAt: [
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

    data[0].count = allUsers?.length - 1; // total users
    for (let i = 0; i < allUsers?.length; i++) {
        data[1].count += allUsers[i]?.totalStudents;
        data[2].count += allUsers[i].pendingStudents;
        data[3].count += allUsers[i].verifiedStudents;
        data[4].count += allUsers[i].pendingCertificates;
        data[5].count += allUsers[i].issuedCertificates;
    }

    return { details: data, allUsers };
};

export const fetchUserDashboardData = async (userId: string) => {
    // @ts-ignore
    const user: UserType[] = await Prisma.user.aggregateRaw({
        pipeline: [
            {
                $match: {
                    userId,
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
                                                        $arrayElemAt: [
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
                                                $arrayElemAt: ["$students", 0],
                                            },
                                        },
                                    },
                                    else: {
                                        $getField: {
                                            field: "total",
                                            input: {
                                                $arrayElemAt: ["$students", 1],
                                            },
                                        },
                                    },
                                },
                            },
                            else: {
                                $cond: {
                                    if: {
                                        $eq: [{ $size: "$students" }, 1],
                                    },

                                    then: {
                                        $cond: {
                                            if: {
                                                $eq: [
                                                    {
                                                        $getField: {
                                                            field: "_id",
                                                            input: {
                                                                $arrayElemAt: [
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
                                                        $arrayElemAt: [
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
                                                $arrayElemAt: ["$students", 0],
                                            },
                                        },
                                    },
                                    else: {
                                        $getField: {
                                            field: "total",
                                            input: {
                                                $arrayElemAt: ["$students", 1],
                                            },
                                        },
                                    },
                                },
                            },
                            else: {
                                $cond: {
                                    if: {
                                        $eq: [{ $size: "$students" }, 1],
                                    },

                                    then: {
                                        $cond: {
                                            if: {
                                                $eq: [
                                                    {
                                                        $getField: {
                                                            field: "_id",
                                                            input: {
                                                                $arrayElemAt: [
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
                                $eq: [{ $size: "$certificates" }, 2],
                            },
                            then: {
                                $cond: {
                                    if: {
                                        $eq: [
                                            {
                                                $getField: {
                                                    field: "_id",
                                                    input: {
                                                        $arrayElemAt: [
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
                                                                $arrayElemAt: [
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
                                $eq: [{ $size: "$certificates" }, 2],
                            },
                            then: {
                                $cond: {
                                    if: {
                                        $eq: [
                                            {
                                                $getField: {
                                                    field: "_id",
                                                    input: {
                                                        $arrayElemAt: [
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
                                                                $arrayElemAt: [
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

    const details: details[] = [
        {
            title: "Registered Student",
            count: user?.[0].totalStudents,
            Logo: GraduationCap,
            color: "indigo",
        },
        {
            title: "Pending Student",
            count: user?.[0].pendingStudents,
            Logo: ShieldAlert,
            color: "red",
        },
        {
            title: "Verified Student",
            count: user?.[0].verifiedStudents,
            Logo: ShieldCheck,
            color: "zinc",
        },
        {
            title: "Pending Certificate",
            count: user?.[0].pendingCertificates,
            Logo: Ribbon,
            color: "orange",
        },
        {
            title: "Issued Certificate",
            count: user?.[0].issuedCertificates,
            Logo: Medal,
            color: "blue",
        },
    ];

    return { details };
};

export const fetchFamilies = async () => {
    const users = await Prisma.user.findMany({
        select: {
            img: true,
            name: true,
            branch: true,
        },
    });

    return users;
};

export const fetchCarousels = async () => {
    const carousels = await Prisma.carousel.findMany({
        orderBy: {
            createdAt: "asc",
        },
        select: {
            url: true,
        },
    });
    return carousels;
};
