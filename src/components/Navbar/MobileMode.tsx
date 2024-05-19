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
import { LayoutDashboard, Menu, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { navbarLinks } from "@/components/Navbar/urls";
import { LinkStyle, LinkStyle2, LinkStyle3 } from "@/lib/styles";
import { Session } from "next-auth";
import { IsAuth } from "./isAuth";

const MobileMode = ({ session }: { session: Session | null }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="lg:hidden w-full flex flex-col  bg-orange-500">
            <div className="flex gap-5 items-center justify-around">
                <IsAuth
                    session={session}
                    className="text-white/70 font-semibold"
                />
                <Sheet open={open} onOpenChange={(val) => setOpen(val)}>
                    <SheetTrigger asChild>
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            className="drop-shadow-2xl p-0 m-0"
                            suppressHydrationWarning
                        >
                            <Menu className="h-[1.5rem] w-[1.5rem] text-white/70" />
                            <span className="sr-only">Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side={"left"}
                        className="flex flex-col gap-0 pt-16 overflow-y-auto"
                    >
                        <div className="flex flex-col">
                            {/* Authentication */}
                            <IsAuth session={session} />

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

            <Image
                priority
                src={
                    "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1715332597/ekavaya_assets/nudl9plxmmvmsejmcqva.jpg"
                }
                width={500}
                height={50}
                alt="logo"
                className="w-full h-auto max-h-20 object-fill shadow-2xl"
            />
        </div>
    );
};

export default MobileMode;
