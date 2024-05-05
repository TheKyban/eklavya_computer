import { MAX_WIDTH, MIN_HEIGHT } from "@/lib/styles";
import Image from "next/image";

export default function Course() {
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
                            src={"/courseDetails/adit.adca.course.jpg"}
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
                            src={"/courseDetails/dca.cca.course.png"}
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
                            src={"/courseDetails/doa.dcp.course.jpg"}
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
                            src={"/courseDetails/hdit.hdca.course.jpg"}
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
                            src={"/courseDetails/design.pub.multimedia.jpg"}
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
                            src={"/courseDetails/com.mob.reparing.jpg"}
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
                            src={"/courseDetails/financial.account.jpg"}
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
                            src={"/courseDetails/short.course.png"}
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
