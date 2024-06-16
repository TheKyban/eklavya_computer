import {
    Album,
    Book,
    BookCheck,
    BriefcaseMedicalIcon,
    Dock,
    FileScan,
    FileSpreadsheet,
    FormInput,
    GraduationCap,
    IndianRupee,
    Layers3,
    Medal,
    PlusCircle,
    Printer,
    Ribbon,
    Settings,
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
        title: "Students",
        icon: <GraduationCap className="w-5 h-5 text-indigo-600" />,
        link: "/dashboard/students",
        role: "ADMIN",
    },
    {
        title: "Course",
        icon: <Book className="w-5 h-5 text-green-400" />,
        link: "/dashboard/course",
        role: "ADMIN",
    },
    {
        title: "Payment",
        icon: <IndianRupee className="w-5 h-5 text-rose-400" />,
        link: "/dashboard/payment",
        role: "FRANCHISE",
    },
    {
        title: "Carousel",
        link: "/dashboard/carousel",
        icon: (
            <Album className="w-5 h-5 text-indigo-700 dark:text-indigo-500" />
        ),
        role: "ADMIN",
    },
    {
        title: "Password",
        icon: <FormInput className="w-5 h-5 text-fuchsia-400" />,
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
        role: "FRANCHISE",
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
                role: "FRANCHISE",
            },
            {
                title: "users",
                icon: <UserRoundCog className="w-5 h-5 text-red-600" />,
                link: "/dashboard/applications/user",
                role: "ADMIN",
            },
        ],
    },
    {
        title: "Marks",
        icon: <TextCursorInput className="w-5 h-5 text-gray-600" />,
        role: "FRANCHISE",
        links: [
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
        ],
    },
    {
        title: "Certificates",
        icon: <Medal className="w-5 h-5 text-gray-600" />,
        role: "FRANCHISE",
        links: [
            {
                title: "Issued Certificates",
                icon: <Medal className="w-5 h-5 text-blue-400" />,
                link: "/dashboard/certificates",
            },
            {
                title: "Pending Certificates",
                icon: <Ribbon className="w-5 h-5 text-red-400" />,
                link: "/dashboard/certificates?pending=true",
            },
        ],
    },
    {
        title: "Management",
        icon: <Settings className="w-5 h-5 text-gray-600" />,
        role: "ADMIN",
        links: [
            {
                title: "Student Verification",
                icon: <UserRoundCog className="w-5 h-5 text-pink-600" />,
                link: "/dashboard/management/students",
                role: "ADMIN",
            },
            {
                title: "Manage Certificate",
                icon: <Layers3 className="w-5 h-5 text-cyan-400" />,
                link: "/dashboard/management/certificate",
                role: "ADMIN",
            },

            {
                title: "Manage Marksheet",
                icon: <FileScan className="w-5 h-5 text-red-400" />,
                link: "/dashboard/management/marksheet",
                role: "ADMIN",
            },

            {
                title: "Manage ICard",
                icon: <BookCheck className="w-5 h-5 text-green-400" />,
                link: "/dashboard/management/icard",
                role: "ADMIN",
            },
        ],
    },
    {
        title: "Print",
        icon: <Printer className="w-5 h-5 text-blue-600" />,
        role: "ADMIN",
        links: [
            {
                title: "Icard",
                link: "/dashboard/print/icard",
                icon: <Album className="w-5 h-5 text-yellow-500" />,
                role: "ADMIN",
            },
            {
                title: "Marksheet",
                link: "/dashboard/print/marksheet",
                icon: (
                    <BriefcaseMedicalIcon className="w-5 h-5 text-yellow-500" />
                ),
                role: "ADMIN",
            },
            {
                title: "Certificate",
                link: "/dashboard/print/certificate",
                icon: <Medal className="w-5 h-5 text-yellow-500" />,
                role: "ADMIN",
            },
        ],
    },
];
