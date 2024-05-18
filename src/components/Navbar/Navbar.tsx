import Link from "next/link";
import MobileMode from "@/components/Navbar/MobileMode";
import { navbarLinks } from "@/components/Navbar/urls";
import { IsAuth } from "./isAuth";
import { Banner } from "./banner";
import { ArrowDown } from "lucide-react";
import { Session } from "next-auth";

const Navbar = ({ session }: { session: Session | null }) => {
    return (
        <>
            {/* <Banner /> */}
            <div
                className={`hidden lg:flex flex-col justify-between w-full shadow-xl bg-[#026335] sticky top-0 left-0 z-50`}
            >
                <div className="ml-auto w-full h-full flex items-center justify-between px-3 py-2 gap-4 text-white text-sm max-w-5xl">
                    {/* Login  & Dasboard*/}
                    <IsAuth session={session} />

                    {navbarLinks.map((link) => {
                        return !!link?.link ? (
                            <Link
                                key={link.title}
                                href={link.link}
                                className={
                                    "transition hover:text-blue-100 font-normal"
                                }
                            >
                                {link.title}
                            </Link>
                        ) : (
                            <div className="group relative" key={link?.title}>
                                <div className="flex gap-2 justify-center items-center">
                                    <span
                                        className={
                                            "transition group-hover:text-blue-100 font-normal"
                                        }
                                    >
                                        {link?.title}
                                    </span>
                                    <ArrowDown
                                        className={
                                            "transition group-hover:text-blue-100 font-normal w-3 h-3"
                                        }
                                    />
                                </div>

                                <div className="absolute top-100 left-1/2 -translate-x-1/2 flex flex-col gap-2 bg-green-800 w-48 rounded-b-lg px-3 pt-2 pb-4 -translate-y-[100%] group-hover:translate-y-2 transition-all opacity-0 group-hover:opacity-100  group-hover:z-10 duration-500 invisible group-hover:visible">
                                    {link?.links?.map((link) => (
                                        <Link
                                            key={link.title}
                                            className={
                                                "flex gap-2 transition hover:text-blue-100 font-normal items-center"
                                            }
                                            href={link?.link!}
                                        >
                                            <link.icon className="w-4 h-4" />
                                            <span>{link.title}</span>
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
