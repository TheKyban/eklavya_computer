import {
    Album,
    Dock,
    FileSpreadsheet,
    FormInput,
    GraduationCap,
    IndianRupee,
    Layers3,
    Medal,
    PlusCircle,
    Ribbon,
    ShieldAlert,
    ShieldCheck,
    TextCursorInput,
    UserRoundCog,
    Users,
} from "lucide-react";
import { role as ROLE } from "@prisma/client";
import { ReactNode } from "react";

interface LinkType {
    title: string;
    icon: ReactNode;
    link: string;
    role?: ROLE;
}

export const links: LinkType[] = [
    {
        title: "Marks Entry",
        icon: <FileSpreadsheet className="w-5 h-5 text-green-400" />,
        link: "/dashboard/marks",
    },
    {
        title: "Typing Entry",
        icon: <TextCursorInput className="w-5 h-5 text-orange-400" />,
        link: "/dashboard/marks?typing=true",
    },
    {
        title: "Issued Certificate",
        icon: <Medal className="w-5 h-5 text-blue-400" />,
        link: "/dashboard/certificate",
    },
    {
        title: "Pending Certificate",
        icon: <Ribbon className="w-5 h-5 text-red-400" />,
        link: "/dashboard/certificate?pending=true",
    },
    {
        title: "Manage Certificate",
        icon: <Layers3 className="w-5 h-5 text-cyan-400" />,
        link: "/dashboard/certificate/manage",
        role: "ADMIN",
    },
    {
        title: "Payment",
        icon: <IndianRupee className="w-5 h-5 text-rose-400" />,
        link: "/dashboard/payment",
    },
    {
        title: "Password",
        icon: <FormInput className="w-5 h-5 text-fuchsia-400" />,
        link: "/dashboard/password",
    },
    {
        title: "Carousel",
        link: "/dashboard/carousel",
        icon: (
            <Album className="w-5 h-5 text-indigo-700 dark:text-indigo-500" />
        ),
        role: "ADMIN",
    },
];

interface accordianLinks {
    title: string;
    icon: ReactNode;
    role?: ROLE;
    links: LinkType[];
}
export const accordianLinks: accordianLinks[] = [
    {
        title: "Users",
        icon: <Users className="w-5 h-5 text-gray-600" />,
        role: "ADMIN",
        links: [
            {
                title: "Registration",
                icon: <PlusCircle className="w-5 h-5 text-orange-500" />,
                link: "/dashboard/users/registration",
            },
            {
                title: "Manage Users",
                icon: <UserRoundCog className="w-5 h-5 text-red-600" />,
                link: "/dashboard/users",
            },
        ],
    },
    {
        title: "Student",
        icon: <GraduationCap className="w-5 h-5 text-indigo-600" />,
        links: [
            {
                title: "Registration",
                icon: <PlusCircle className="w-5 h-5 text-orange-500" />,
                link: "/dashboard/student/registration",
            },
            {
                title: "Pending List",
                icon: <ShieldAlert className="w-5 h-5 text-red-600" />,
                link: "/dashboard/student?pending=true",
            },
            {
                title: "Verified List",
                icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />,
                link: "/dashboard/student",
            },
            {
                title: "Verification",
                icon: <UserRoundCog className="w-5 h-5 text-pink-600" />,
                link: "/dashboard/student/verification",
                role: "ADMIN",
            },
        ],
    },
    {
        title: "applications",
        icon: <Dock className="w-5 h-5 text-gray-600" />,
        links: [
            {
                title: "students",
                icon: <GraduationCap className="w-5 h-5 text-orange-500" />,
                link: "/dashboard/applications/students",
            },
            {
                title: "users",
                icon: <UserRoundCog className="w-5 h-5 text-red-600" />,
                link: "/dashboard/applications/user",
                role: "ADMIN",
            },
        ],
    },
];
