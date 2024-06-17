import { MAX_WIDTH } from "@/lib/STYLES";
import Image from "next/image";
import { Prisma } from "../../../prisma/prisma";

export default async function UniversityProgramgs() {
    const images = await Prisma.universityPrograms.findMany();
    return (
        <div className={`w-full ${MAX_WIDTH} m-auto px-2 py-16`}>
            <div className="flex flex-wrap justify-center items-center gap-5">
                {images?.map((image) => (
                    <div
                        key={image.id}
                        className="w-fit rounded-lg py-4 px-3 bg-orange-200 flex flex-col gap-3 items-center justify-center"
                    >
                        <Image
                            src={image?.url}
                            width={300}
                            height={300}
                            alt="programs"
                            className="rounded"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
