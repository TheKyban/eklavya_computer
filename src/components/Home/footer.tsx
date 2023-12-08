import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
    const year = new Date(Date.now()).getFullYear();
    return (
        <div className="flex flex-col items-center justify-center mt-10 gap-10 h-full w-full">
            <div className="flex flex-wrap justify-around items-center lg:gap-7 h-full w-[93%] 2xl:w-full px-10 lg:py-20 rounded-xl bg-slate-300">
                {/*
                 * DIRECTOR
                 */}
                <div className="flex-1 flex items-center justify-center w-full">
                    <div className="flex flex-col items-center gap-5 min-w-[300px]  w-full xl:max-w-md py-5 lg:py-9 xl:py-4">
                        <h1 className="text-2xl font-semibold text-zinc-800">
                            Director
                        </h1>
                        <div className="flex flex-col items-center gap-5">
                            <Image
                                src={"/director.png"}
                                width={200}
                                height={200}
                                alt="director"
                                className="w-28 h-28 text-amber-700 rounded-full"
                            />
                            <span className="text-2xl font-bold text-zinc-700">
                                Rajeev Kumar
                            </span>
                        </div>
                    </div>
                </div>

                {/*
                 * INFO
                 */}

                <div className="px-10 py-6 xl:flex-auto w-full xl:max-w-4xl  grid grid-cols-1 gap-14  sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 place-content-center place-items-center m-auto text-zinc-800">
                    {/* Address */}
                    <div className="flex flex-col items-center gap-2 min-w-[300px] w-full">
                        <MapPin className="w-10 text-red-700 h-10" />
                        <span className="text-xl font-medium">Address</span>
                        <div className="flex flex-col gap-2 items-center justify-center text-xl">
                            <span>Patahi Chowk, Rewa Road</span>
                            <span>Muzaffarpur, Bihar, 842001</span>
                        </div>
                    </div>

                    {/* Contact */}

                    <div className="flex flex-col items-center gap-2 min-w-[300px] w-full">
                        <Phone className="w-10 h-10 text-indigo-600" />
                        <span className="text-xl font-medium">Contact No.</span>

                        <div className="flex flex-col gap-2 items-center justify-center text-xl">
                            <span>+91 95769 86658</span>
                            <span>+91 94302 25815</span>
                        </div>
                    </div>

                    {/* Email */}

                    <div className="flex flex-col items-center gap-2 min-w-[300px] w-full">
                        <Mail className="w-10 h-10 text-amber-600" />
                        <span className="text-xl font-medium">Email</span>

                        <div className="flex flex-col gap-2 items-center justify-center text-xl">
                            <span>aaditya1392@gmail.com</span>
                            <span>aaditya1392@gmail.com</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Copyright */}
            <p className="text-center">
                Copyright © 2016 - {year}{" "}
                <span>Eklavy Computer Academy Pvt. Ltd.</span>
            </p>
        </div>
    );
};
