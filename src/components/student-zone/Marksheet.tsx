"use client";
import { FormEvent, useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { SearchTemplate } from "@/components/student-zone/searchTemplate";
import { MAX_WIDTH } from "@/lib/styles";
import { Button } from "@/components/ui/button";
import { printHandler } from "@/lib/printHandler";
import { downloadHandler } from "@/lib/pdfDownload";
import axios, { AxiosError } from "axios";

const MarkSheet = () => {
    const [registration, setRegistration] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const ref = useRef<HTMLCanvasElement>(null);
    const [marksheet, setMarksheet] = useState(false);

    const handleSearch = async (e: FormEvent) => {
        try {
            e.preventDefault();
            if (!registration || registration.length <= 6) return;
            setIsLoading(true);

            const { data } = await axios(
                `/api/assets/marksheet/?registration=${registration}`,
            );
            if (!!data?.png) {
                const canvas = ref.current!;
                const ctx = canvas.getContext("2d");
                const image = document.createElement("img");
                image.src = data?.png;
                image.onload = async () => {
                    canvas.width = image?.naturalWidth;
                    canvas.height = image?.naturalHeight;
                    ctx?.drawImage(image, 0, 0);
                    setMarksheet(true);
                };
            }
        } catch (error) {
            console.log(error);
            toast({
                description: (error as AxiosError<{ message: string }>)
                    ?.response?.data?.message,
            });
            ref.current
                ?.getContext("2d")
                ?.clearRect(0, 0, ref.current?.width!, ref.current?.height!);
            ref.current!.width = 0;
            ref.current!.height = 0;
            setMarksheet(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`w-full ${MAX_WIDTH} m-auto px-2 py-16`}>
            <div className="max-w-[363px] md:max-w-xl lg:min-w-[500px] m-auto">
                <SearchTemplate
                    title="MARKSHEET VERIFICATION"
                    registration={registration}
                    setRegistration={setRegistration}
                    searchFunc={handleSearch}
                    isLoading={isLoading}
                />
            </div>

            {marksheet && (
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
                                `marksheet_${registration}.pdf`,
                            )
                        }
                    >
                        Download
                    </Button>
                </div>
            )}
            <div className="w-full overflow-x-auto flex items-center justify-center">
                <canvas ref={ref} className="max-w-sm md:max-w-lg lg:max-w-2xl"></canvas>
            </div>
        </div>
    );
};

export default MarkSheet;
