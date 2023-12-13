"use client";
import Image from "next/image";
import { role as ROLE } from "@prisma/client";
import { ModeToggle } from "@/components/ThemeTogggle";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LinkStyle, LinkStyle2, LinkStyle3 } from "@/lib/constants";
import { cn } from "@/lib/utils";
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
    Menu,
} from "lucide-react";
import Link from "next/link";

import { FC, HTMLAttributes, ReactNode, useEffect, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet";

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

interface mobileMenu extends HTMLAttributes<HTMLDivElement> {}
const MobileMenu: FC<mobileMenu> = ({ className }) => {
    const role: ROLE = ROLE.ADMIN;
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return null;
    return (
        <div className={cn("w-full flex justify-around py-5", className)}>
            <div>
                <Image
                    priority
                    src={"/logo.svg"}
                    width={50}
                    height={50}
                    alt="logo"
                />
            </div>
            <div className="flex gap-5 items-center justify-center">
                <Sheet open={open} onOpenChange={(val) => setOpen(val)}>
                    <SheetTrigger asChild>
                        <Button
                            variant={"outline"}
                            size={"sm"}
                            className="py-5 px-3"
                            suppressHydrationWarning
                        >
                            <Menu className="h-[1.2rem] w-[1.2rem]" />
                            <span className="sr-only">Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side={"left"} className="flex flex-col gap-0">
                        <SheetHeader>
                            <div className="flex gap-3 items-center justify-center py-2 mb-2 select-none">
                                {role === "ADMIN" ? (
                                    <ShieldCheck className="w-8 h-8 text-indigo-600" />
                                ) : (
                                    <ShieldPlus className="w-8 h-8 text-orange-600" />
                                )}
                                <h1 className="text-xl font-semibold uppercase text-zinc-600">
                                    {role}
                                </h1>
                            </div>
                        </SheetHeader>
                        <div className="flex flex-col min-h-[calc(100vh-100px)] h-full">
                            <ScrollArea className="flex flex-col gap-1">
                                <Link
                                    href={"/"}
                                    className={LinkStyle3}
                                    onClick={() => setOpen(false)}
                                >
                                    <Home className="text-teal-600" />
                                    Home
                                </Link>
                                <Link
                                    href={"/dashboard"}
                                    className={cn(LinkStyle3)}
                                    onClick={() => setOpen(false)}
                                >
                                    <LayoutDashboard className="text-orange-600" />
                                    Dashboard
                                </Link>
                                <Accordion type="single" collapsible>
                                    {accordianLinks.map((link) => {
                                        if (link?.role && role !== link?.role)
                                            return;

                                        return (
                                            <AccordionItem
                                                value={link.title}
                                                key={link.title}
                                                className={
                                                    "hover:bg-primary/5 px-3 rounded-md m-0"
                                                }
                                            >
                                                <AccordionTrigger>
                                                    <div className="flex gap-3 text-lg items-center justify-center">
                                                        {link.icon} {link.title}
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    {link.links.map((link) => {
                                                        if (
                                                            link?.role &&
                                                            role !== link?.role
                                                        )
                                                            return;
                                                        return (
                                                            <Link
                                                                href={link.link}
                                                                key={link.title}
                                                                className={cn(
                                                                    LinkStyle,
                                                                    LinkStyle2,
                                                                    "text-base"
                                                                )}
                                                                onClick={() =>
                                                                    setOpen(
                                                                        false
                                                                    )
                                                                }
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
                                    if (link?.role && role !== link?.role)
                                        return;
                                    return (
                                        <Link
                                            href={link.link}
                                            key={link.title}
                                            className={cn(
                                                LinkStyle,
                                                LinkStyle3
                                            )}
                                            onClick={() => setOpen(false)}
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
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

export default MobileMenu;
