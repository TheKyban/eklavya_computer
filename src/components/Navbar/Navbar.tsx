import Link from "next/link";
import MobileMode from "@/components/Navbar/MobileMode";
import { navbarLinks } from "@/components/Navbar/urls";
import { IsAuth } from "./isAuth";
import { ArrowDown, ArrowRight, ArrowRightFromLine } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";

const Navbar = ({ session }: { session: Session | null }) => {
    return (
        <>
            <div
                className={`hidden lg:flex items-center justify-between w-full shadow-xl py-2 bg-white sticky top-0 left-0 z-50`}
            >
                <Image
                    priority
                    src={
                        "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1715332597/ekavaya_assets/nudl9plxmmvmsejmcqva.jpg"
                    }
                    width={180}
                    height={60}
                    alt="logo"
                    className="object-contain ml-auto"
                />
                <div className="ml-auto w-full h-full flex items-center justify-between px-3 gap-4 text-zinc-800 text-sm max-w-5xl">
                    {/* Login  & Dasboard*/}
                    <IsAuth session={session} />

                    {navbarLinks.map((link) => {
                        return !!link?.link ? (
                            <Link
                                key={link.title}
                                href={link.link}
                                className={
                                    "transition hover:text-blue-800 font-normal uppercase h-full"
                                }
                            >
                                {link.title}
                            </Link>
                        ) : (
                            <div
                                className="group relative h-full"
                                key={link?.title}
                            >
                                <div className="flex gap-2 justify-center items-center h-full py-3">
                                    <span
                                        className={
                                            "transition-all group-hover:text-blue-800  duration-300 font-normal uppercase"
                                        }
                                    >
                                        {link?.title}
                                    </span>
                                    <ArrowDown
                                        className={
                                            "transition group-hover:text-blue-800  font-normal w-3 h-3 group-hover:rotate-180 duration-300"
                                        }
                                    />
                                </div>

                                <div className="absolute top-full left-1/2 -translate-x-1/2 flex flex-col gap-2 bg-white w-48 rounded-b-lg px-3 pt-2 pb-4 -translate-y-[100%] group-hover:translate-y-2 transition-all opacity-0 group-hover:opacity-100  group-hover:z-10 duration-500 invisible group-hover:visible">
                                    {link?.links?.map((link) => (
                                        <Link
                                            key={link.title}
                                            className={
                                                "flex gap-2 transition-all hover:text-blue-800 hover:translate-x-2 duration-300 font-normal items-center"
                                            }
                                            href={link?.link!}
                                        >
                                            <ArrowRight className="w-4 h-4" />
                                            <span className="uppercase">
                                                {link.title}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* MOBILE */}
            <MobileMode session={session} />
        </>
    );
};

export default Navbar;
