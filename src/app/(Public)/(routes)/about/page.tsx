"use client";
import { Footer } from "@/components/Home/footer";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { MAX_WIDTH, MIN_HEIGHT } from "@/lib/styles";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

export default function About() {
    return (
        <>
            <div
                className={`${MIN_HEIGHT} flex flex-col gap-6 bg-orange-50 text-black w-full py-5 overflow-hidden px-3`}
            >
                {/* CERTIFICATES */}

                <motion.div
                    whileInView={{
                        x: 0,
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.5,
                        easings: "tween",
                        ease: "easeInOut",
                        delay: 0.1,
                    }}
                    viewport={{
                        once: true,
                    }}
                    initial={{
                        x: -100,
                        opacity: 0,
                    }}
                    className={`${MAX_WIDTH} m-auto flex flex-col gap-4 items-center py-4 w-full bg-orange-200`}
                >
                    <h1 className="text-2xl font-semibold border-b-2 border-red-600 p-2">
                        CERTIFICATES
                    </h1>
                    <Carousel
                        className="w-[80%] h-fit"
                        opts={{
                            align: "start",
                        }}
                        plugins={[
                            Autoplay({
                                delay: 3000,
                                stopOnInteraction: false,
                            }),
                        ]}
                    >
                        <CarouselContent>
                            {Array(4)
                                .fill(" ")
                                .map((c, idx) => (
                                    <CarouselItem
                                        className="grid place-content-center"
                                        key={idx}
                                    >
                                        <Card className="min-w-[30vw]  min-h-[500px] w-full h-full grid place-content-center">
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                <span className="text-4xl font-semibold">
                                                    {idx + 1}
                                                </span>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                ))}
                        </CarouselContent>
                        <CarouselPrevious className="dark:text-white" />
                        <CarouselNext className="dark:text-white" />
                    </Carousel>
                </motion.div>

                {/* ABOUT THE ACADEMY */}

                <motion.div
                    whileInView={{
                        x: 0,
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.5,
                        easings: "tween",
                        ease: "easeInOut",
                        delay: 0.2,
                    }}
                    viewport={{
                        once: true,
                    }}
                    initial={{
                        x: 100,
                        opacity: 0,
                    }}
                    className={`${MAX_WIDTH} m-auto flex flex-col items-center gap-8 bg-orange-200 px-10 max-h-96 lg:max-h-fit py-10`}
                >
                    <h1 className="text-2xl text-orange-600 font-semibold border-b-2 border-blue-400 py-4">
                        🤔 About The Academy
                    </h1>
                    <p className=" text-sm lg:text-base text-clip overflow-y-auto h-full no-scrollbar">
                        Eklavaya global computer, is the biggest educational
                        which provides a great platform in IT sectors in India
                        sub-continent. It is An ISO-9001:2008 Certified Company
                        having mission to promote IT education and awareness to
                        provide strong plinth to construct their bright fruture
                        ans career. It is an independent to cater to the basic
                        needs in computer education. It is a matter of great
                        proud and pleasure that our country is a fast developing
                        country in economy, education, science & technology etc.
                        India is a large population which needs to enhance human
                        capital in developed country. In study conducted by
                        World Bank it has been found that the role of human
                        capital in development is far more important than
                        physical capital. For India, it has been estimated that
                        access to at least 25% of the relevant age group,
                        between 17 to 23 in high education is necessary to
                        ensure development on a par with the needs of the day.
                        In this context EKLAVAYA GLOBAL COMPUTER, initiated a
                        program to provide IT education in various grades and
                        courses to the people of India sub-continent. AGC is
                        committed to embracing an inclusive quality assurance
                        culture, and has developed a number of policies and
                        procedures to ensure that our courses and services are
                        the highest quality in the IT education and training
                        industry. Our organization is committed and dedicated to
                        achieve goal to maintain a learner focus in providing
                        accessible and quality education to directly prepare our
                        students for further study, or careers in the I.T. and
                        Business global economies. Now when different reforms
                        are taking place in the field of education in our
                        society students are contributing at the international
                        level, but the Centers for Higher Education are charging
                        so heavily that the common person are getting no
                        benefits of it. Therefore, we have taken a small step to
                        enable those weaker sections of the society who are
                        unable to seek asmission in those traing centers. Today
                        we are having a large range of Computer Centers in
                        various states from where many of students are earning
                        name and fame after doing different computer courses
                        successfuly. Therefore walk into our center for
                        nomination and shake hands with us in this efforts in
                        the direction of the social welfare.
                    </p>
                </motion.div>

                <div
                    className={`flex gap-6 ${MAX_WIDTH} w-full m-auto  flex-wrap text-center lg:flex-nowrap`}
                >
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
                        className="bg-orange-200 flex flex-col gap-5 py-8 items-center px-5"
                    >
                        <h1 className="text-lg font-semibold border-b-2 border-orange-400 py-1">
                            🎯 Our Mission
                        </h1>
                        <p>
                            Our Roadmap starts with our mission, which is
                            enduring. It declares our purpose as a company and
                            sevices as the standard against which we weight our
                            action and dicisions. To strengthen, sustain and
                            professionalize business knowledge through creative
                            research and teaching, highlighting the significance
                            of learning and by collaborating with organizations,
                            institutions and universities both within and well
                            beyond the national boundaries.
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
                        className="bg-orange-200 flex flex-col gap-5 py-8 items-center px-5"
                    >
                        <h1 className="text-lg font-semibold border-b-2 border-orange-400 py-1">
                            👁️ Our Vision
                        </h1>
                        <p>
                            Our vision serves as the framework for our Roadmap
                            and guides every aspect of our bussiness by
                            describing that we need to accomplish in order to
                            continue achieving sustained quality to be an
                            academic CENTER OF EXCELLENCE in the area of
                            computer education and a well-networked institution
                            committed towords delivering globally competitive
                            computer education, training and research to
                            individuals, corporates bodies, government
                            organizations and the society.
                        </p>
                    </motion.div>
                </div>
            </div>
            {/*
             * FOOTER
             */}

            <Footer />
        </>
    );
}
