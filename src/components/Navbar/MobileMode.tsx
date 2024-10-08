"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { navbarLinks } from "@/components/Navbar/urls";
import { LinkStyle, LinkStyle2, LinkStyle3 } from "@/lib/STYLES";
import { Session } from "next-auth";
import { IsAuth } from "./isAuth";
import { BANNER_IMAGE } from "@/lib/ASSETS";

const MobileMode = ({ session }: { session: Session | null }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="lg:hidden w-full flex flex-col">
            <div className="relative w-full h-28 mb-2">
                <Image priority src={BANNER_IMAGE} fill alt="logo" />
            </div>
            <div className="flex gap-5 items-center justify-end px-3 w-full bg-[#033C73] py-1">
                <Sheet open={open} onOpenChange={(val) => setOpen(val)}>
                    <SheetTrigger asChild>
                        <Button
                            variant={"outline"}
                            size={"sm"}
                            className="flex gap-1 bg-transparent py-0 px-3"
                            suppressHydrationWarning
                        >
                            <span className="text-sm text-white">Menu</span>
                            <Menu className="h-4 w-4 text-white/70" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side={"left"}
                        className="flex flex-col gap-0 pt-16 overflow-y-auto"
                    >
                        <div className="flex flex-col">
                            {/* Authentication */}
                            <IsAuth
                                session={session}
                                className={LinkStyle3}
                                setOpen={() => setOpen(false)}
                            />

                            {navbarLinks.map((link) => {
                                return !!link?.link ? (
                                    <Link
                                        key={link?.title}
                                        className={LinkStyle3}
                                        href={link.link}
                                        onClick={() => setOpen(!open)}
                                    >
                                        <link.icon className="w-4 h-4" />{" "}
                                        <span>{link.title}</span>
                                    </Link>
                                ) : (
                                    <Accordion
                                        type="single"
                                        collapsible
                                        key={link?.title}
                                    >
                                        <AccordionItem
                                            value={link?.title}
                                            className="hover:bg-primary/10 px-3  rounded-md"
                                        >
                                            <AccordionTrigger>
                                                <div className="flex items-center gap-3 text-lg">
                                                    <link.icon className="w-4 h-4" />
                                                    <span>{link?.title}</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="flex flex-col gap-0">
                                                    {link?.links?.map(
                                                        (link, idx) => (
                                                            <Link
                                                                key={idx}
                                                                className={cn(
                                                                    LinkStyle,
                                                                    LinkStyle2,
                                                                )}
                                                                href={
                                                                    link?.link!
                                                                }
                                                                onClick={() =>
                                                                    setOpen(
                                                                        !open,
                                                                    )
                                                                }
                                                            >
                                                                <link.icon className="w-4 h-4" />
                                                                <span>
                                                                    {
                                                                        link?.title
                                                                    }
                                                                </span>
                                                            </Link>
                                                        ),
                                                    )}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                );
                            })}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

export default MobileMode;
