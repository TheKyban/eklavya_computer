"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import {
    BadgeCheck,
    BookText,
    Brain,
    Building,
    Contact,
    Folder,
    GraduationCap,
    Hand,
    Lock,
    Smile,
    Target,
} from "lucide-react";
import { montserrat } from "@/lib/FONTS";
import { MAX_WIDTH } from "@/lib/STYLES";
import Image from "next/image";
import { FC } from "react";
import { motion } from "framer-motion";
import ReactMarquee from "react-fast-marquee";
import SparklesText from "../ui/sparkles-text";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import GridPattern from "../ui/grid-pattern";
import { cn } from "@/lib/utils";
import DotPattern from "../ui/dot";
import BoxReveal from "../ui/Box-reveal";

interface familyType {
    img: string;
    name: string;
    branch: string;
}

interface firstPageProps {
    carousel?: {
        url: string;
    }[];
    family?: familyType[];
}

export const FirstPage: FC<firstPageProps> = ({ carousel, family }) => {
    return (
        <div
            className={`${MAX_WIDTH} m-auto w-full xl:mt-2 flex flex-col justify-center items-center gap-5 lg:gap-8 mb-8`}
        >
            <div className="w-full h-full">
                {!!carousel?.[0] && <HomeCarousel carousel={carousel} />}
                <NoticeSection />
            </div>

            <HomeFamily family={family} />
            <FromDeskOf />

            <WhySection />
            <OurFeatures />
            <OurCourses />
        </div>
    );
};

const HomeCarousel: FC<{
    carousel?: {
        url: string;
    }[];
}> = ({ carousel }) => {
    return (
        <motion.div
            animate={{
                y: 0,
                opacity: 1,
            }}
            initial={{
                opacity: 0,
                y: 100,
            }}
            transition={{
                duration: 1,
                ease: "easeInOut",
            }}
            className="w-full"
        >
            <Carousel
                className="w-full h-[250px] sm:h-[400px] lg:h-[75vh] lg:max-h-[600px] relative"
                plugins={[
                    Autoplay({
                        delay: 3000,
                        stopOnInteraction: false,
                    }),
                ]}
            >
                <CarouselContent>
                    {carousel?.map((image, idx) => (
                        <CarouselItem key={idx}>
                            <div className="relative w-full h-[250px] sm:h-[400px] lg:h-[75vh] lg:max-h-[600px]">
                                <Image
                                    src={image.url}
                                    fill
                                    alt={image.url}
                                    className="object-fill w-full h-full"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </motion.div>
    );
};

const NoticeSection = () => {
    return (
        <motion.div
            initial={{
                y: 100,
                opacity: 0,
            }}
            animate={{
                y: 0,
                opacity: 1,
            }}
            transition={{
                duration: 1.3,
                ease: "easeInOut",
            }}
            className="w-full h-full relative rounded-lg border bg-background md:shadow-xl overflow-hidden"
        >
            <DotPattern
                className={cn(
                    "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
                )}
            />
            <ReactMarquee className="text-base font-semibold py-3" pauseOnHover>
                <li className="ml-8 flex items-center justify-center gap-2 text-orange-600 border-x border-orange-800 px-3">
                    <BookText className="min-w-[16px] w-4 min-h-[16px] h-4" />
                    <p>Admission is Going On...</p>
                </li>

                <li className="ml-8 flex gap-2 items-center justify-center text-orange-600 border-x border-orange-800 px-3">
                    <Contact className="min-w-[16px] w-4 min-h-[16px] h-4" />
                    <p>Contact for Franchisee Opening.</p>
                </li>

                <li className="ml-8 flex items-center justify-center text-orange-600 gap-2 border-x border-orange-800 px-3">
                    <GraduationCap className="min-w-[16px] w-4 min-h-[16px] h-4" />
                    <p>Educate Your Dreams</p>
                </li>

                <li className="ml-8 flex items-center justify-center gap-2 text-orange-600 border-x border-orange-800 px-3">
                    <Target className="min-w-[16px] w-4 min-h-[16px] h-4" />
                    <p>Life+ Academics+ Creativity =Success</p>
                </li>

                <li className="ml-8 flex items-center justify-center text-orange-600 gap-2 border-x border-orange-800 px-3">
                    <BookText className="min-w-[16px] w-4 min-h-[16px] h-4" />
                    <p>
                        Educating Today&apos;s Learners for Tomorrow&apos;s
                        world.
                    </p>
                </li>

                <li className="ml-8 flex items-center justify-center text-orange-600 gap-2 border-x border-orange-800 px-3">
                    <Smile className="min-w-[16px] w-4 min-h-[16px] h-4" />
                    <p>
                        You dared to Struggle Yesterday you can dare to win
                        Today
                    </p>
                </li>

                <li className="ml-8 flex items-center justify-center text-orange-600 gap-2 border-x border-orange-800 px-3">
                    <Building className="min-w-[16px] w-4 min-h-[16px] h-4" />
                    <p>
                        It Is With Great Pleasure That I Congratulate You On
                        Your Five Year Anniversary. Please Know That You Are
                        Important Members Of Our Team And Your abilities And
                        Contributions Will Be An Important Part Of Our Continued
                        Success. People Are And Will Always Be.
                    </p>
                </li>

                <li className="ml-8 flex items-center justify-center text-orange-600 gap-2 border-x border-orange-800 px-3">
                    <Brain className="min-w-[16px] w-4 min-h-[16px] h-4" />
                    <p>
                        IDEA--- All achievement, all earned riches, have their
                        beginning in an idea.
                    </p>
                </li>

                <li className="ml-8 flex items-center justify-center text-orange-600 gap-2 border-x border-orange-800 px-3">
                    <Lock className="min-w-[16px] w-4 min-h-[16px] h-4" />
                    <p>
                        Balance --- Balance is the key to everything. What we
                        do, think, say, eat, feel, they all require awareness
                        and through this awareness we can grow.
                    </p>
                </li>

                <li className="ml-8 flex items-center justify-center text-orange-600 gap-2 border-x border-orange-800 px-3">
                    <Hand className="min-w-[16px] w-4 min-h-[16px] h-4" />
                    <p>
                        UNITY--- We are each other&apos;s harvest; we are each
                        other&apos;s business; we are each other&apos;s
                        magnitude and bond.
                    </p>
                </li>
            </ReactMarquee>
        </motion.div>
    );
};

const HomeFamily: FC<{ family?: familyType[] }> = ({ family }) => {
    return (
        <motion.div
            initial={{
                y: 100,
                opacity: 0,
            }}
            whileInView={{
                y: 0,
                opacity: 1,
            }}
            transition={{
                duration: 1.3,
                ease: "easeInOut",
            }}
            className="w-full lg:w-[93%]  2xl:w-full mx-auto overflow-hidden lg:rounded-lg py-7 lg:py-9 px-1 sm:px-2 flex flex-col items-center relative rounded-lg border bg-background  md:shadow-xl"
        >
            <GridPattern
                width={30}
                height={30}
                x={-1}
                y={-1}
                className={cn(
                    "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
                )}
            />
            <SparklesText
                text="Our Family"
                className="text-2xl sm:text-3xl font-medium text-green-600 mb-7 uppercase border-b-2 pb-2 border-green-600"
                sparklesCount={5}
            />
            <ReactMarquee autoFill={true} pauseOnHover direction="right">
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
                            <div className="flex flex-col gap-1 font-semibold items-center text-xs uppercase">
                                <span className="text-rose-800">
                                    {user.name}
                                </span>
                                <span className="text-orange-600">
                                    {user.branch}
                                </span>
                            </div>
                        </div>
                    ),
                )}
            </ReactMarquee>
        </motion.div>
    );
};

export const FromDeskOf = () => {
    return (
        <motion.div
            initial={{
                y: 100,
                opacity: 0,
            }}
            whileInView={{
                y: 0,
                opacity: 1,
            }}
            transition={{
                duration: 1.3,
                ease: "easeInOut",
            }}
            className="bg-background rounded-lg border  md:shadow-xl w-full lg:w-[93%] 2xl:w-full relative overflow-hidden"
        >
            <GridPattern
                squares={[
                    [10, 10],
                    [12, 15],
                    [15, 10],
                    [10, 15],
                    [18, 15],
                    [15, 20],
                    [20, 20],
                    [11, 12],
                ]}
                className={cn(
                    "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
                    "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                )}
            />
            <div className="flex flex-col gap-4 justify-center items-center text-center py-7 px-4 lg:gap-12 lg:py-16">
                <SparklesText
                    text="From the Desk of Directors"
                    className="text-3xl font-normal uppercase text-zinc-900/75 border-b-2 border-zinc-500 pb-2"
                    colors={{ first: "green", second: "gray" }}
                />

                <div className="flex flex-col gap-4 w-full px-5 py-3 text-sm  lg:w-[70%] xl:text-lg">
                    <div
                        className={`text-left text-sm text-slate-900/75 px-2 leading-6 ${montserrat.className} flex flex-col gap-5 font-medium`}
                    >
                        <p>
                            Education is the most powerful weapon which can be
                            used to change the world. This is the only tool to
                            remove the darkness of ignorance from the society.
                            Information Technology has become the backbone off
                            all the productive activities today. It is not only
                            the fastest growing industry but it is the most
                            successful and most profitable industry also. For
                            this very purpose we have initiated a worldwide
                            program named Eklavaya Universal Private
                            Limited(EUPL).
                        </p>
                        <p>
                            Through this program we are imparting IT education
                            and IT enabled services through a worldwide
                            educational network. On the completion of successful
                            years of incredible performance.
                        </p>

                        <p>
                            Eklavaya Universal Private Limited(EUPL) is built on
                            a foundation to promote greater access to quality
                            higher education, cutting-edge research and
                            contribution to the society. EUPL provides generic
                            skills together with flexibility, adaptability and
                            passion for life-long learning. While simultaneously
                            equipping young people with the best basis for
                            carrers in any area, including industry and
                            unforeseen needs of the future.
                        </p>
                        <p>
                            I congratulate you on your decision to join EUPL to
                            pursue your higher education. Teaching-learning
                            process is not merely for profit it is for nation
                            building as well. EUPL with its associate distance
                            education provider universities/organizations will
                            strive together to cater to your academic needs and
                            see that you come out of your courses with flying
                            colors.
                        </p>

                        <p>
                            We wish you great success in all your endeavors and
                            quest for a better tomorrow, for yourselves and for
                            the mankind.
                        </p>
                    </div>

                    <div className="flex flex-col text-zinc-600">
                        <span className="self-end text-sm font-semibold mr-6">
                            Warm Regards
                        </span>
                        <span className="self-end text-sm font-semibold mr-6">
                            Director
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const WhySection = () => {
    return (
        <motion.div
            initial={{
                y: 100,
                opacity: 0,
            }}
            whileInView={{
                y: 0,
                opacity: 1,
            }}
            transition={{
                duration: 1.3,
                ease: "easeInOut",
            }}
            className="w-[93%] 2xl:w-full relative rounded-lg border bg-background md:shadow-xl overflow-hidden"
        >
            <GridPattern
                width={30}
                height={30}
                x={-1}
                y={-1}
                strokeDasharray={"4 2"}
                className={cn(
                    "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
                )}
            />
            <div className="flex flex-col gap-4 justify-center items-center text-center py-7 px-4 lg:gap-12 lg:py-16">
                <SparklesText
                    text="Why Eklavaya ?"
                    className="text-3xl font-normal uppercase text-zinc-900/75 border-b-2 border-zinc-500 pb-2"
                    colors={{ first: "green", second: "gray" }}
                />

                <p
                    className={`w-[90%] md:w-[60%] text-left text-sm text-slate-900/75 px-2 leading-6 ${montserrat.className} font-medium`}
                >
                    Our purpose as a company and services as the standard
                    against which we weight our action and dicisions. To
                    strengthen, sustain and professionalize business knowledge
                    through creative research and teaching, highlighting the
                    significance of learning and by collaborating with
                    organizations, institutions and universities both within and
                    well beyond the national boundaries.
                </p>
            </div>
        </motion.div>
    );
};

const OurFeatures = () => {
    return (
        <motion.div
            initial={{
                y: 100,
                opacity: 0,
            }}
            whileInView={{
                y: 0,
                opacity: 1,
            }}
            transition={{
                duration: 1.3,
                ease: "easeInOut",
            }}
            className={`w-[93%] 2xl:w-full flex flex-col justify-center items-center gap-10 rounded-lg py-10 h-full relative overflow-hidden border bg-background md:shadow-xl`}
        >
            <DotPattern className={cn("p-2")} />

            <SparklesText
                text="Our Features"
                className="text-3xl font-normal uppercase text-green-900/75 border-b-2 border-zinc-500 pb-2"
            />

            <div className="flex flex-col lg:flex-row justify-around m-auto w-fit gap-8 flex-wrap">
                {/* CARD ONE */}

                <CardContainer className="w-full h-full">
                    <CardBody className="w-full h-full">
                        <CardItem translateZ="50" className="w-full h-full">
                            <Card className="max-w-xs border bg-orange-50/50 dark:border-0 dark:text-black h-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-black/75">
                                        <BoxReveal
                                            boxColor={"orange"}
                                            duration={1}
                                        >
                                            <div className="flex items-center gap-2">
                                                <BookText className="w-4 h-4" />
                                                <p className="text-lg font-semibold">
                                                    Books
                                                    <span className="text-[#5046e6]">
                                                        .
                                                    </span>
                                                </p>
                                            </div>
                                        </BoxReveal>

                                        {/* <span className="text-lg">Books</span> */}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <BoxReveal
                                        boxColor={"orange"}
                                        duration={1.5}
                                    >
                                        <p className="text-sm text-zinc-800/80 font-medium">
                                            We Provide books, updated with
                                            latest technology.Our books help
                                            students to understand the concept
                                            of the topic very clearly. We revise
                                            our book&apos;s content time to time
                                            to ensure that our students get
                                            better quality of education.
                                        </p>
                                    </BoxReveal>
                                </CardContent>
                            </Card>
                        </CardItem>
                    </CardBody>
                </CardContainer>

                {/* CARD TWO */}
                <CardContainer className="w-full h-full">
                    <CardBody className="w-full h-full">
                        <CardItem translateZ="50" className="w-full h-full">
                            <Card className="max-w-xs bg-indigo-300/50 dark:border-0 dark:text-black">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-black/75">
                                        <BoxReveal
                                            boxColor={"#5046e6"}
                                            duration={1}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Folder className="w-4 h-4" />
                                                <p className="text-lg font-semibold">
                                                    Facilities
                                                    <span className="text-[#5046e6]">
                                                        .
                                                    </span>
                                                </p>
                                            </div>
                                        </BoxReveal>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <BoxReveal
                                        boxColor={"#5046e6"}
                                        duration={1.5}
                                    >
                                        <p className="text-sm text-zinc-800/80 font-medium">
                                            We provide unique and very user
                                            friendly Online facilities like
                                            Student Verification, I-Card
                                            Verification, Marksheet
                                            Verification, Certificate
                                            Verification & we also provide
                                            complete online management system
                                            for our franchise.
                                        </p>
                                    </BoxReveal>
                                </CardContent>
                            </Card>
                        </CardItem>
                    </CardBody>
                </CardContainer>

                {/* CARD THREE */}
                <CardContainer className="w-full h-full">
                    <CardBody className="w-full h-full">
                        <CardItem translateZ="50" className="w-full h-full">
                            <Card className="max-w-xs h-full bg-amber-300/30 dark:text-black dark:border-0">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-black/75">
                                        <BoxReveal
                                            boxColor={"yellow"}
                                            duration={1}
                                        >
                                            <div className="flex items-center gap-2">
                                                <BadgeCheck className="w-4 h-4" />
                                                <p className="text-lg font-semibold">
                                                    BETTER SUPPORT
                                                    <span className="text-[#5046e6]">
                                                        .
                                                    </span>
                                                </p>
                                            </div>
                                        </BoxReveal>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <BoxReveal
                                        boxColor={"orange"}
                                        duration={1.5}
                                    >
                                        <p className="text-sm text-zinc-800/80 font-medium">
                                            We provide better support system for
                                            our franchise , in order to solve
                                            any aspect of problems regarding the
                                            software uses.
                                        </p>
                                    </BoxReveal>
                                </CardContent>
                            </Card>
                        </CardItem>
                    </CardBody>
                </CardContainer>
            </div>
        </motion.div>
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
        <motion.div
            initial={{
                y: 100,
                opacity: 0,
            }}
            whileInView={{
                y: 0,
                opacity: 1,
            }}
            transition={{
                duration: 1.3,
                ease: "easeInOut",
            }}
            className={`w-[93%] 2xl:w-full flex flex-col justify-center items-center gap-10 rounded-lg  py-10 h-full relative overflow-hidden border bg-background md:shadow-xl`}
        >
            <DotPattern
                className={cn(
                    "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
                )}
            />
            <SparklesText
                text="Our Courses"
                className="text-3xl font-normal uppercase text-green-900/75 border-b-2 border-zinc-500 pb-2"
                sparklesCount={5}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-fit gap-4 h-fit">
                {courses?.map((course, idx) => (
                    <motion.div
                        key={idx}
                        initial={{
                            transform: "rotate(15deg)",
                            transformOrigin: "left bottom",
                            opacity: 0,
                        }}
                        whileInView={{
                            transform: "rotate(0deg)",
                            opacity: 1,
                        }}
                        transition={{
                            duration: 1.3,
                            ease: "easeInOut",
                        }}
                    >
                        <CardContainer>
                            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-72 h-fit rounded-xl p-2 border  ">
                                <CardItem translateZ="100" className="w-full">
                                    <Image
                                        src={course.url}
                                        height="1000"
                                        width="1000"
                                        className="h-60 w-full object-contain rounded-xl group-hover/card:shadow-xl"
                                        alt="thumbnail"
                                    />
                                </CardItem>
                            </CardBody>
                        </CardContainer>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};
