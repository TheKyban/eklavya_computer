import { info } from "@/lib/constants";
import Image from "next/image";

export const Footer = () => {
    const year = new Date(Date.now()).getFullYear();
    return (
        <div
            className="flex flex-col items-center justify-center h-full w-full"
            id="contact"
        >
            <div className="w-full h-full  flex flex-col items-center justify-around pb-6 bg-slate-900 text-white">
                <div className="relative w-full h-[160px] lg:h-[230px]">
                    <Image src={"/banner.jpg"} fill alt="banner" />
                </div>

                <div className="flex justify-around flex-col lg:flex-row gap-6 py-5 ">
                    {info.map((info, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center gap-2 min-w-fit lg:min-w-[300px] w-full"
                        >
                            <info.icon className="w-5 text-indigo-600 h-5" />
                            <span className="text-base">{info.title}</span>
                            <div className="flex flex-col gap-2 items-center justify-center text-base">
                                {info.details.map((detail, idx) => (
                                    <span key={idx}>{detail}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <p className="text-center text-sm bg-zinc-700 text-white w-full">
                <span>Copyright © 2023-{year} </span>
                <span>Eklavaya Global Computer Pvt. Ltd.</span>
            </p>
        </div>
    );
};
