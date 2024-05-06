"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Home,
    LayoutDashboard,
    LogOut,
    ShieldCheck,
    ShieldPlus,
    Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LinkStyle, LinkStyle2, LinkStyle3 } from "@/lib/styles";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/ThemeTogggle";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { accordianLinks, links } from "./url";

interface mobileMenu extends HTMLAttributes<HTMLDivElement> {}
const MobileMenu: FC<mobileMenu> = ({ className, role }) => {
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
                    src={
                        "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1712900852/ekavaya_assets/f5tpu1skpaewn1gp0e6g.png"
                    }
                    width={80}
                    height={0}
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
                                    className={cn(LinkStyle3, "uppercase")}
                                    onClick={() => setOpen(false)}
                                >
                                    <Home className="text-teal-600" />
                                    Home
                                </Link>
                                <Link
                                    href={"/dashboard"}
                                    className={cn(LinkStyle3, "uppercase")}
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
                                                    <div className="flex gap-3 text-lg items-center uppercase justify-center">
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
                                                                    "text-base uppercase",
                                                                )}
                                                                onClick={() =>
                                                                    setOpen(
                                                                        false,
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
                                                LinkStyle3,
                                                "uppercase",
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
                                <Button
                                    variant={"outline"}
                                    className="flex-1"
                                    onClick={() => signOut()}
                                >
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
