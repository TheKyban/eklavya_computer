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
            className={`${MAX_WIDTH} m-auto w-full xl:mt-2 flex flex-col justify-center items-center gap-5 lg:gap-8`}
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

const HomeFamily: FC<{ family?: familyType[] }> = ({ family }) => {
    return (
        <div className="w-full lg:w-[93%]  2xl:w-full mx-auto overflow-hidden bg-orange-100 lg:rounded-lg py-7 lg:py-9 px-1 sm:px-5 flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-semibold text-green-600 mb-7 uppercase border-b-2 pb-2 border-green-600">
                Our Family
            </span>
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
        </div>
    );
};

const NoticeSection = () => {
    return (
        <ReactMarquee className="text-sm bg-black py-3" pauseOnHover>
            <li
                className="ml-4 flex items-center justify-center  gap-2 text-white"
                key={1}
            >
                <BookText className="min-w-[16px] w-4 min-h-[16px] h-4" />
                <p>Admission is Going On...</p>
            </li>

            <li
                className="ml-4 flex gap-2 items-center justify-center text-white"
                key={2}
            >
                <Contact className="min-w-[16px] w-4 min-h-[16px] h-4" />
                <p>Contact for Franchisee Opening.</p>
            </li>

            <li
                className="ml-4 flex items-center justify-center text-white gap-2"
                key={3}
            >
                <GraduationCap className="min-w-[16px] w-4 min-h-[16px] h-4" />
                <p>Educate Your Dreams</p>
            </li>

            <li
                className="ml-4 flex items-center justify-center gap-2 text-white"
                key={4}
            >
                <Target className="min-w-[16px] w-4 min-h-[16px] h-4" />
                <p>Life+ Academics+ Creativity =Success</p>
            </li>

            <li
                className="ml-4 flex items-center justify-center text-white gap-2"
                key={5}
            >
                <BookText className="min-w-[16px] w-4 min-h-[16px] h-4" />
                <p>
                    Educating Today&apos;s Learners for Tomorrow&apos;s world.
                </p>
            </li>

            <li
                className="ml-4 flex items-center justify-center text-white gap-2"
                key={6}
            >
                <Smile className="min-w-[16px] w-4 min-h-[16px] h-4" />
                <p>You dared to Struggle Yesterday you can dare to win Today</p>
            </li>

            <li
                className="ml-4 flex items-center justify-center text-white gap-2"
                key={7}
            >
                <Building className="min-w-[16px] w-4 min-h-[16px] h-4" />
                <p>
                    It Is With Great Pleasure That I Congratulate You On Your
                    Five Year Anniversary. Please Know That You Are Important
                    Members Of Our Team And Your abilities And Contributions
                    Will Be An Important Part Of Our Continued Success. People
                    Are And Will Always Be.
                </p>
            </li>

            <li
                className="ml-4 flex items-center justify-center text-white gap-2"
                key={7}
            >
                <Brain className="min-w-[16px] w-4 min-h-[16px] h-4" />
                <p>
                    IDEA--- All achievement, all earned riches, have their
                    beginning in an idea.
                </p>
            </li>

            <li
                className="ml-4 flex items-center justify-center text-white gap-2"
                key={7}
            >
                <Lock className="min-w-[16px] w-4 min-h-[16px] h-4" />
                <p>
                    Balance --- Balance is the key to everything. What we do,
                    think, say, eat, feel, they all require awareness and
                    through this awareness we can grow.
                </p>
            </li>

            <li
                className="ml-4 flex items-center justify-center text-white gap-2"
                key={7}
            >
                <Hand className="min-w-[16px] w-4 min-h-[16px] h-4" />
                <p>
                    UNITY--- We are each other&apos;s harvest; we are each
                    other&apos;s business; we are each other&apos;s magnitude
                    and bond.
                </p>
            </li>
        </ReactMarquee>
    );
};

const FromDeskOf = () => {
    return (
        <div className="bg-orange-100 lg:rounded-lg w-full lg:w-[93%] 2xl:w-full">
            <div className="flex flex-col gap-4 justify-center items-center text-center py-7 px-4 lg:gap-12 lg:py-16">
                <span className="text-3xl font-semibold uppercase text-zinc-600 border-b-2 border-zinc-500 pb-2 ">
                    From the Desk of Directors
                </span>

                <div className="flex flex-col gap-4 w-full px-5 py-3 text-sm  lg:w-[70%] xl:text-lg dark:text-zinc-700">
                    <div
                        className={`text-left text-sm text-slate-900/75 px-2 leading-6 ${montserrat.className} flex flex-col gap-5 font-medium`}
                    >
                        <p>
                            Education is the most powerful weapon which can be
                            used to change the world. This is the only tool to
                            remove the darkness of ignornce from the society.
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
                            carrers inany area, including industry and
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
        </div>
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
            className="bg-orange-100 rounded-lg w-[93%] 2xl:w-full"
        >
            <div className="flex flex-col gap-4 justify-center items-center text-center py-7 px-4 lg:gap-12 lg:py-16">
                <span className="text-3xl font-semibold text-zinc-600  border-b-2 border-zinc-600 pb-3 uppercase">
                    Why Eklavaya ?
                </span>

                <p
                    className={`w-[90%] md:w-[60%] text-left text-sm text-slate-900/75 px-2 leading-6 ${montserrat.className} font-medium`}
                >
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
            className={`w-[93%] 2xl:w-full flex flex-col justify-center items-center gap-10 bg-orange-100 rounded-lg py-10 h-full`}
        >
            <span className="text-3xl font-semibold text-green-600 border-b-2 border-green-600 pb-2 uppercase">
                Our Features
            </span>
            <div className="flex flex-col lg:flex-row justify-around m-auto w-fit gap-8 flex-wrap">
                {/* CARD ONE */}

                <CardContainer className="w-full h-full">
                    <CardBody className="w-full h-full">
                        <CardItem translateZ="50" className="w-full h-full">
                            <Card className="max-w-xs bg-orange-300 dark:border-0 dark:text-black h-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-black/75">
                                        <BookText className="w-4 h-4" />
                                        <span className="text-lg">Books</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-zinc-800/80 font-medium">
                                        We Provide books, updated with latest
                                        technology.Our books help students to
                                        understand the concept of the topic very
                                        clearly. We revise our book&apos;s
                                        content time to time to ensure that our
                                        students get better quality of
                                        education.
                                    </p>
                                </CardContent>
                            </Card>
                        </CardItem>
                    </CardBody>
                </CardContainer>

                {/* CARD TWO */}
                <CardContainer className="w-full h-full">
                    <CardBody className="w-full h-full">
                        <CardItem translateZ="50" className="w-full h-full">
                            <Card className="max-w-xs bg-indigo-300 dark:border-0 dark:text-black">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-black/75">
                                        <Folder className="w-4 h-4" />
                                        <span className="text-lg">
                                            Facilities
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-zinc-800/80 font-medium">
                                        We provide unique and very user friendly
                                        Online facilities like Student
                                        Verification, I-Card Verification,
                                        Marksheet Verification, Certificate
                                        Verification & we also provide complete
                                        online management system for our
                                        franchise.
                                    </p>
                                </CardContent>
                            </Card>
                        </CardItem>
                    </CardBody>
                </CardContainer>

                {/* CARD THREE */}
                <CardContainer className="w-full h-full">
                    <CardBody className="w-full h-full">
                        <CardItem translateZ="50" className="w-full h-full">
                            <Card className="max-w-xs h-full bg-amber-300 dark:text-black dark:border-0">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-black/75">
                                        <BadgeCheck className="w-4 h-4" />
                                        <span className="text-lg">
                                            BETTER SUPPORT
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-zinc-800/80 font-medium">
                                        We provide better support system for our
                                        franchise , in order to solve any aspect
                                        of problems regarding the software uses.
                                    </p>
                                </CardContent>
                            </Card>
                        </CardItem>
                    </CardBody>
                </CardContainer>
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
            className={`w-[93%] 2xl:w-full flex flex-col justify-center items-center gap-10 bg-orange-100 rounded-lg  py-10 h-full`}
        >
            <span className="text-3xl font-semibold text-green-600 border-b-2 border-green-600 pb-2 uppercase">
                Our Courses
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-fit gap-4 h-fit">
                {courses?.map((course, idx) => (
                    <CardContainer key={idx}>
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

                    // <AnimationDiv
                    //     key={course.name}
                    //     whileInView={{
                    //         x: 0,
                    //         y: 0,
                    //         opacity: 1,
                    //     }}
                    //     initial={{
                    //         x:
                    //             idx === 0 || idx === 3 || idx === 6
                    //                 ? -100
                    //                 : idx === 1 || idx === 4 || idx === 7
                    //                   ? 0
                    //                   : 100,
                    //         y: idx === 1 || idx === 4 || idx === 7 ? 100 : 0,
                    //         opacity: 0,
                    //     }}
                    //     transition={{
                    //         duration: 0.3,
                    //     }}
                    //     className="relative group overflow-hidden rounded-lg"
                    // >
                    //     <Image
                    //         src={course.url}
                    //         width={130}
                    //         height={130}
                    //         className="transition-all group-hover:scale-110 rounded-lg w-36 h-36"
                    //         alt={course.name}
                    //     />
                    //     <div className="transition-all flex text-white invisible opacity-0 group-hover:visible  group-hover:opacity-100 items-center justify-center absolute bg-black/50 top-0 bottom-0 left-0 right-0">
                    //         <span className="border-2 uppercase border-red-600 px-5 py-3 rounded-md cursor-pointer">
                    //             More
                    //         </span>
                    //     </div>
                    // </AnimationDiv>
                ))}
            </div>
        </div>
    );
};
