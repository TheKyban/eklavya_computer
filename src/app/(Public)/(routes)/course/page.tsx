import { MAX_WIDTH, MIN_HEIGHT } from "@/lib/styles";
import Image from "next/image";

export default function Course() {
    return (
        <div
            className={`${MIN_HEIGHT} py-4 m-auto ${MAX_WIDTH} w-full text-center`}
        >
            <div className="w-full h-full flex flex-col gap-5">
                <h1 className="text-3xl uppercase font-bold text-white bg-red-500 py-3">
                    Our Courses
                </h1>

                <div className="flex w-full h-full items-center justify-center flex-col gap-5">
                    <div className="w-full rounded-lg py-7 bg-pink-200 flex flex-col gap-3 items-center justify-center">
                        <h4 className="text-2xl font-bold text-pink-800">
                            ADIT & ADCA
                        </h4>
                        <Image
                            src={"/courseDetails/adit.adca.course.jpg"}
                            height={300}
                            width={600}
                            alt="course"
                            className="rounded-lg"
                        />
                    </div>
                    <div className="w-full rounded-lg py-7 bg-gray-300 flex flex-col gap-3 items-center justify-center">
                        <h4 className="text-2xl font-bold text-zinc-700">
                            DCA & CCA
                        </h4>
                        <Image
                            src={"/courseDetails/dca.cca.course.png"}
                            height={300}
                            width={800}
                            alt="course"
                            className="rounded-lg"
                        />
                    </div>
                    <div className="w-full rounded-lg py-7 bg-pink-200 flex flex-col gap-3 items-center justify-center">
                        <h4 className="text-2xl font-bold text-pink-900">
                            DOA & DCP
                        </h4>
                        <Image
                            src={"/courseDetails/doa.dcp.course.jpg"}
                            height={300}
                            width={650}
                            alt="course"
                            className="rounded-lg"
                        />
                    </div>
                    <div className="w-full rounded-lg py-7 bg-orange-200 flex flex-col gap-3 items-center justify-center">
                        <h4 className="text-2xl font-bold text-pink-900">
                            HDIT & HDCA
                        </h4>
                        <Image
                            src={"/courseDetails/hdit.hdca.course.jpg"}
                            height={300}
                            width={650}
                            alt="course"
                            className="rounded-lg"
                        />
                    </div>
                    <div className="w-full rounded-lg py-7 bg-blue-100 flex flex-col gap-3 items-center justify-center">
                        <h4 className="text-2xl font-bold text-yellow-700">
                            DTP & PDDTP
                        </h4>
                        <Image
                            src={"/courseDetails/design.pub.multimedia.jpg"}
                            height={300}
                            width={650}
                            alt="course"
                            className="rounded-lg"
                        />
                    </div>
                    <div className="w-full rounded-lg py-7 bg-red-100 flex flex-col gap-3 items-center justify-center">
                        <h4 className="text-2xl font-bold text-yellow-700">
                            DHT & DHN & MRC
                        </h4>
                        <Image
                            src={"/courseDetails/com.mob.reparing.jpg"}
                            height={300}
                            width={700}
                            alt="course"
                            className="rounded-lg"
                        />
                    </div>
                    <div className="w-full rounded-lg py-7 bg-pink-100 flex flex-col gap-3 items-center justify-center">
                        <h4 className="text-2xl font-bold text-yellow-700">
                            DFA & CFA
                        </h4>
                        <Image
                            src={"/courseDetails/financial.account.jpg"}
                            height={300}
                            width={700}
                            alt="course"
                            className="rounded-lg"
                        />
                    </div>
                    <div className="w-full rounded-lg py-7 bg-pink-100 flex flex-col gap-3 items-center justify-center">
                        <h4 className="text-2xl font-bold text-yellow-700">
                            SHORT TERM
                        </h4>
                        <Image
                            src={"/courseDetails/short.course.png"}
                            height={300}
                            width={900}
                            alt="course"
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
