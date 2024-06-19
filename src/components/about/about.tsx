"use client";
import { MAX_WIDTH, MIN_HEIGHT } from "@/lib/STYLES";
import { motion } from "framer-motion";
import { FromDeskOf } from "../Home/home-pages";
import { montserrat } from "@/lib/FONTS";

export default function About() {
    return (
        <div
            className={`${MIN_HEIGHT} flex flex-col items-center gap-6 bg-orange-50 text-black w-full py-5 overflow-hidden px-3`}
        >
            {/* ABOUT THE ACADEMY */}

            <motion.div
                whileInView={{
                    x: 0,
                    opacity: 1,
                }}
                transition={{
                    delay: 0.4,
                    duration: 0.5,
                    easings: "tween",
                    ease: "easeInOut",
                }}
                viewport={{
                    once: true,
                }}
                initial={{
                    x: -100,
                    opacity: 0,
                }}
                className={`${MAX_WIDTH} bg-orange-100 lg:rounded-lg w-full lg:w-[93%] 2xl:w-full flex flex-col items-center`}
            >
                <FromDeskOf />
            </motion.div>
            {/* OUR MISSION */}

            <motion.div
                whileInView={{
                    x: 0,
                    opacity: 1,
                }}
                transition={{
                    delay: 0.4,
                    duration: 0.5,
                    easings: "tween",
                    ease: "easeInOut",
                }}
                viewport={{
                    once: true,
                }}
                initial={{
                    x: -100,
                    opacity: 0,
                }}
                className={`${MAX_WIDTH} bg-orange-100 lg:rounded-lg w-full lg:w-[93%] 2xl:w-full flex flex-col items-center gap-5 py-10`}
            >
                <h1 className="text-xl font-semibold uppercase text-zinc-600 border-b-2 border-zinc-500 pb-2 ">
                    Our Mission
                </h1>
                <p
                    className={`text-left text-sm text-slate-900/75 px-2 leading-6 ${montserrat.className} flex flex-col gap-5 font-medium w-[80%] lg:w-[60%] px-5`}
                >
                    Our Roadmap starts with our mission, which is enduring. It
                    declares our purpose as a company and services as the
                    standard against which we weight our action and dicisions.
                    To strengthen, sustain and professionalize business
                    knowledge through creative research and teaching,
                    highlighting the significance of learning and by
                    collaborating with organizations, institutions and
                    universities both within and well beyond the national
                    boundaries.
                </p>
            </motion.div>

            {/* OUR VISION */}

            <motion.div
                whileInView={{
                    x: 0,
                    opacity: 1,
                }}
                transition={{
                    delay: 0.6,
                    duration: 0.5,
                    easings: "tween",
                    ease: "easeInOut",
                }}
                viewport={{
                    once: true,
                }}
                initial={{
                    x: 100,
                    opacity: 0,
                }}
                className={`${MAX_WIDTH} bg-orange-100 lg:rounded-lg w-full lg:w-[93%] 2xl:w-full flex flex-col items-center gap-5 py-10`}
            >
                <h1 className="text-xl font-semibold uppercase text-zinc-600 border-b-2 border-zinc-500 pb-2 ">
                    Our Vision
                </h1>
                <p
                    className={`text-left text-sm text-slate-900/75 leading-6 ${montserrat.className} flex flex-col gap-5 font-medium w-[80%] lg:w-[60%] px-5`}
                >
                    Our vision serves as the framework for our Roadmap and
                    guides every aspect of our bussiness by describing that we
                    need to accomplish in order to continue achieving sustained
                    quality to be an academic CENTER OF EXCELLENCE in the area
                    of computer education and a well-networked institution
                    committed towards delivering globally competitive computer
                    education, training and research to individuals, corporates
                    bodies, government organizations and the society.
                </p>
            </motion.div>
        </div>
    );
}
