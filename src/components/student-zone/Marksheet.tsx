"use client";
import { FormEvent, useRef, useState } from "react";
import qrcode from "qrcode";
import { toast } from "@/components/ui/use-toast";
import StudentStats from "@/lib/StudentStats";
import { SearchTemplate } from "@/components/student-zone/searchTemplate";
import { fetchStuddent } from "@/lib/fetchStudent";
import { MAX_WIDTH } from "@/lib/styles";
import { Button } from "@/components/ui/button";
import { printHandler } from "@/lib/printHandler";
import { downloadHandler } from "@/lib/pdfDownload";

export const MarkSheet = () => {
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

            if (
                data?.student?.course === "Computer Typing" ||
                (data?.student?.course !== "Computer Typing" &&
                    (!data?.student?.viva ||
                        !data?.student?.written ||
                        !data?.student?.project ||
                        !data?.student?.practical))
            ) {
                toast({ description: "NOT GENERATED" });
                return;
            } else if (
                data?.student?.course !== "Computer Typing" &&
                !!data?.student?.viva &&
                !!data?.student?.written &&
                !!data?.student?.project &&
                !!data?.student?.practical
            ) {
                setStudent(true);
                const canvas = ref.current!;
                const ctx = canvas.getContext("2d");
                const image = document.createElement("img");
                image.crossOrigin = "anonymous";
                image.src =
                    "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1712900605/ekavaya_assets/g9la6ysdljkrjr9fssz5.jpg";
                image.onload = async () => {
                    ctx?.clearRect(0, 0, canvas.width, canvas.height);
                    canvas.width = image.naturalWidth;
                    canvas.height = image.naturalHeight;
                    // template
                    ctx?.drawImage(image, 0, 0);

                    const student = data?.student;
                    // qr

                    const CreateQR = async () => {
                        const createQR = new Promise((resolve) => {
                            qrcode.toDataURL(
                                `${{
                                    name: student.name,
                                    registration: student.formNumber,
                                    father: student.fatherName,
                                    mother: student.motherName,
                                    course: student.course,
                                    branch: student.branch,
                                    branchName: student?.branchName,
                                }}`,
                                {
                                    width: 80,
                                    margin: 0,
                                    color: {
                                        light: "#fff7ed",
                                    },
                                },
                                (er, url) => {
                                    const qr = document.createElement("img");
                                    qr.src = url;
                                    qr.onload = async () => {
                                        ctx?.drawImage(qr, 927, 100, 80, 80);
                                        resolve(qr);
                                    };
                                }
                            );
                        });
                        await createQR;
                    };
                    await CreateQR();

                    // candidate details
                    ctx!.font = "bold 20px Arial";
                    ctx?.fillText(`EUPL/${student.serialNumber}`, 180, 268); // serial number
                    ctx?.fillText(`${student.formNumber}`, 880, 268); // serial number

                    ctx!.font = "bold 24px Arial";
                    ctx?.fillText(student.name, 380, 410); // name
                    ctx?.fillText(student.motherName, 380, 450); // Mname
                    ctx?.fillText(student.fatherName, 380, 490); // fname
                    ctx?.fillText(student.course, 380, 530); // course
                    ctx?.fillText("6 months", 380, 570); // duration
                    ctx?.fillText(student.branchName, 380, 610); // branch
                    ctx?.fillText(student.branch, 380, 650); // branch

                    const studentStats = new StudentStats(
                        [
                            student.written!,
                            student.practical!,
                            student.project!,
                            student.viva!,
                        ],
                        400
                    );

                    // full marks
                    ctx?.fillText("100", 420, 1003); // written
                    ctx?.fillText("100", 420, 1043); // practical
                    ctx?.fillText("100", 420, 1090); // project
                    ctx?.fillText("100", 420, 1130); // viva

                    // pass marks
                    ctx?.fillText("40", 610, 1003); // written
                    ctx?.fillText("40", 610, 1043); // practical
                    ctx?.fillText("40", 610, 1090); // project
                    ctx?.fillText("40", 610, 1130); // viva

                    // marks
                    ctx?.fillText(student?.written?.toString()!, 830, 1003); // written
                    ctx?.fillText(student?.practical?.toString()!, 830, 1043); // practical
                    ctx?.fillText(student?.project?.toString()!, 830, 1090); // project
                    ctx?.fillText(student?.viva?.toString()!, 830, 1130); // viva

                    // stats
                    ctx?.fillText(
                        `${studentStats.getPercentage()}%`,
                        420,
                        1200
                    );
                    ctx?.fillText(studentStats.getPerformance(), 850, 1201);
                };
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
                    title="MARKSHEET VERIFICATION"
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
                                `marksheet_${registration}.pdf`
                            )
                        }
                    >
                        Download
                    </Button>
                </div>
            )}

            <div className="w-full overflow-x-auto">
                <canvas ref={ref} className="mx-auto"></canvas>
            </div>
        </div>
    );
};