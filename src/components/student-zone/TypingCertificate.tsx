"use client";
import { FormEvent, useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { SearchTemplate } from "@/components/student-zone/searchTemplate";
import { MAX_WIDTH } from "@/lib/styles";
import { Button } from "../ui/button";
import { printHandler } from "@/lib/printHandler";
import { downloadHandler } from "@/lib/pdfDownload";
import axios, { AxiosError } from "axios";

const TypingCertificate = () => {
    const [registration, setRegistration] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const ref = useRef<HTMLCanvasElement>(null);
    const [typingCertificate, setTypingCertificate] = useState(false);

    const handleSearch = async (e: FormEvent) => {
        try {
            e.preventDefault();
            if (!registration || registration.length <= 6) return;
            setIsLoading(true);

            const { data } = await axios(
                `/api/assets/typingCertificate/?registration=${registration}`,
            );
            if (!!data?.png) {
                setTypingCertificate(true);

                const canvas = ref.current!;
                const ctx = canvas.getContext("2d");
                const image = document.createElement("img");
                image.src = data?.png;
                image.onload = async () => {
                    canvas.width = image?.naturalWidth;
                    canvas.height = image?.naturalHeight;
                    ctx?.drawImage(image, 0, 0);
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
            setTypingCertificate(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`w-full ${MAX_WIDTH} m-auto px-2 py-16`}>
            <div className="max-w-[363px] md:max-w-xl lg:min-w-[500px] m-auto">
                <SearchTemplate
                    title="TYPING CERTIFICATE VERIFICATION"
                    registration={registration}
                    setRegistration={setRegistration}
                    searchFunc={handleSearch}
                    isLoading={isLoading}
                />
            </div>

            {typingCertificate && (
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
                                `typingCertificate_${registration}.pdf`,
                                "l",
                            )
                        }
                    >
                        Download
                    </Button>
                </div>
            )}

            <div className="w-full overflow-x-auto flex items-center justify-center">
                <canvas ref={ref}></canvas>
            </div>
        </div>
    );
};

export default TypingCertificate;