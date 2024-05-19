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
import { montserrat } from "@/lib/fonts";
import { MAX_WIDTH } from "@/lib/styles";
import Image from "next/image";
import { HomeCarousel } from "@/components/Home/home-carousel";
import { AnimationDiv } from "@/components/AnimatedDiv";
import { FC } from "react";

import ReactMarquee from "react-fast-marquee";

interface familyType {
    img: string;
    name: string;
    branch: string;
}

interface firstPageProps {
    carousel?: {
        secure_url: string;
    }[];
    family?: familyType[];
}
export const FirstPage: FC<firstPageProps> = ({ carousel, family }) => {
    return (
        <div
            className={`${MAX_WIDTH} m-auto w-full mb-5 flex flex-col justify-center gap-5`}
        >
            <div className="mt-5 w-[93%] 2xl:w-full m-auto px-1 lg:px-3">
                <div className="flex items-start flex-col lg:flex-row justify-between gap-5 overflow-hidden">
                    {!!carousel?.[0] && <HomeCarousel carousel={carousel} />}
                    <NoticeSection />
                </div>
            </div>

            <div className="my-5 w-[93%]  2xl:w-full mx-auto overflow-hidden bg-orange-100 rounded-lg pb-9 pt-2 px-1 sm:px-5 flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-bold text-green-600 my-10 uppercase border-b-2 sm:border-b-4 pb-2 border-green-600">
                    Our Family
                </span>
                <HomeFamily family={family} />
            </div>
        </div>
    );
};

export const SecondPage = () => {
    return (
        <div
            className={`overflow-hidden flex flex-col m-auto ${MAX_WIDTH} items-center lg:gap-10 w-full`}
        >
            <FromDeskOf />
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

const HomeFamily: FC<{ family?: familyType[] }> = ({ family }) => {
    return (
        <ReactMarquee autoFill={true}>
            {family?.map(
                (
                    user: {
                        img: string;
                        name: string;
                        branch: string;
                    },
                    idx: number,
                ) => (
                    <div
                        key={idx}
                        className="flex flex-col gap-2 ml-16 items-center"
                    >
                        <Image
                            src={user.img}
                            width={100}
                            height={100}
                            alt="avatar"
                            placeholder="empty"
                            className="rounded-full object-cover min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] lg:min-w-[70px] lg:min-h-[70px] lg:max-w-[70px] lg:max-h-[70px]"
                        />
                        <div className="flex flex-col gap-1 font-semibold items-center text-xs ">
                            <span className="capitalize text-rose-800">
                                {user.name}
                            </span>
                            <span className="capitalize text-orange-600">
                                {user.branch}
                            </span>
                        </div>
                    </div>
                ),
            )}
        </ReactMarquee>
    );
};

const FromDeskOf = () => {
    return (
        <AnimationDiv
            whileInView={{
                x: 0,
                opacity: 1,
            }}
            className="bg-orange-100 mt-5 lg:mt-0 rounded-lg w-[93%] 2xl:w-full"
            initial={{
                x: 100,
                opacity: 0,
            }}
            transition={{
                delay: 0.2,
                duration: 0.6,
            }}
        >
            <div className="flex flex-col gap-4 justify-center items-center text-center py-7 px-4 lg:gap-12 lg:py-16">
                <span className="text-3xl font-bold text-zinc-600 xl:text-3xl border-b-4 border-zinc-500 pb-2 ">
                    From the Desk of Directors......
                    <span className="inline-block animate-pulse">?</span>.
                </span>

                <div className="flex flex-col gap-4 w-full px-5 py-3 text-sm  lg:w-[70%] xl:text-lg dark:text-zinc-700">
                    <p
                        className={`text-center sm:text-left md:h-fit text-sm  text-slate-900 px-2 leading-6 ${montserrat.className}`}
                    >
                        Education is the most powerful weapon which can be used
                        to change the world.This is the only tool to remove the
                        darkness of ignornce from the society. Information
                        Technology has become the backbone off all the
                        productive activities today. It is not only the fastest
                        growing industry but it is the most successful and most
                        profitable industry also.For this very purpose we have
                        initiated a worldwide program named Eklavaya global
                        computer(EUPL). Through this program we are imparting IT
                        education and IT enabled services through a worldwide
                        educational network. On the completion of successful
                        years of incredible performance. Eklavaya global
                        computer(EUPL) is built on a foundation to promote
                        greater access to quality higher education, cutting-edge
                        research and contribution to the society. EUPL provides
                        generic skills together with flexibility, adaptability
                        and passion for life-long learning. While simultaneously
                        equipping young people with the best basis for carrers
                        inany area, including industry and unforeseen needs of
                        the future. I congratulate you on your decision to join
                        EUPL to pursue your higher education. Teaching-learning
                        process is not merely for profit it is for nation
                        building as well. EUPL with its associate distance
                        education provider universities/organizations will
                        strive together to cater to your academic needs and see
                        that you come out of your courses with flying colors. We
                        wish you great success in all your endeavors and quest
                        for a better tomorrow, for yourselves and for the
                        mankind.
                    </p>
                    <div className="flex flex-col text-zinc-600">
                        <span className="self-end text-sm font-semibold mr-6">
                            Warm Regards
                        </span>
                        <span className="self-end text-sm font-semibold mr-6">
                            Director
                        </span>
                    </div>
                </div>
                {/* <p className="text-sm w-full lg:w-[70%] xl:text-lg dark:text-zinc-700">
                Our purpose as a company and sevices as the standard against
                which we weight our action and dicisions. To strengthen,
                sustain and professionalize business knowledge through
                creative research and teaching, highlighting the
                significance of learning and by collaborating with
                organizations, institutions and universities both within and
                well beyond the national boundaries.
            </p> */}
            </div>
        </AnimationDiv>

        // <AnimationDiv
        //     animate={{
        //         x: 0,
        //         opacity: 1,
        //     }}
        //     initial={{
        //         opacity: 0,
        //         x: -100,
        //     }}
        //     transition={{
        //         duration: 0.6,
        //     }}
        //     className="w-full flex flex-col gap-2 items-center border"
        // >
        //     <p
        //         className={`bg-orange-200 w-full text-zinc-600 uppercase text-lg text-center py-2 font-bold`}
        //     >
        //         From the Desk of Directors......
        //     </p>

        //     <div className="flex flex-col gap-4 w-full px-5 py-3">
        //         <p className="text-center sm:text-left md:h-fit text-sm  text-slate-800 px-2 leading-6">
        //             Education is the most powerful weapon which can be used to
        //             change the world.This is the only tool to remove the
        //             darkness of ignornce from the society. Information
        //             Technology has become the backbone off all the productive
        //             activities today. It is not only the fastest growing
        //             industry but it is the most successful and most profitable
        //             industry also.For this very purpose we have initiated a
        //             worldwide program named Eklavaya global computer(EUPL).
        //             Through this program we are imparting IT education and IT
        //             enabled services through a worldwide educational network. On
        //             the completion of successful years of incredible
        //             performance. Eklavaya global computer(EUPL) is built on a
        //             foundation to promote greater access to quality higher
        //             education, cutting-edge research and contribution to the
        //             society. EUPL provides generic skills together with
        //             flexibility, adaptability and passion for life-long
        //             learning. While simultaneously equipping young people with
        //             the best basis for carrers inany area, including industry
        //             and unforeseen needs of the future. I congratulate you on
        //             your decision to join EUPL to pursue your higher education.
        //             Teaching-learning process is not merely for profit it is for
        //             nation building as well. EUPL with its associate distance
        //             education provider universities/organizations will strive
        //             together to cater to your academic needs and see that you
        //             come out of your courses with flying colors. We wish you
        //             great success in all your endeavors and quest for a better
        //             tomorrow, for yourselves and for the mankind.
        //         </p>
        //         <div className="flex flex-col text-zinc-600">
        //             <span className="self-end text-sm font-semibold mr-6">
        //                 Warm Regards
        //             </span>
        //             <span className="self-end text-sm font-semibold mr-6">
        //                 Director
        //             </span>
        //         </div>
        //     </div>
        // </AnimationDiv>
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
                duration: 0.6,
            }}
            className="w-full h-[400px] max-w-full lg:max-w-sm border overflow-y-hidden rounded-lg"
        >
            <h1
                className={`bg-orange-200 text-orange-700 font-bold uppercase text-lg text-center py-2 z-10 relative`}
            >
                Notice
            </h1>

            <ul className="flex flex-col w-full h-full text-center font-medium items-center sm:text-start sm:items-start text-xs gap-5 noticeSection px-3">
                <li
                    className="flex flex-col sm:flex-row items-center justify-center  gap-2 text-rose-700"
                    key={1}
                >
                    <BookText className="min-w-[16px] w-4 min-h-[16px] h-4" />
                    <p>Admission is Going On...</p>
                </li>
                <li
                    className="flex gap-2 flex-col sm:flex-row items-center justify-center text-indigo-600"
                    key={2}
                >
                    <Contact className="min-w-[16px] w-4 min-h-[16px] h-4" />
                    <p>Contact for Franchisee Opening.</p>
                </li>
                <li
                    className="flex flex-col sm:flex-row items-center justify-center text-slate-600 gap-2"
                    key={3}
                >
                    <GraduationCap className="min-w-[16px] w-4 min-h-[16px] h-4" />
                    <p>Educate Your Dreams</p>
                </li>

                <li
                    className="flex flex-col sm:flex-row items-center justify-center gap-2 text-orange-600"
                    key={4}
                >
                    <Target className="min-w-[16px] w-4 min-h-[16px] h-4" />
                    <p>Life+ Academics+ Creativity =Success</p>
                </li>

                <li
                    className="flex flex-col sm:flex-row items-center justify-center text-slate-600 gap-2"
                    key={5}
                >
                    <BookText className="min-w-[16px] w-4 min-h-[16px] h-4" />
                    <p>Educating Today’s Learners for Tomorrow’s world.</p>
                </li>

                <li
                    className="flex flex-col sm:flex-row items-center justify-center text-indigo-600 gap-2"
                    key={6}
                >
                    <Smile className="min-w-[16px] w-4 min-h-[16px] h-4" />
                    <p>
                        “You dared to Struggle Yesterday you can dare to win
                        Today”
                    </p>
                </li>
                <li
                    className="flex flex-col sm:flex-row items-center justify-center text-rose-600 gap-2"
                    key={7}
                >
                    <Building className="min-w-[16px] w-4 min-h-[16px] h-4" />
                    <p>
                        It Is With Great Pleasure That I Congratulate You On
                        Your Five Year Anniversary. Please Know That You Are
                        Important Members Of Our Team And Your abilities And
                        Contributions Will Be An Important Part Of Our Continued
                        Success. People Are And Will Always Be.
                    </p>
                </li>
            </ul>
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
            className="bg-orange-100 mt-5 lg:mt-0 rounded-lg w-[93%] 2xl:w-full"
        >
            <div className="flex flex-col gap-4 justify-center items-center text-center py-7 px-4 lg:gap-12 lg:py-16">
                <span className="text-3xl font-medium text-zinc-600 xl:text-6xl border-b-4 border-zinc-600 pb-4 ">
                    Why Eklavaya
                    <span className="inline-block animate-pulse">?</span>.
                </span>

                <p className="text-sm w-full lg:w-[70%] xl:text-lg dark:text-zinc-700">
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
            <span className="text-3xl font-bold text-green-600 border-b-4 border-green-600 pb-2 uppercase">
                Our Features
            </span>
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
                                <BookText className="w-4 h-4" />
                                <span className="text-lg">Books</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">
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
                                <Folder className="w-4 h-4" />
                                <span className="text-lg">Facilities</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">
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
                                <BadgeCheck className="w-4 h-4" />
                                <span className="text-lg">BETTER SUPPORT</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">
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
        {
            url: "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1712900177/eklavaya_course/xejiyhsq2dxmpctsktqz.jpg",
            name: "dca",
        },
        {
            url: "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1712900175/eklavaya_course/kimyzcdbivlwrguj9a8g.jpg",
            name: "adca",
        },
        {
            url: "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1712900176/eklavaya_course/i0zrttbjt18kkbegztnc.jpg",
            name: "cca",
        },
        {
            url: "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1712900176/eklavaya_course/dqeay3yvod8oknni0nks.jpg",
            name: "adit",
        },
        {
            url: "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1712900178/eklavaya_course/qf8neuxwq0scjvk4yfty.jpg",
            name: "ddeo",
        },
        {
            url: "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1712900177/eklavaya_course/xajf6bqsawfboqzpxanz.jpg",
            name: "daa",
        },
        {
            url: "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1712900177/eklavaya_course/lcyj6qdaz4rqfektxmdb.jpg",
            name: "cfa",
        },
        {
            url: "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1712900178/eklavaya_course/ta8n2tgak0vq2gtisyqc.jpg",
            name: "dfa",
        },
        {
            url: "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1712900174/eklavaya_course/fxcyd9yhax1ywpxwi2se.jpg",
            name: "doa",
        },
    ];
    return (
        <div
            className={`flex flex-col justify-center items-center gap-10 bg-orange-100 w-full rounded-lg py-10 h-full`}
        >
            <span className="text-3xl font-bold text-green-600 border-b-4 border-green-600 pb-2 uppercase">
                Our Courses
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 m-auto w-fit gap-8 flex-wrap">
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
                        className="relative group overflow-hidden rounded-lg"
                    >
                        <Image
                            src={course.url}
                            width={130}
                            height={130}
                            className="transition-all group-hover:scale-110 rounded-lg w-36 h-36"
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
