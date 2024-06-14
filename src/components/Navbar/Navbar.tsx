import Link from "next/link";
import MobileMode from "@/components/Navbar/MobileMode";
import { navbarLinks } from "@/components/Navbar/urls";
import { IsAuth } from "./isAuth";
import {
    ArrowDown,
    ArrowRight,
    ArrowRightFromLine,
    ChevronDown,
    ChevronRight,
} from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";

const Navbar = ({ session }: { session: Session | null }) => {
    return (
        <>
            <div
                className={`hidden lg:flex items-center justify-between w-full shadow-lg bg-white sticky top-0 left-0 z-50`}
            >
                <Link href={"/"} className="ml-auto">
                    <Image
                        priority
                        src={
                            "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1715332597/ekavaya_assets/nudl9plxmmvmsejmcqva.jpg"
                        }
                        width={300}
                        height={100}
                        alt="logo"
                        className="object-contain"
                    />
                </Link>
                <div className="ml-auto w-full h-full flex items-center justify-end px-3 gap-x-6 text-zinc-800 text-sm max-w-7xl flex-wrap">
                    {navbarLinks.map((link) => {
                        return !!link?.link ? (
                            <Link
                                key={link.title}
                                href={link.link}
                                className={
                                    "transition hover:text-blue-800 font-normal uppercase h-full flex items-center justify-center gap-2 lg:text-xs py-3 2xl:text-base"
                                }
                            >
                                {
                                    <link.icon className="w-4 h-4 text-orange-800 font-bold" />
                                }
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
                                            "transition-all group-hover:text-blue-800  duration-300 font-normal uppercase flex justify-center items-center gap-2 lg:text-xs 2xl:text-base"
                                        }
                                    >
                                        {
                                            <link.icon className="w-4 h-4 text-orange-700 font-bold" />
                                        }
                                        {link?.title}
                                    </span>
                                    <ChevronDown
                                        className={
                                            "transition group-hover:text-blue-800  font-normal w-3 h-3 group-hover:rotate-180 duration-700"
                                        }
                                    />
                                </div>

                                <div className="absolute top-full left-1/2 -translate-x-1/2 flex flex-col gap-2 bg-white w-56 rounded-b-lg px-3 pt-2 pb-4 -translate-y-[100%] group-hover:translate-y-2 transition-all opacity-0 group-hover:opacity-100  group-hover:z-10 duration-700 invisible group-hover:visible">
                                    {link?.links?.map((link) => (
                                        <Link
                                            key={link.title}
                                            className={
                                                "flex gap-2 transition-all hover:text-blue-800 hover:translate-x-4 duration-300 font-normal items-center lg:text-xs 2xl:text-base"
                                            }
                                            href={link?.link!}
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                            <span className="uppercase">
                                                {link.title}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {/* Login  & Dasboard*/}
                    <IsAuth
                        session={session}
                        className="lg:text-xs 2xl:text-base"
                    />
                </div>
            </div>
            {/* MOBILE */}
            <MobileMode session={session} />
        </>
    );
};

export default Navbar;
