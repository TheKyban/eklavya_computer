"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

export default function About() {
    return (
        <div className="min-h-[calc(100vh-63px)] flex flex-col gap-6 bg-orange-50 w-full py-10 overflow-hidden px-3">
            <motion.div
                whileInView={{
                    y: 0,
                    opacity: 1,
                }}
                initial={{
                    y: -100,
                    opacity: 0,
                }}
                className="max-w-[1280px] m-auto flex flex-col items-center gap-8 bg-slate-200 rounded-lg px-10 max-h-96 lg:max-h-fit py-10"
            >
                <h1 className="text-2xl text-orange-600 font-semibold border-b-2 border-blue-400 py-4">
                    🤔 About The Academy
                </h1>
                <p className=" text-sm lg:text-lg text-clip overflow-y-auto h-full no-scrollbar">
                    Eklavaya global computer, is the biggest educational which
                    provides a great platform in IT sectors in India
                    sub-continent. It is An ISO-9001:2008 Certified Company
                    having mission to promote IT education and awareness to
                    provide strong plinth to construct their bright fruture ans
                    career. It is an independent to cater to the basic needs in
                    computer education. It is a matter of great proud and
                    pleasure that our country is a fast developing country in
                    economy, education, science & technology etc. India is a
                    large population which needs to enhance human capital in
                    developed country. In study conducted by World Bank it has
                    been found that the role of human capital in development is
                    far more important than physical capital. For India, it has
                    been estimated that access to at least 25% of the relevant
                    age group, between 17 to 23 in high education is necessary
                    to ensure development on a par with the needs of the day. In
                    this context EKLAVAYA GLOBAL COMPUTER, initiated a program
                    to provide IT education in various grades and courses to the
                    people of India sub-continent. AGC is committed to embracing
                    an inclusive quality assurance culture, and has developed a
                    number of policies and procedures to ensure that our courses
                    and services are the highest quality in the IT education and
                    training industry. Our organization is committed and
                    dedicated to achieve goal to maintain a learner focus in
                    providing accessible and quality education to directly
                    prepare our students for further study, or careers in the
                    I.T. and Business global economies. Now when different
                    reforms are taking place in the field of education in our
                    society students are contributing at the international
                    level, but the Centers for Higher Education are charging so
                    heavily that the common person are getting no benefits of
                    it. Therefore, we have taken a small step to enable those
                    weaker sections of the society who are unable to seek
                    asmission in those traing centers. Today we are having a
                    large range of Computer Centers in various states from where
                    many of students are earning name and fame after doing
                    different computer courses successfuly. Therefore walk into
                    our center for nomination and shake hands with us in this
                    efforts in the direction of the social welfare.
                </p>
            </motion.div>

            <div className="flex gap-6 max-w-[1280px] w-full m-auto  flex-wrap text-center lg:flex-nowrap">
                <motion.div
                    whileInView={{
                        x: 0,
                        opacity: 1,
                    }}
                    initial={{
                        x: -100,
                        opacity: 0,
                    }}
                    className="bg-teal-200 rounded-lg flex flex-col gap-5 py-8 items-center px-5"
                >
                    <h1 className="text-lg font-semibold border-b-2 border-orange-400 py-1">
                        🎯 Our Mission
                    </h1>
                    <p>
                        Our Roadmap starts with our mission, which is enduring.
                        It declares our purpose as a company and sevices as the
                        standard against which we weight our action and
                        dicisions. To strengthen, sustain and professionalize
                        business knowledge through creative research and
                        teaching, highlighting the significance of learning and
                        by collaborating with organizations, institutions and
                        universities both within and well beyond the national
                        boundaries.
                    </p>
                </motion.div>

                <motion.div
                    whileInView={{
                        x: 0,
                        opacity: 1,
                    }}
                    initial={{
                        x: 100,
                        opacity: 0,
                    }}
                    className="bg-teal-200 rounded-lg flex flex-col gap-5 py-8 items-center px-5"
                >
                    <h1 className="text-lg font-semibold border-b-2 border-orange-400 py-1">
                        👁️ Our Vision
                    </h1>
                    <p>
                        Our vision serves as the framework for our Roadmap and
                        guides every aspect of our bussiness by describing that
                        we need to accomplish in order to continue achieving
                        sustained quality to be an academic CENTER OF EXCELLENCE
                        in the area of computer education and a well-networked
                        institution committed towords delivering globally
                        competitive computer education, training and research to
                        individuals, corporates bodies, government organizations
                        and the society.
                    </p>
                </motion.div>
            </div>

            <div className="max-w-[1280px] m-auto flex flex-col gap-4 items-center py-4 rounded-lg bg-rose-100 w-full">
                <h1 className="text-2xl font-semibold border-b-2 border-red-600 p-2">
                    Certificates
                </h1>
                <Carousel
                    className="w-[80%] h-fit"
                    opts={{
                        align: "start",
                    }}
                >
                    <CarouselContent>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card className="max-w-xs">
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">
                                            1
                                        </span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card className="max-w-xs">
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">
                                            2
                                        </span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card className="max-w-xs">
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">
                                            3
                                        </span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card className="max-w-xs">
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">
                                            4
                                        </span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    );
}
