import {
    FileSpreadsheet,
    FormInput,
    GraduationCap,
    Home,
    IndianRupee,
    Layers3,
    LayoutDashboard,
    LogOut,
    Medal,
    PlusCircle,
    Ribbon,
    ShieldAlert,
    ShieldCheck,
    ShieldPlus,
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
        icon: <FileSpreadsheet className="text-green-400" />,
        link: "/dashboard/marks",
    },
    {
        title: "Typing Entry",
        icon: <TextCursorInput className="text-orange-400" />,
        link: "/dashboard/typing",
    },
    {
        title: "Issued Certificate",
        icon: <Medal className="text-blue-400" />,
        link: "/dashboard/certificate/issued",
    },
    {
        title: "Pending Certificate",
        icon: <Ribbon className="text-red-400" />,
        link: "/dashboard/certificate/pending",
    },
    {
        title: "Manage Certificate",
        icon: <Layers3 className="text-cyan-400" />,
        link: "/dashboard/certificate",
        role: "ADMIN",
    },
    {
        title: "Payment",
        icon: <IndianRupee className="text-rose-400" />,
        link: "/dashboard/payment",
    },
    {
        title: "Password",
        icon: <FormInput className="text-fuchsia-400" />,
        link: "/dashboard/password",
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
        title: "Franchise",
        icon: <Users className="text-gray-600" />,
        role: "ADMIN",
        links: [
            {
                title: "Registration",
                icon: <PlusCircle className="text-orange-500" />,
                link: "/dashboard/franchise/registration",
            },
            {
                title: "Manage Franchise",
                icon: <UserRoundCog className="text-red-600" />,
                link: "/dashboard/franchise",
            },
        ],
    },
    {
        title: "Student",
        icon: <GraduationCap className="text-indigo-600" />,
        links: [
            {
                title: "Registration",
                icon: <PlusCircle className="text-orange-500" />,
                link: "/dashboard/student/registration",
            },
            {
                title: "Pending List",
                icon: <ShieldAlert className="text-red-600" />,
                link: "/dashboard/student/pending",
            },
            {
                title: "Verified List",
                icon: <ShieldCheck className="text-indigo-600" />,
                link: "/dashboard/student/verified",
            },
            {
                title: "Student Verification",
                icon: <UserRoundCog className="text-pink-600" />,
                link: "/dashboard/student/verification",
                role: "ADMIN",
            },
        ],
    },
];
