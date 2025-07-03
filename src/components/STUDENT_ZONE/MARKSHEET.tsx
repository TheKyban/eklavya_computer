"use client";
import { FormEvent, useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { SearchTemplate } from "@/components/STUDENT_ZONE/SEARCH_TEMPLATE";
import { MAX_WIDTH } from "@/lib/STYLES";
import { Button } from "@/components/ui/button";
import { PRINT_HANDLER } from "@/lib/PRINT_HANDLER";
import { PDF_DOWNLOAD_HANDLER } from "@/lib/PDF_DOWNLOAD_HANDLER";
import axios from "axios";
import { MARKSHEET_IMAGE, MOHAR_IMAGE } from "@/lib/ASSETS";
import { DOCUMENT_SIZES } from "@/lib/CONSTANTS";
import { formatInTimeZone } from "date-fns-tz";
import qrcode from "qrcode";
import STUDENT_STATS from "@/lib/STUDENT_STATS";

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
            const { data } = await axios(`/api/student/${registration}`);

            if (data.success == false) {
                toast({ description: "Not Issued." });
                return;
            }
            const student = data.student;
            const canvas = ref.current!;
            const ctx = canvas.getContext("2d")!;
            const background = new Image();
            background.crossOrigin = "anonymous";
            background.src = MARKSHEET_IMAGE;

            background.onload = async () => {
                // Set canvas size based on defined document dimensions
                canvas.width = DOCUMENT_SIZES.MARKSHEET.width;
                canvas.height = DOCUMENT_SIZES.MARKSHEET.height;

                // Draw background image
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                // Draw student image
                const studentImg = new Image();
                studentImg.crossOrigin = "anonymous";
                studentImg.src = student.img;
                studentImg.onload = () => {
                    ctx.drawImage(studentImg, canvas.width - 180, 273, 80, 80);
                };

                // Draw QR Code
                const qrimage = await qrcode.toDataURL(
                    `registration: ${student.registration}; name: ${student.name}; fatherName: ${student.fatherName}; course: ${student.Course.name}`,
                    {
                        width: 80,
                        margin: 0,
                        color: {
                            light: "#fff7ed",
                        },
                    },
                );
                const qrcodeImage = new Image();
                qrcodeImage.crossOrigin = "anonymous";
                qrcodeImage.src = qrimage;
                qrcodeImage.onload = () => {
                    ctx.drawImage(qrcodeImage, canvas.width - 400, 980, 80, 80);
                };

                // Draw Mohar
                const moharImage = new Image();
                moharImage.crossOrigin = "anonymous";
                moharImage.src = MOHAR_IMAGE;
                moharImage.onload = () => {
                    ctx.drawImage(
                        moharImage,
                        canvas.width - 230,
                        960,
                        130,
                        130,
                    );
                };

                // Write Text
                ctx.fillStyle = "black";
                ctx.font = "600 16px sans-serif";

                // Serial No & Registration
                ctx.fillText(`EUPL/${student.serialNumber}`, 130, 186);
                ctx.fillText(student.registration, 593, 186);

                // Student Info
                ctx.fillText(student.name.toUpperCase(), 280, 286);
                ctx.fillText(student.motherName.toUpperCase(), 280, 313);
                ctx.fillText(student.fatherName.toUpperCase(), 280, 340);
                ctx.fillText(
                    `${student.Course.name} ( ${student.Course.fullName} )`,
                    280,
                    370,
                );
                ctx.fillText(student.Course.duration, 280, 396);
                ctx.fillText(student.Branch.branch, 280, 423);
                ctx.fillText(student.branch, 280, 453);

                // Course Modules
                ctx.font = "bold 15px NotoSerif";
                ctx.fillStyle = "black";

                const maxWidth = 690;
                const lineHeight = 19;
                let x = 60;
                let y = 515;

                // Normalize tabs and split into module lines
                const rawModules = student.Course.modules
                    .replace(/\t+/g, " ")
                    .split("\n");

                for (const rawLine of rawModules) {
                    const line = rawLine.trim();
                    if (!line) continue;

                    const colonIndex = line.indexOf(":");
                    if (colonIndex === -1) {
                        // Fallback for lines without colon
                        ctx.fillText(line, x, y);
                        y += lineHeight;
                        continue;
                    }

                    const title = line.substring(0, colonIndex + 1).trim(); // e.g., "M1 DCA :"
                    const content = line.substring(colonIndex + 1).trim(); // description

                    const fullText = `${title} ${content}`;
                    const words = fullText.split(/\s+/);
                    let buffer = "";

                    for (let i = 0; i < words.length; i++) {
                        const testLine = buffer + words[i] + " ";
                        const testWidth = ctx.measureText(testLine).width;

                        if (testWidth > maxWidth && buffer) {
                            ctx.fillText(buffer.trim(), x, y);
                            buffer = words[i] + " ";
                            y += lineHeight;
                        } else {
                            buffer = testLine;
                        }
                    }

                    if (buffer.trim()) {
                        ctx.fillText(buffer.trim(), x, y);
                        y += lineHeight;
                    }
                }

                // Full & Pass Marks
                ctx.font = "600 16px sans-serif";
                [705, 737, 769, 801].forEach((top) => {
                    ctx.fillText("100", 300, top); // Full
                    ctx.fillText("40", 434, top); // Pass
                });

                // Marks Obtained
                ctx.fillText(
                    String(student.marks.marks.written),
                    canvas.width - 170,
                    705,
                );
                ctx.fillText(
                    String(student.marks.marks.practical),
                    canvas.width - 170,
                    737,
                );
                ctx.fillText(
                    String(student.marks.marks.project),
                    canvas.width - 170,
                    769,
                );
                ctx.fillText(
                    String(student.marks.marks.viva),
                    canvas.width - 170,
                    801,
                );

                // Stats
                const studentStats = new STUDENT_STATS(
                    [
                        student.marks.marks.practical,
                        student.marks.marks.project,
                        student.marks.marks.viva,
                        student.marks.marks.written,
                    ],
                    400,
                );
                ctx.fillText(`${studentStats.getPercentage()}%`, 300, 850);
                ctx.fillText(studentStats.getPerformance(), 600, 853);

                // Date of Issue
                ctx.fillText(
                    formatInTimeZone(
                        student.marksheet.date,
                        "Asia/Kolkata",
                        "dd/MM/yyyy",
                    ),
                    180,
                    985,
                );

                setMarksheet(true);
                setIsLoading(false);
                setRegistration("");
            };

            background.onerror = (err) => {
                console.error(err);
                toast({ description: "Certificate template not loaded" });
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvas.width = 0;
                canvas.height = 0;
                setMarksheet(false);
                setIsLoading(false);
            };
        } catch (error) {
            console.log(error);
        } finally {
            setMarksheet(false);
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
                        onClick={() => PRINT_HANDLER(ref.current!)}
                    >
                        Print
                    </Button>

                    <Button
                        variant={"primary"}
                        onClick={() =>
                            PDF_DOWNLOAD_HANDLER(
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
                <canvas
                    ref={ref}
                    className="max-w-sm md:max-w-lg lg:max-w-2xl"
                ></canvas>
            </div>
        </div>
    );
};

export default MarkSheet;
