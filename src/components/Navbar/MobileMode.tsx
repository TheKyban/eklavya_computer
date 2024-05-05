"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { LayoutDashboard, Menu, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { AccordionLinks, singleLink } from "@/components/Navbar/urls";
import { LinkStyle, LinkStyle2, LinkStyle3 } from "@/lib/styles";
import { useSession } from "next-auth/react";

const MobileMode = () => {
    const [open, setOpen] = useState(false);
    const { status } = useSession();
    const isAuth = status === "authenticated" ? true : false;

    return (
        <div className="md:hidden w-full flex justify-around bg-orange-50">
            <Image
                priority
                src={
                    "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1712899947/ekavaya_assets/opflfl8pq0yfpeqj0kwc.jpg"
                }
                width={500}
                height={50}
                alt="logo"
                className="w-full h-auto max-h-20 object-fill shadow-2xl"
            />
            <div className="flex gap-5 items-center justify-center">
                <Sheet open={open} onOpenChange={(val) => setOpen(val)}>
                    <SheetTrigger asChild>
                        <Button
                            variant={"outline"}
                            size={"sm"}
                            className="py-5 px-3 drop-shadow-md"
                            suppressHydrationWarning
                        >
                            <Menu className="h-[1.2rem] w-[1.2rem] text-red-700" />
                            <span className="sr-only">Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side={"left"}
                        className="flex flex-col gap-0 pt-16"
                    >
                        <ScrollArea>
                            <div className="flex flex-col">
                                {/* Authentication */}
                                {isAuth ? (
                                    <Link
                                        className={LinkStyle3}
                                        href={"/dashboard"}
                                        onClick={() => setOpen(!open)}
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        <span>Dashbord</span>
                                    </Link>
                                ) : (
                                    <Link
                                        className={LinkStyle3}
                                        href={"/login"}
                                        onClick={() => setOpen(!open)}
                                    >
                                        <User className="w-4 h-4" />
                                        <span>Login</span>
                                    </Link>
                                )}

                                {singleLink.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        className={LinkStyle3}
                                        href={link.link}
                                        onClick={() => setOpen(!open)}
                                    >
                                        <link.icon className="w-4 h-4" />{" "}
                                        <span>{link.title}</span>
                                    </Link>
                                ))}
                            </div>

                            {/* Accordion Links */}
                            <Accordion type="single" collapsible className="">
                                {AccordionLinks.map((accordionLink, idx) => (
                                    <AccordionItem
                                        key={idx}
                                        value={accordionLink.name}
                                        className="hover:bg-primary/10 px-3  rounded-md"
                                    >
                                        <AccordionTrigger>
                                            <div className="flex items-center gap-3 text-lg">
                                                <accordionLink.icon className="w-4 h-4" />
                                                <span>
                                                    {accordionLink.name}
                                                </span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="flex flex-col gap-0">
                                                {accordionLink.links.map(
                                                    (link, idx) => (
                                                        <Link
                                                            key={idx}
                                                            className={cn(
                                                                LinkStyle,
                                                                LinkStyle2
                                                            )}
                                                            href={link.link}
                                                            onClick={() =>
                                                                setOpen(!open)
                                                            }
                                                        >
                                                            <link.icon className="w-4 h-4" />
                                                            <span>
                                                                {link.title}
                                                            </span>
                                                        </Link>
                                                    )
                                                )}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </ScrollArea>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

export default MobileMode;
