"use client";
import { info } from "@/lib/constants";
import { motion } from "framer-motion";

export const Footer = () => {
    const year = new Date(Date.now()).getFullYear();
    return (
        <div
            className="flex flex-col items-center max-w-[1280px] m-auto justify-center h-full w-full overflow-hidden"
            id="contact"
        >
            <div className="w-full h-full flex flex-col items-center justify-around ">
                <motion.div
                    whileInView={{
                        x: 0,
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.6,
                        easings: "tween",
                        ease: "easeInOut",
                        delay: 0.3,
                    }}
                    viewport={{
                        once: true,
                    }}
                    initial={{
                        x: -100,
                        opacity: 0,
                    }}
                    className="flex justify-around w-full h-full bg-[#0B0D38] flex-col md:flex-row gap-6 py-5 "
                >
                    {info.map((info, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center gap-1 min-w-fit lg:min-w-[300px] w-full text-black"
                        >
                            <info.icon className="w-5 text-indigo-600 h-5" />
                            <span className="text-sm uppercase font-medium text-white">
                                {info.title}
                            </span>
                            <div className="flex flex-col items-center text-white justify-center text-sm">
                                {info.details.map((detail, idx) => (
                                    <span key={idx}>{detail}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
            <motion.p
                whileInView={{
                    x: 0,
                    opacity: 1,
                }}
                transition={{
                    duration: 0.6,
                    easings: "tween",
                    ease: "easeInOut",
                    delay: 1,
                }}
                viewport={{
                    once: true,
                }}
                initial={{
                    x: 100,
                    opacity: 0,
                }}
                className="text-center text-sm bg-[#026335] text-white w-full"
            >
                <span>Copyright © 2023-{year} </span>
                <span>Eklavaya Global Computer Pvt. Ltd.</span>
            </motion.p>
        </div>
    );
};
