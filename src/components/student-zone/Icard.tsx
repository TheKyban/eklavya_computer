"use client";
import { FormEvent, useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { SearchTemplate } from "./searchTemplate";
import { fetchStuddent } from "@/lib/fetchStudent";
import { MAX_WIDTH } from "@/lib/styles";
import { Button } from "../ui/button";
import { printHandler } from "@/lib/printHandler";
import { downloadHandler } from "@/lib/pdfDownload";

const ICard = () => {
    const [registration, setRegistration] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [student, setStudent] = useState(false);
    const ref = useRef<HTMLCanvasElement>(null);

    const handleSearch = async (e: FormEvent) => {
        try {
            e.preventDefault();
            if (!registration || registration.length <= 6) return;
            setIsLoading(true);
            const data = await fetchStuddent(registration);
            if (!!data?.message) {
                toast({ description: (data.message as string).toUpperCase() });
            }

            if (!data?.student?.isVerified) {
                toast({ description: "NOT VERIFIED." });
                return;
            } else {
                toast({ description: "Icard will available soon." });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`w-full ${MAX_WIDTH} m-auto px-2 py-16`}>
            <div className="max-w-[363px] md:max-w-xl lg:min-w-[500px] m-auto">
                <SearchTemplate
                    title="I-CARD VERIFICATION"
                    registration={registration}
                    setRegistration={setRegistration}
                    searchFunc={handleSearch}
                    isLoading={isLoading}
                />
            </div>

            {student && (
                <div className="w-full flex gap-4 justify-center items-center my-4">
                    <Button
                        variant={"primary"}
                        onClick={() => printHandler(ref.current!)}
                    >
                        Print
                    </Button>
                    <Button
                        variant={"primary"}
                        onClick={() =>
                            downloadHandler(
                                ref.current!,
                                `certificate_${registration}.pdf`,
                                "l"
                            )
                        }
                    >
                        Download
                    </Button>
                </div>
            )}

            <div className="w-full overflow-x-auto">
                <canvas ref={ref} className="mx-auto max-w-4xl"></canvas>
            </div>
        </div>
    );
};

export default ICard;
