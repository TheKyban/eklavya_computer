import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BadgeCheck,
    BookText,
    Building,
    Contact,
    Folder,
    GraduationCap,
    Smile,
    Target,
} from "lucide-react";
import { poppins } from "@/lib/fonts";
import Image from "next/image";
import { MAX_WIDTH } from "@/lib/styles";
import { HomeCarousel, HomeFamily } from "./home-client-component";
import { AnimationDiv } from "./home-animated-div";

export const FirstPage = () => {
    return (
        <div
            className={`${MAX_WIDTH} m-auto w-full h-full flex flex-col gap-2 py-3 overflow-x-hidden`}
        >
            {/* BANNER */}

            <AnimationDiv
                animate={{
                    x: 0,
                    opacity: 1,
                }}
                initial={{
                    opacity: 0,
                    x: 100,
                }}
                transition={{
                    delay: 0.1,
                    duration: 0.6,
                }}
                className="relative w-full h-[80px] sm:h-[150px]"
            >
                <Image src={"/banner.jpg"} fill alt="banner" />
            </AnimationDiv>

            <div className="w-full flex justify-between gap-2 flex-col lg:flex-row">
                {/* CAROUSEL */}
                <HomeCarousel />

                {/* FAMILY */}
                <HomeFamily />
            </div>
        </div>
    );
};

export const SecondPage = () => {
    return (
        <div
            className={`overflow-hidden flex flex-col m-auto ${MAX_WIDTH} items-center lg:gap-10 w-full`}
        >
            <div className="flex gap-3 flex-col lg:flex-row">
                {/* From desk of director */}
                <FromDeskOf />

                {/* NOTICE */}
                <NoticeSection />
            </div>

            {/* WHY */}
            <WhySection />
        </div>
    );
};

export const ThridPage = () => {
    return (
        <div
            className={`flex flex-col gap-16 py-16 items-center overflow-hidden w-[93%] ${MAX_WIDTH} m-auto 2xl:w-full`}
        >
            <OurFeatures />
            <OurCourses />
        </div>
    );
};

const FromDeskOf = () => {
    return (
        <AnimationDiv
            animate={{
                x: 0,
                opacity: 1,
            }}
            initial={{
                opacity: 0,
                x: -100,
            }}
            transition={{
                delay: 0.2,
                duration: 0.6,
            }}
            className="w-full flex flex-col gap-6 items-center"
        >
            <p
                className={`${poppins.className} text-xl md:text-2xl font-semibold bg-red-500 w-full text-white uppercase text-center py-2`}
            >
                From the Desk of Directors......
            </p>

            <div className="flex flex-col gap-4 w-[93%] lg:w-full">
                <p className="text-center sm:text-left md:h-fit text-sm md:text-base text-slate-800 px-2">
                    Education is the most powerful weapon which can be used to
                    change the world.This is the only tool to remove the
                    darkness of ignornce from the society. Information
                    Technology has become the backbone off all the productive
                    activities today. It is not only the fastest growing
                    industry but it is the most successful and most profitable
                    industry also.For this very purpose we have initiated a
                    worldwide program named Eklavaya global computer(EGC).
                    Through this program we are imparting IT education and IT
                    enabled services through a worldwide educational network. On
                    the completion of successful years of incredible
                    performance. Eklavaya global computer(EGC) is built on a
                    foundation to promote greater access to quality higher
                    education, cutting-edge research and contribution to the
                    society. EGC provides generic skills together with
                    flexibility, adaptability and passion for life-long
                    learning. While simultaneously equipping young people with
                    the best basis for carrers inany area, including industry
                    and unforeseen needs of the future. I congratulate you on
                    your decision to join EGC to pursue your higher education.
                    Teaching-learning process is not merely for profit it is for
                    nation building as well. EGC with its associate distance
                    education provider universities/organizations will strive
                    together to cater to your academic needs and see that you
                    come out of your courses with flying colors. We wish you
                    great success in all your endeavors and quest for a better
                    tomorrow, for yourselves and for the mankind.
                </p>
                <div className="flex flex-col text-zinc-600">
                    <span className="self-end text-sm text md:text-lg font-bold mr-6">
                        Warm Regards
                    </span>
                    <span className="self-end text-sm md:text-lg font-bold mr-6">
                        Director
                    </span>
                </div>
            </div>
        </AnimationDiv>
    );
};

const NoticeSection = () => {
    return (
        <AnimationDiv
            animate={{
                x: 0,
                opacity: 1,
            }}
            initial={{
                opacity: 0,
                x: 100,
            }}
            transition={{
                delay: 0.2,
                duration: 0.6,
            }}
            className="h-full"
        >
            <h1 className="bg-red-500 text-white font-semibold uppercase text-xl md:text-2xl text-center py-2">
                Notice
            </h1>
            {/* @ts-ignore */}
            <marquee
                direction="up"
                className="h-full w-[95%] max-h-72 lg:max-h-full sm:w-[80%] lg:w-[385px] m-auto flex"
            >
                <ul className="flex flex-col w-full text-center items-center sm:text-start sm:items-start px-3 text-sm gap-5">
                    <li className="flex flex-col sm:flex-row items-center justify-center px-3 gap-2 text-rose-700">
                        <BookText />
                        <b>Admission is Going On...</b>
                    </li>
                    <li className="flex gap-2 flex-col sm:flex-row items-center justify-center px-3 text-indigo-600">
                        <Contact />
                        <b>Contact for Franchisee Opening.</b>
                    </li>
                    <li className="flex flex-col sm:flex-row items-center justify-center px-3 text-slate-600 gap-2">
                        <GraduationCap />
                        <b>Educate Your Dreams</b>
                    </li>

                    <li className="flex flex-col sm:flex-row items-center justify-center px-3 gap-2 text-orange-600">
                        <Target />
                        <b>Life+ Academics+ Creativity =Success</b>
                    </li>

                    <li className="flex flex-col sm:flex-row items-center justify-center px-3 text-slate-600 gap-2">
                        <BookText />
                        <b>Educating Today’s Learners for Tomorrow’s world.</b>
                    </li>

                    <li className="flex flex-col sm:flex-row items-center justify-center px-3 text-indigo-600 gap-2">
                        <Smile />
                        <b>
                            “You dared to Struggle Yesterday you can dare to win
                            Today”
                        </b>
                    </li>
                    <li className="flex flex-col sm:flex-row items-center justify-center px-3 text-rose-600 gap-2">
                        <Building className="min-w-[15px] min-h-[15px]" />
                        <b>
                            It Is With Great Pleasure That I Congratulate You On
                            Your Five Year Anniversary. Please Know That You Are
                            Important Members Of Our Team And Your abilities And
                            Contributions Will Be An Important Part Of Our
                            Continued Success. People Are And Will Always Be{" "}
                        </b>
                    </li>
                </ul>
                {/* @ts-ignore */}
            </marquee>
        </AnimationDiv>
    );
};

const WhySection = () => {
    return (
        <AnimationDiv
            whileInView={{
                x: 0,
                opacity: 1,
            }}
            initial={{
                x: 100,
                opacity: 0,
            }}
            transition={{
                delay: 0.2,
                duration: 0.6,
            }}
            className="bg-slate-200 mt-5 lg:mt-0 rounded-lg w-[93%] 2xl:w-full"
        >
            <div className="flex flex-col gap-4 justify-center items-center text-center py-7 px-4 lg:gap-12 lg:py-16">
                <h1 className="text-4xl font-medium text-zinc-600 xl:text-6xl">
                    Why Eklavya{" "}
                    <span className="inline-block animate-bounce">?</span>.
                </h1>

                <p className="text-base w-full xl:w-[70%] xl:text-lg font-medium dark:text-zinc-700">
                    Our purpose as a company and sevices as the standard against
                    which we weight our action and dicisions. To strengthen,
                    sustain and professionalize business knowledge through
                    creative research and teaching, highlighting the
                    significance of learning and by collaborating with
                    organizations, institutions and universities both within and
                    well beyond the national boundaries.
                </p>
            </div>
        </AnimationDiv>
    );
};

const OurFeatures = () => {
    return (
        <div
            className={`flex flex-col justify-center items-center gap-10 bg-orange-100 w-full rounded-lg py-10 h-full`}
        >
            <h1 className="text-5xl font-bold text-green-600">Our Features</h1>
            <div className="flex flex-col lg:flex-row justify-around m-auto w-fit gap-8 flex-wrap">
                {/* CARD ONE */}

                <AnimationDiv
                    whileInView={{
                        x: 0,
                        opacity: 1,
                    }}
                    initial={{
                        x: -100,
                        opacity: 0,
                    }}
                    transition={{
                        delay: 0.2,
                        duration: 0.6,
                    }}
                >
                    <Card className="max-w-xs bg-orange-300 dark:border-0 dark:text-black">
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
                </AnimationDiv>

                {/* CARD TWO */}

                <AnimationDiv
                    whileInView={{
                        y: 0,
                        opacity: 1,
                    }}
                    initial={{
                        opacity: 0,
                        y: 100,
                    }}
                    transition={{
                        delay: 0.3,
                        duration: 0.6,
                    }}
                >
                    <Card className="max-w-xs bg-indigo-300 dark:border-0 dark:text-black">
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
                </AnimationDiv>

                {/* CARD THREE */}

                <AnimationDiv
                    whileInView={{
                        x: 0,
                        opacity: 1,
                    }}
                    initial={{
                        x: 100,
                        opacity: 0,
                    }}
                    transition={{
                        delay: 0.4,
                        duration: 0.6,
                    }}
                >
                    <Card className="max-w-xs h-full bg-amber-300 dark:text-black dark:border-0">
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
                </AnimationDiv>
            </div>
        </div>
    );
};

const OurCourses = () => {
    const courses = [
        { url: "/course/dca.jpg", name: "dca" },
        {
            url: "/course/adca.jpg",
            name: "adca",
        },
        {
            url: "/course/cca.jpg",
            name: "cca",
        },
        {
            url: "/course/adit.jpg",
            name: "adit",
        },
        {
            url: "/course/ddeo.jpg",
            name: "ddeo",
        },
        {
            url: "/course/daa.jpg",
            name: "daa",
        },
        {
            url: "/course/cfa.jpg",
            name: "cfa",
        },
        {
            url: "/course/dfa.jpg",
            name: "dfa",
        },
        {
            url: "/course/doa.jpg",
            name: "doa",
        },
    ];
    return (
        <div
            className={`flex flex-col justify-center items-center gap-10 bg-indigo-100 w-full rounded-lg py-10 h-full`}
        >
            <h1 className="text-5xl font-bold text-green-600">Our Courses</h1>

            <div className="grid grid-cols-2 lg:grid-cols-3 m-auto w-fit gap-8 flex-wrap">
                {courses?.map((course, idx) => (
                    <AnimationDiv
                        key={course.name}
                        whileInView={{
                            x: 0,
                            y: 0,
                            opacity: 1,
                        }}
                        initial={{
                            x:
                                idx === 0 || idx === 3 || idx === 6
                                    ? -100
                                    : idx === 1 || idx === 4 || idx === 7
                                    ? 0
                                    : 100,
                            y: idx === 1 || idx === 4 || idx === 7 ? 100 : 0,
                            opacity: 0,
                        }}
                        transition={{
                            delay: 0.2,
                            duration: 0.6,
                        }}
                        className="relative group overflow-hidden"
                    >
                        <Image
                            src={course.url}
                            className="transition-all group-hover:scale-110 rounded-lg w-36 h-36 md:w-auto md:h-auto"
                            width={250}
                            height={250}
                            alt={course.name}
                        />
                        <div className="transition-all flex text-white invisible opacity-0 group-hover:visible  group-hover:opacity-100 items-center justify-center absolute bg-black/50 top-0 bottom-0 left-0 right-0">
                            <span className="border-2 uppercase border-red-600 px-5 py-3 rounded-md cursor-pointer">
                                More
                            </span>
                        </div>
                    </AnimationDiv>
                ))}
            </div>
        </div>
    );
};
