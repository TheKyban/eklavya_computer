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
import { LinkStyle, LinkStyle2, LinkStyle3 } from "@/lib/styles";
import { cn } from "@/lib/utils";
import {
    Home,
    LayoutDashboard,
    LogOut,
    ShieldCheck,
    ShieldPlus,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { accordianLinks, links } from "./url";

interface sidebar extends HTMLAttributes<HTMLDivElement> {}
const Sidebar: FC<sidebar> = ({ className, role, ...props }) => {
    const pathname = usePathname();
    const search = useSearchParams();
    const fullPath = `${pathname}${
        search.toString() ? `?${search.toString()}` : ""
    }`;
    return (
        <div
            {...props}
            className={cn(
                "flex flex-col min-h-full h-full min-w-[300px] bg-zinc-50 dark:bg-black px-4 py-3",
                className
            )}
        >
            <div className="flex gap-3 items-center justify-center py-2 mb-2 select-none">
                {role === "ADMIN" ? (
                    <ShieldCheck className="w-6 h-6 text-indigo-600" />
                ) : (
                    <ShieldPlus className="w-6 h-6 text-orange-600" />
                )}
                <h1 className="text-lg lg:text-xl font-semibold uppercase text-zinc-600">
                    {role}
                </h1>
            </div>

            <Separator className="mb-4" />
            <ScrollArea className="flex flex-col gap-1">
                <Link href={"/"} className={cn(LinkStyle3, "uppercase text-base")}>
                    <Home className="w-5 h-5 text-teal-600" />
                    Home
                </Link>
                <Link
                    href={"/dashboard"}
                    className={cn(
                        LinkStyle3,
                        "transition-all text-base",
                        fullPath === "/dashboard" && "bg-black/5",
                        "uppercase"
                    )}
                >
                    <LayoutDashboard className="w-5 h-5 text-orange-600" />
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
                                    <div className="flex gap-3 text-base items-center uppercase justify-center">
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
                                                    LinkStyle2,
                                                    "uppercase text-sm",
                                                    link.link === fullPath &&
                                                        "bg-primary/10"
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
                            className={cn(
                                LinkStyle,
                                LinkStyle3,
                                "uppercase text-base",
                                link.link === fullPath && "bg-black/5"
                            )}
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
    );
};

export default Sidebar;
