"use client";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BadgeCheck,
    BookText,
    Building,
    ChevronDown,
    Folder,
    Users,
} from "lucide-react";
import { poppins } from "@/lib/fonts";
import { Icon } from "@/components/Home/home-icon";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

export const FirstPage = () => {
    return (
        <div className="overflow-hidden flex max-w-[1280px] m-auto w-full items-center justify-between h-[500px] lg:h-[calc(100vh-63px)] relative">
            {/*
             *
             * LEFT SIDE
             *
             */}

            <div className="h-full w-full flex flex-col justify-around gap-6">
                {/*
                 *
                 * TEXTS
                 *
                 */}

                <div className="flex flex-col gap-3 items-center justify-center text-center lg:text-left lg:justify-start lg:items-start">
                    <motion.h1
                        className={`${poppins.style.fontFamily} text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl font-bold text-indigo-600 dark:text-cyan-400`}
                        whileInView={{
                            x: 0,
                            y: 0,
                            opacity: 1,
                        }}
                        initial={{
                            x: -150,
                            opacity: 0,
                        }}
                    >
                        Eklavaya
                    </motion.h1>
                    <motion.h2
                        whileInView={{
                            x: 0,
                            y: 0,
                            opacity: 1,
                        }}
                        initial={{
                            x: -100,
                            opacity: 0,
                        }}
                        transition={{
                            delay: 0.1,
                        }}
                        className="text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-bold text-red-600 dark:text-cyan-300"
                    >
                        Global Computer
                    </motion.h2>

                    <motion.p
                        className="sm:text-base md:text-2xl font-medium text-black/50 dark:text-white"
                        whileInView={{
                            x: 0,
                            y: 0,
                            opacity: 1,
                        }}
                        initial={{
                            x: -100,
                            opacity: 0,
                        }}
                        transition={{
                            delay: 0.2,
                        }}
                    >
                        Empowering Minds, Transforming Futures: Unleash Your
                        Potential.
                    </motion.p>
                    <motion.p
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        initial={{
                            opacity: 0,
                            x: -100,
                        }}
                        transition={{
                            delay: 0.2,
                        }}
                        className="sm:text-base md:text-xl font-medium text-zinc-500 dark:text-white"
                    >
                        Recognized by the Government of India
                    </motion.p>
                </div>

                {/*
                 *
                 * ICONS
                 *
                 */}

                <div className="flex items-center justify-center gap-10 lg:gap-32">
                    {/* Student */}
                    <Icon
                        text="Total Students"
                        number="5000+"
                        Icon={Users}
                        color="orange"
                    />
                    {/* Branches */}
                    <Icon
                        text="Total Centers"
                        number="50+"
                        Icon={Building}
                        color="zinc"
                    />
                </div>
            </div>

            {/*
             *
             * RIGHT SIDE
             *
             */}
            <Image
                src={"/png/student.png"}
                height={500}
                width={500}
                alt="men"
                draggable={false}
                className="hidden select-none lg:block lg:w-[350px] 2xl:w-[400px] self-end justify-self-ends"
            />

            <ChevronDown className="absolute w-10 h-10 text-indigo-700 left-1/2 bottom-0 -translate-x-1/2 animate-bounce" />
        </div>
    );
};

export const SecondPage = () => {
    return (
        <div className="overflow-hidden flex flex-col gap-12 m-auto max-w-[1280px] items-center py-5 lg:pt-20 lg:gap-20 w-full">
            <div className="w-full flex flex-col gap-6 items-center">
                <p
                    className={`${poppins.className} text-xl md:text-3xl font-bold text-orange-600`}
                >
                    From the Desk of Directors......
                </p>

                <div className="flex flex-col gap-4 w-[93%] lg:w-full">
                    <motion.p
                        className="text-lg"
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        initial={{
                            opacity: 0,
                            x: -100,
                        }}
                        transition={{
                            delay: 0.1,
                        }}
                    >
                        Education is the most powerful weapon which can be used
                        to change the world.This is the only tool to remove the
                        darkness of ignornce from the society. Information
                        Technology has become the backbone off all the
                        productive activities today. It is not only the fastest
                        growing industry but it is the most successful and most
                        profitable industry also.For this very purpose we have
                        initiated a worldwide program named Eklavaya global
                        computer(EGC). Through this program we are imparting IT
                        education and IT enabled services through a worldwide
                        educational network. On the completion of successful
                        years of incredible performance. Eklavaya global
                        computer(EGC) is built on a foundation to promote
                        greater access to quality higher education, cutting-edge
                        research and contribution to the society. EGC provides
                        generic skills together with flexibility, adaptability
                        and passion for life-long learning. While simultaneously
                        equipping young people with the best basis for carrers
                        inany area, including industry and unforeseen needs of
                        the future. I congratulate you on your decision to join
                        EGC to pursue your higher education. Teaching-learning
                        process is not merely for profit it is for nation
                        building as well. EGC with its associate distance
                        education provider universities/organizations will
                        strive together to cater to your academic needs and see
                        that you come out of your courses with flying colors. We
                        wish you great success in all your endeavors and quest
                        for a better tomorrow, for yourselves and for the
                        mankind.
                    </motion.p>
                    <span className="self-end text-lg font-bold">
                        Warm Regards
                    </span>
                    <span className="self-end text-lg font-bold">Director</span>
                </div>
            </div>
            <Marquee
                direction="left"
                style={{
                    position: "relative",
                }}
                pauseOnClick
                autoFill
            >
                <ul className="list-disc flex  gap-10 overflow-x-auto text-rose-700">
                    <li>
                        <b>Admission is Going On...</b>
                    </li>
                    <li>
                        <b>Contact for Franchisee Opening.</b>
                    </li>
                    <li>
                        <b>Educate Your Dreams</b>
                    </li>

                    <li>
                        <b>Life+ Academics+ Creativity =Success</b>
                    </li>
                </ul>
            </Marquee>

            {/*
             *
             * WHY
             *
             */}

            <motion.div
                whileInView={{
                    x: 0,
                }}
                initial={{
                    x: 100,
                }}
                className="bg-slate-200 rounded-lg w-[93%] 2xl:w-full"
            >
                <div className="flex flex-col gap-4 justify-center items-center text-center py-7 px-4 lg:gap-12 lg:py-16">
                    <h1 className="text-4xl font-medium text-zinc-600 xl:text-6xl">
                        Why Eklavya ?.
                    </h1>

                    <p className="text-base w-full xl:w-[70%] xl:text-lg font-medium dark:text-zinc-700">
                        Our purpose as a company and sevices as the standard
                        against which we weight our action and dicisions. To
                        strengthen, sustain and professionalize business
                        knowledge through creative research and teaching,
                        highlighting the significance of learning and by
                        collaborating with organizations, institutions and
                        universities both within and well beyond the national
                        boundaries.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export const ThridPage = () => {
    return (
        <div className="flex flex-col gap-16 py-16 items-center overflow-hidden">
            <div className="flex flex-col justify-center items-center gap-10 bg-orange-100 w-[93%] max-w-[1280px] m-auto 2xl:w-full rounded-lg py-10 h-full">
                <h1 className="text-5xl font-bold text-green-600">
                    Our Features
                </h1>
                <div className="flex flex-col lg:flex-row justify-around m-auto w-fit gap-8 flex-wrap">
                    {/* CARD ONE */}

                    <motion.div
                        whileInView={{ x: 0, opacity: 1 }}
                        initial={{
                            x: -100,
                            opacity: 0,
                        }}
                    >
                        <Card className="max-w-xs bg-orange-300">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <BookText className="w-6 h-6" />
                                    <span>Books</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    We Provide books, updated with latest
                                    technology.Our books help students to
                                    understand the concept of the topic very
                                    clearly. We revise our book&apos;s content
                                    time to time to ensure that our students get
                                    better quality of education.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* CARD TWO */}

                    <motion.div
                        whileInView={{ x: 0, y: 0, opacity: 1 }}
                        initial={{
                            y: 100,
                            opacity: 0,
                        }}
                    >
                        <Card className="max-w-xs bg-indigo-300">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <Folder className="w-6 h-6" />
                                    <span>Facilities</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    We provide unique and very user friendly
                                    Online facilities like Student Verification,
                                    I-Card Verification, Marksheet Verification,
                                    Certificate Verification & we also provide
                                    complete online management system for our
                                    franchise.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* CARD THREE */}

                    <motion.div
                        whileInView={{ x: 0, opacity: 1 }}
                        initial={{
                            x: 100,
                            opacity: 0,
                        }}
                    >
                        <Card className="max-w-xs h-full bg-amber-300">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <BadgeCheck className="w-6 h-6" />
                                    <span>BETTER SUPPORT</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    We provide better support system for our
                                    franchise , in order to solve any aspect of
                                    problems regarding the software uses.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-10 bg-indigo-100 w-[93%] max-w-[1280px] m-auto 2xl:w-full rounded-lg py-10 h-full">
                <h1 className="text-5xl font-bold text-green-600">
                    Our Courses
                </h1>

                <div className="grid grid-cols-2 lg:grid-cols-3 m-auto w-fit gap-8 flex-wrap">
                    <div className="relative group overflow-hidden">
                        <Image
                            src={"/course/dca.jpg"}
                            className="transition-all group-hover:scale-110 rounded-lg w-36 h-36 md:w-auto md:h-auto"
                            width={250}
                            height={250}
                            alt="dca"
                        />
                        <div className="transition-all text-white hidden group-hover:flex  items-center justify-center absolute bg-black/50 top-0 bottom-0 left-0 right-0">
                            <span className="border px-5 py-3 rounded-md cursor-pointer">
                                More
                            </span>
                        </div>
                    </div>

                    <div className="relative group overflow-hidden">
                        <Image
                            src={"/course/adca.jpg"}
                            width={250}
                            height={250}
                            className="transition-all group-hover:scale-110 rounded-lg w-36 h-36 md:w-auto md:h-auto"
                            alt="adca"
                        />
                        <div className="transition-all text-white hidden group-hover:flex  items-center justify-center absolute bg-black/50 top-0 bottom-0 left-0 right-0">
                            <span className="border px-5 py-3 rounded-md cursor-pointer">
                                More
                            </span>
                        </div>
                    </div>

                    <div className="relative group overflow-hidden">
                        <Image
                            src={"/course/cca.jpg"}
                            width={250}
                            height={250}
                            alt="adca"
                            className="transition-all group-hover:scale-110 rounded-lg w-36 h-36 md:w-auto md:h-auto"
                        />
                        <div className="transition-all text-white hidden group-hover:flex  items-center justify-center absolute bg-black/50 top-0 bottom-0 left-0 right-0">
                            <span className="border px-5 py-3 rounded-md cursor-pointer">
                                More
                            </span>
                        </div>
                    </div>

                    <div className="relative group overflow-hidden">
                        <Image
                            src={"/course/adit.jpg"}
                            width={250}
                            height={250}
                            alt="adca"
                            className="transition-all group-hover:scale-110 rounded-lg w-36 h-36 md:w-auto md:h-auto"
                        />
                        <div className="transition-all text-white hidden group-hover:flex  items-center justify-center absolute bg-black/50 top-0 bottom-0 left-0 right-0">
                            <span className="border px-5 py-3 rounded-md cursor-pointer">
                                More
                            </span>
                        </div>
                    </div>

                    <div className="relative group overflow-hidden">
                        <Image
                            src={"/course/ddeo.jpg"}
                            width={250}
                            height={250}
                            alt="adca"
                            className="transition-all group-hover:scale-110 rounded-lg w-36 h-36 md:w-auto md:h-auto"
                        />
                        <div className="transition-all text-white hidden group-hover:flex  items-center justify-center absolute bg-black/50 top-0 bottom-0 left-0 right-0">
                            <span className="border px-5 py-3 rounded-md cursor-pointer">
                                More
                            </span>
                        </div>
                    </div>

                    <div className="relative group overflow-hidden">
                        <Image
                            src={"/course/daa.jpg"}
                            width={250}
                            height={250}
                            alt="adca"
                            className="transition-all group-hover:scale-110 rounded-lg w-36 h-36 md:w-auto md:h-auto"
                        />
                        <div className="transition-all text-white hidden group-hover:flex  items-center justify-center absolute bg-black/50 top-0 bottom-0 left-0 right-0">
                            <span className="border px-5 py-3 rounded-md cursor-pointer">
                                More
                            </span>
                        </div>
                    </div>

                    <div className="relative group overflow-hidden">
                        <Image
                            src={"/course/cfa.jpg"}
                            width={250}
                            height={250}
                            alt="adca"
                            className="transition-all group-hover:scale-110 rounded-lg w-36 h-36 md:w-auto md:h-auto"
                        />
                        <div className="transition-all text-white hidden group-hover:flex  items-center justify-center absolute bg-black/50 top-0 bottom-0 left-0 right-0">
                            <span className="border px-5 py-3 rounded-md cursor-pointer">
                                More
                            </span>
                        </div>
                    </div>

                    <div className="relative group overflow-hidden">
                        <Image
                            src={"/course/dfa.jpg"}
                            width={250}
                            height={250}
                            alt="adca"
                            className="transition-all group-hover:scale-110 rounded-lg w-36 h-36 md:w-auto md:h-auto"
                        />
                        <div className="transition-all text-white hidden group-hover:flex  items-center justify-center absolute bg-black/50 top-0 bottom-0 left-0 right-0">
                            <span className="border px-5 py-3 rounded-md cursor-pointer">
                                More
                            </span>
                        </div>
                    </div>

                    <div className="relative group overflow-hidden">
                        <Image
                            src={"/course/doa.jpg"}
                            width={250}
                            height={250}
                            alt="adca"
                            className="transition-all group-hover:scale-110 rounded-lg w-36 h-36 md:w-auto md:h-auto"
                        />
                        <div className="transition-all text-white hidden group-hover:flex  items-center justify-center absolute bg-black/50 top-0 bottom-0 left-0 right-0">
                            <span className="border px-5 py-3 rounded-md cursor-pointer">
                                More
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
