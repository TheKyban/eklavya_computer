"use client";
import { ModeToggle } from "@/components/ThemeTogggle";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { LinkStyle, LinkStyle2, LinkStyle3 } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { role as ROLE } from "@prisma/client";
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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, HTMLAttributes, ReactNode } from "react";

interface LinkType {
    title: string;
    icon: ReactNode;
    link: string;
    role?: ROLE;
}

const links: LinkType[] = [
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
const accordianLinks: accordianLinks[] = [
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

interface sidebar extends HTMLAttributes<HTMLDivElement> {}
const Sidebar: FC<sidebar> = ({ className, ...props }) => {
    const pathname = usePathname();
    const path = pathname.split("/").pop();
    const role: ROLE = ROLE.ADMIN;
    return (
        <div
            {...props}
            className={cn(
                "flex flex-col min-h-full h-full min-w-[350px] bg-zinc-50 dark:bg-black px-4 py-3",
                className
            )}
        >
            <div className="flex gap-3 items-center justify-center py-2 mb-2 select-none">
                {role === "ADMIN" ? (
                    <ShieldCheck className="w-8 h-8 text-indigo-600" />
                ) : (
                    <ShieldPlus className="w-8 h-8 text-orange-600" />
                )}
                <h1 className="text-2xl font-semibold uppercase text-zinc-600">
                    {role}
                </h1>
            </div>

            <Separator className="mb-4" />
            <ScrollArea className="flex flex-col gap-1">
                <Link href={"/"} className={LinkStyle3}>
                    <Home className="text-teal-600" />
                    Home
                </Link>
                <Link
                    href={"/dashboard"}
                    className={cn(
                        LinkStyle3,
                        "transition-all",
                        path === "dashboard" && "bg-black/5"
                    )}
                >
                    <LayoutDashboard className="text-orange-600" />
                    Dashboard
                </Link>
                <Accordion type="single" collapsible>
                    {accordianLinks.map((link) => {
                        if (link?.role && role !== link?.role) return;

                        return (
                            <AccordionItem
                                value={link.title}
                                key={link.title}
                                className={cn(
                                    "hover:bg-primary/5 px-3 rounded-md m-0",
                                    "transition-all",
                                    pathname
                                        .split("/")
                                        .includes(link.title.toLowerCase()) &&
                                        "bg-black/5"
                                )}
                            >
                                <AccordionTrigger>
                                    <div className="flex gap-3 text-lg items-center justify-center">
                                        {link.icon} {link.title}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    {link.links.map((link) => {
                                        if (link?.role && role !== link?.role)
                                            return;
                                        return (
                                            <Link
                                                href={link.link}
                                                key={link.title}
                                                className={cn(
                                                    LinkStyle,
                                                    LinkStyle2
                                                )}
                                            >
                                                {link.icon}
                                                {link.title}
                                            </Link>
                                        );
                                    })}
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
                {links.map((link) => {
                    if (link?.role && role !== link?.role) return;
                    return (
                        <Link
                            href={link.link}
                            key={link.title}
                            className={cn(LinkStyle, LinkStyle3)}
                        >
                            {link.icon} {link.title}
                        </Link>
                    );
                })}
            </ScrollArea>
            <div className="mt-auto flex gap-4">
                <ModeToggle />
                <Button variant={"outline"} className="flex-1">
                    <LogOut />
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
