import { MAX_WIDTH, MIN_HEIGHT } from "@/lib/STYLES";
import Image from "next/image";

export default async function Course() {
    return (
        <div
            className={`${MIN_HEIGHT} py-4 m-auto ${MAX_WIDTH} w-full text-center`}
        >
            <div className="w-full h-full flex flex-col gap-5">
                <h1 className="text-xl uppercase font-bold text-white bg-red-500 py-3">
                    Our Courses
                </h1>

                <div className="flex w-full h-full items-center justify-center flex-wrap gap-5">
                    <div className="w-fit rounded-lg py-4 px-3 bg-pink-200 flex flex-col gap-3 items-center justify-center">
                        <h4 className="text-lg font-bold text-pink-800">
                            ADIT & ADCA
                        </h4>
                        <Image
                            src={
                                "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1717414531/course_details/bjgeqkk1rhmtg5fmdlke.jpg"
                            }
                            height={300}
                            width={300}
                            alt="course"
                            className="rounded-lg"
                        />
                    </div>
                    <div className="w-fit rounded-lg py-4 px-3 bg-gray-300 flex flex-col gap-3 items-center justify-center">
                        <h4 className="text-lg font-bold text-zinc-700">
                            DCA & CCA
                        </h4>
                        <Image
                            src={
                                "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1717414533/course_details/yfzetxkyzd2w8nt4lrbz.png"
                            }
                            height={300}
                            width={400}
                            alt="course"
                            className="rounded-lg"
                        />
                    </div>
                    <div className="w-fit rounded-lg py-4 px-3 bg-pink-200 flex flex-col gap-3 items-center justify-center">
                        <h4 className="text-lg font-bold text-pink-900">
                            DOA & DCP
                        </h4>
                        <Image
                            src={
                                "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1717414532/course_details/rlcdyrquxllrm9yxjztj.jpg"
                            }
                            height={300}
                            width={300}
                            alt="course"
                            className="rounded-lg"
                        />
                    </div>
                    <div className="w-fit rounded-lg py-4 px-3 bg-orange-200 flex flex-col gap-3 items-center justify-center">
                        <h4 className="text-lg font-bold text-pink-900">
                            HDIT & HDCA
                        </h4>
                        <Image
                            src={
                                "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1717414532/course_details/qjnvxsuwjo9pz4sqqnxo.jpg"
                            }
                            height={300}
                            width={300}
                            alt="course"
                            className="rounded-lg"
                        />
                    </div>
                    <div className="w-fit rounded-lg py-4 px-3 bg-blue-100 flex flex-col gap-3 items-center justify-center">
                        <h4 className="text-lg font-bold text-yellow-700">
                            DTP & PDDTP
                        </h4>
                        <Image
                            src={
                                "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1717414532/course_details/g5bhsl6edjjmaelvojpo.jpg"
                            }
                            height={300}
                            width={300}
                            alt="course"
                            className="rounded-lg"
                        />
                    </div>
                    <div className="w-fit rounded-lg py-4 px-3 bg-red-100 flex flex-col gap-3 items-center justify-center">
                        <h4 className="text-lg font-bold text-yellow-700">
                            DHT & DHN & MRC
                        </h4>
                        <Image
                            src={
                                "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1717414531/course_details/fuj1ja28tfsjpmcv5gai.jpg"
                            }
                            height={300}
                            width={300}
                            alt="course"
                            className="rounded-lg"
                        />
                    </div>
                    <div className="w-fit rounded-lg py-4 px-3 bg-pink-100 flex flex-col gap-3 items-center justify-center">
                        <h4 className="text-lg font-bold text-yellow-700">
                            DFA & CFA
                        </h4>
                        <Image
                            src={
                                "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1717414532/course_details/cmpjrceiwphe5a7cou23.jpg"
                            }
                            height={300}
                            width={300}
                            alt="course"
                            className="rounded-lg"
                        />
                    </div>
                    <div className="w-fit rounded-lg py-4 px-3 bg-pink-100 flex flex-col gap-3 items-center justify-center">
                        <h4 className="text-lg font-bold text-yellow-700">
                            SHORT TERM
                        </h4>
                        <Image
                            src={
                                "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1717414537/course_details/g66zqolpjubdhnzqsmin.png"
                            }
                            height={300}
                            width={500}
                            alt="course"
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
