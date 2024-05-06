"use client";
import { FormEvent, useRef, useState } from "react";
import qrcode from "qrcode";
import { toast } from "@/components/ui/use-toast";
import StudentStats from "@/lib/StudentStats";
import { SearchTemplate } from "@/components/student-zone/searchTemplate";
import { fetchStuddent } from "@/lib/fetchFunctions";
import { MAX_WIDTH } from "@/lib/styles";
import { Button } from "../ui/button";
import { printHandler } from "@/lib/printHandler";
import { downloadHandler } from "@/lib/pdfDownload";
import { format } from "date-fns";

const Certificate = () => {
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
            console.log(data);
            if (!!data?.message) {
                toast({ description: (data.message as string).toUpperCase() });
            }

            if (!data?.student?.certificate) {
                toast({ description: "NOT GENERATED" });
                return;
            } else {
                setStudent(true);
                const student = data.student;
                const canvas = ref.current!;
                const ctx = canvas.getContext("2d");
                const image = document.createElement("img");
                image.crossOrigin = "anonymous";
                image.src =
                    "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1712900605/ekavaya_assets/zeib4pejjzevocvlmg4j.jpg";
                image.onload = async () => {
                    canvas.width = image.naturalWidth;
                    canvas.height = image.naturalHeight;
                    // template
                    ctx?.drawImage(image, 0, 0);

                    // texts
                    ctx!.font = "bold 32px Arial";
                    ctx?.fillText(student.name, 600, 500); // name
                    ctx?.fillText(student.fatherName, 400, 560); // fname
                    ctx?.fillText(student?.Course?.name, 700, 630); // course
                    ctx?.fillText(student?.Branch?.branch, 550, 690); // branch
                    ctx?.fillText(student.branch, 350, 750); // branch code
                    ctx?.fillText("6 months", 750, 750); // duration
                    ctx?.fillText("Jan 2023", 1150, 750); // completed date
                    ctx?.fillText("A", 650, 815); // Grade

                    ctx!.font = "bold 22px Arial";
                    ctx?.fillText(
                        format(new Date(student.updatedAt), "dd/MM/yyyy"),
                        300,
                        900,
                    ); // date of creation

                    ctx?.fillText(`EUPL/${student.serialNumber}`, 1350, 185); // serial number
                    ctx?.fillText(student.registration, 1350, 265); // registration number

                    // qr
                    const CreateQR = async () => {
                        const createQR = new Promise((resolve) => {
                            qrcode.toDataURL(
                                `${{
                                    name: student.name,
                                    registration: student.registration,
                                    father: student.fatherName,
                                    mother: student.motherName,
                                    course: student.course,
                                    branch: student.branch,
                                    branchName: student?.Course?.name,
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
                                        ctx?.drawImage(qr, 760, 960, 80, 80);
                                        resolve(qr);
                                    };
                                },
                            );
                        });
                        await createQR;
                    };
                    await CreateQR();
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
                    title="CERTIFICATE VERIFICATION"
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
                                "l",
                            )
                        }
                    >
                        Download
                    </Button>
                </div>
            )}

            <div className="w-full overflow-x-auto">
                <canvas
                    ref={ref}
                    className="mx-auto max-w-2xl max-h-fit"
                ></canvas>
            </div>
        </div>
    );
};

export default Certificate;
