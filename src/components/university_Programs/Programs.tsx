import { MAX_WIDTH } from "@/lib/styles";
import Image from "next/image";

export default function UniversityProgramgs() {
    return (
        <div className={`w-full ${MAX_WIDTH} m-auto px-2 py-16`}>
            <div className="flex flex-wrap justify-center items-center gap-5">
                <div className="w-fit rounded-lg py-4 px-3 bg-orange-200 flex flex-col gap-3 items-center justify-center">
                    <Image
                        src={
                            "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1713171931/university_programs/a2maizy1kzoboh9xwyiy.jpg"
                        }
                        width={300}
                        height={300}
                        alt="programs"
                        className="rounded"
                    />
                </div>
                <div className="w-fit rounded-lg py-4 px-3 bg-orange-200 flex flex-col gap-3 items-center justify-center">
                    <Image
                        src={
                            "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1713171927/university_programs/kteoeijkzggzhrickmv1.jpg"
                        }
                        width={300}
                        height={300}
                        alt="programs"
                        className="rounded"
                    />
                </div>
            </div>
        </div>
    );
}
