import Image from "next/image";
import { Card as ImageCard } from "@/components/Home/home-card";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, BookText, Building, Folder, Users } from "lucide-react";
import { poppins } from "@/lib/fonts";
import { Icon } from "@/components/Home/home-icon";

export const FirstPage = () => {
    return (
        <div className="flex justify-between items-center h-[500px] lg:h-[calc(100vh-80px)] max-h-[920px]">
            {/*
             *
             * LEFT SIDE
             *
             */}

            <div className="min-h-full flex flex-col justify-evenly lg:justify-around gap-6">
                {/*
                 *
                 * TEXTS
                 *
                 */}

                <div className="self-start flex flex-col gap-3 items-center justify-center text-center lg:text-left lg:justify-start lg:items-start px-4">
                    <h1
                        className={`${poppins.style.fontFamily} text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-rose-500 dark:text-cyan-400`}
                    >
                        Eklavya
                    </h1>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold dark:text-cyan-300">
                        Computer Academy
                    </h2>
                    <p className="sm:text-base md:text-2xl lg:text-3xl font-medium text-black/50 dark:text-white">
                        Empowering Minds, Transforming Futures: Unleash Your
                        Potential.
                    </p>
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
                        number="182280+"
                        Icon={Users}
                        color="orange"
                    />
                    {/* Branches */}
                    <Icon
                        text="Total Centers"
                        number="450+"
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
                className="hidden lg:block lg:w-[350px] 2xl:w-[400px] self-end"
            />
        </div>
    );
};

export const SecondPage = () => {
    return (
        <div className="flex flex-col gap-12  items-center py-5 lg:pt-20 lg:gap-20 w-full">
            <p
                className={`${poppins.className} text-3xl font-bold text-orange-600`}
            >
                🤔 What do we think.
            </p>

            {/*
             *
             * CARDS
             *
             */}

            <div className="flex flex-wrap gap-10 items-center justify-center">
                <ImageCard
                    className="dark:bg-orange-300"
                    imgSrc="/png/vector.png"
                    text="Education is the most powerful weapon which can be used to change the world.This is the only tool to remove the darkness of ignornce from the society."
                />

                <ImageCard
                    className="bg-slate-300 dark:bg-slate-300"
                    imgSrc="/png/computer.png"
                    text="Information Technology has become the backbone off all the productive activities today.For this very purpose we have initiated a worldwide program named Eklavya COMPUTER ACADEMY."
                />

                <ImageCard
                    className="bg-red-300 dark:bg-red-300"
                    imgSrc="/png/data.png"
                    text="Information Technology has become the backbone off all the productive activities today.For this very purpose we have initiated a worldwide named COMPUTER ACADEMY."
                />
                <ImageCard
                    className="bg-blue-200 dark:bg-blue-200"
                    imgSrc="/png/graph.png"
                    text="I congratulate you on your decision to join Eklavya. Teaching-learning process is not merely for profit it is for nation building as well."
                />
            </div>

            {/*
             *
             * WHY
             *
             */}

            <div className="bg-slate-200 rounded-lg w-[93%] 2xl:w-full">
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
            </div>
        </div>
    );
};

export const ThridPage = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-center gap-10 bg-orange-100 w-[93%] 2xl:w-full rounded-lg py-10 h-full">
                <h1 className="text-5xl font-bold text-green-600">
                    Our Features
                </h1>
                <div className="flex flex-col lg:flex-row justify-between m-auto w-fit gap-8 flex-wrap">
                    {/* CARD ONE */}
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
                                technology.Our books help students to understand
                                the concept of the topic very clearly. We revise
                                our book&apos;s content time to time to ensure
                                that our students get better quality of
                                education.
                            </p>
                        </CardContent>
                    </Card>
                    {/* CARD TWO */}
                    <Card className="max-w-xs bg-indigo-300">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <Folder className="w-6 h-6" />
                                <span>Facilities</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                We provide unique and very user friendly Online
                                facilities like Student Verification, I-Card
                                Verification, Marksheet Verification,
                                Certificate Verification & we also provide
                                complete online management system for our
                                franchise.
                            </p>
                        </CardContent>
                    </Card>
                    {/* CARD THREE */}
                    <Card className="max-w-xs bg-amber-300">
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
                </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-10 bg-indigo-100 w-[93%] 2xl:w-full rounded-lg py-10 h-full">
                <h1 className="text-5xl font-bold text-green-600">
                    Our Courses
                </h1>

                <div className="grid grid-cols-2 lg:grid-cols-3 m-auto w-fit gap-8 flex-wrap">
                    <Image
                        src={"/course/dca.jpg"}
                        className="rounded-lg w-36 h-36 md:w-auto md:h-auto"
                        width={250}
                        height={250}
                        alt="dca"
                    />
                    <Image
                        src={"/course/adca.jpg"}
                        width={250}
                        height={250}
                        alt="adca"
                        className="rounded-lg w-36 h-36 md:w-auto md:h-auto"
                    />
                    <Image
                        src={"/course/cca.jpg"}
                        width={250}
                        height={250}
                        alt="adca"
                        className="rounded-lg w-36 h-36 md:w-auto md:h-auto"
                    />
                    <Image
                        src={"/course/adit.jpg"}
                        width={250}
                        height={250}
                        alt="adca"
                        className="rounded-lg w-36 h-36 md:w-auto md:h-auto"
                    />
                    <Image
                        src={"/course/ddeo.jpg"}
                        width={250}
                        height={250}
                        alt="adca"
                        className="rounded-lg w-36 h-36 md:w-auto md:h-auto"
                    />
                    <Image
                        src={"/course/daa.jpg"}
                        width={250}
                        height={250}
                        alt="adca"
                        className="rounded-lg w-36 h-36 md:w-auto md:h-auto"
                    />
                    <Image
                        src={"/course/cfa.jpg"}
                        width={250}
                        height={250}
                        alt="adca"
                        className="rounded-lg w-36 h-36 md:w-auto md:h-auto"
                    />
                    <Image
                        src={"/course/dfa.jpg"}
                        width={250}
                        height={250}
                        alt="adca"
                        className="rounded-lg w-36 h-36 md:w-auto md:h-auto"
                    />
                    <Image
                        src={"/course/doa.jpg"}
                        width={250}
                        height={250}
                        alt="adca"
                        className="rounded-lg w-36 h-36 md:w-auto md:h-auto"
                    />
                </div>
            </div>
        </>
    );
};
