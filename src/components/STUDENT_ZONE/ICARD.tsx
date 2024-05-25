"use client";
import { FormEvent, useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { SearchTemplate } from "@/components/STUDENT_ZONE/SEARCH_TEMPLATE";
import { MAX_WIDTH } from "@/lib/STYLES";
import { Button } from "@/components/ui/button";
import { PRINT_HANDLER } from "@/lib/PRINT_HANDLER";
import { PDF_DOWNLOAD_HANDLER } from "@/lib/PDF_DOWNLOAD_HANDLER";

const ICard = () => {
    const [registration, setRegistration] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const ref = useRef<HTMLCanvasElement>(null);
    const [icard, setICard] = useState(false);

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();
        if (!registration || registration.length <= 6) return;
        setIsLoading(true);

        const canvas = ref.current!;
        const ctx = canvas.getContext("2d");
        const image = document.createElement("img");
        image.src = `/api/assets/icard/?registration=${registration}`;

        image.onerror = async (error) => {
            console.log(error);
            toast({ description: "Not Issued." });
            setIsLoading(false);
            ref.current
                ?.getContext("2d")
                ?.clearRect(0, 0, ref.current?.width!, ref.current?.height!);
            ref.current!.width = 0;
            ref.current!.height = 0;
            setICard(false);
        };

        image.onload = async () => {
            canvas.width = image?.naturalWidth;
            canvas.height = image?.naturalHeight;
            ctx?.drawImage(image, 0, 0);
            setICard(true);
            setIsLoading(false);
        };
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

            {!!icard && (
                <div className="w-full flex gap-4 justify-center items-center my-4">
                    <Button
                        variant={"primary"}
                        onClick={() => PRINT_HANDLER(ref.current!)}
                    >
                        Print
                    </Button>
                    <Button
                        variant={"primary"}
                        onClick={() =>
                            PDF_DOWNLOAD_HANDLER(
                                ref.current!,
                                `certificate_${registration}.pdf`,
                                "p",
                            )
                        }
                    >
                        Download
                    </Button>
                </div>
            )}
            <div className="w-full overflow-x-auto flex items-center justify-center">
                <canvas ref={ref} className="max-w-sm"></canvas>
            </div>
        </div>
    );
};

export default ICard;
