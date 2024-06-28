import Link from "next/link";
import MobileMode from "@/components/Navbar/MobileMode";
import { navbarLinks } from "@/components/Navbar/urls";
import { IsAuth } from "./isAuth";
import { ChevronDown, ChevronRight, Clock } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import { TimeComponent } from "./Time";
import { Separator } from "../ui/separator";

const Navbar = ({ session }: { session: Session | null }) => {
    return (
        <>
            {/* FIRST NAVBAR */}
            <div className="bg-[#0D3B73] w-full flex items-center justify-end py-1 px-3 gap-4">
                {/* Login  & Dasboard*/}
                <IsAuth
                    session={session}
                    className="lg:text-xs 2xl:text-base font-semibold text-yellow-400 capitalize hover:text-white transition-all duration-300"
                />
                <Separator className="w-[2px] h-5 bg-yellow-400" />
                <div className="flex gap-2 items-center justify-center">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <TimeComponent className="text-yellow-400" />
                </div>
            </div>

            {/* SECOND NAVBAR */}
            <div
                className={`hidden lg:flex items-center justify-between w-full shadow-lg bg-white sticky top-0 left-0 z-50 py-2`}
            >
                <Link href={"/"} className="ml-auto">
                    <Image
                        priority
                        src={
                            "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1715332597/ekavaya_assets/nudl9plxmmvmsejmcqva.jpg"
                        }
                        width={350}
                        height={150}
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
                                    "transition hover:text-blue-800 font-semibold uppercase h-full flex items-center justify-center gap-2 py-3 text-lg"
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
                                            "transition-all group-hover:text-blue-800  duration-300 font-semibold uppercase flex justify-center items-center gap-2 text-lg"
                                        }
                                    >
                                        {
                                            <link.icon className="w-4 h-4 text-orange-700 font-bold" />
                                        }
                                        {link?.title}
                                    </span>
                                    <ChevronDown
                                        className={
                                            "transition group-hover:text-blue-800  font-normal w-3 h-3 group-hover:rotate-180 duration-300"
                                        }
                                    />
                                </div>

                                <div className="absolute top-full left-1/2 -translate-x-1/2 flex flex-col gap-2 bg-white w-56 rounded-b-lg px-3 pt-2 pb-4 transition-all opacity-0 group-hover:opacity-100 z-0 group-hover:z-10 invisible group-hover:visible">
                                    {link?.links?.map((link) => (
                                        <Link
                                            key={link.title}
                                            className={
                                                "flex gap-2 transition-all hover:text-blue-800 hover:translate-x-4 duration-300 items-center text-base font-semibold"
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
                </div>
            </div>
            {/* MOBILE */}
            <MobileMode session={session} />
        </>
    );
};

export default Navbar;
