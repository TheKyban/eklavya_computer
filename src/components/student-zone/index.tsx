import { Student } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { FC, FormEvent, useState } from "react";
import jsPdf, { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import qrcode from "qrcode";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { Loader } from "lucide-react";
import { format } from "date-fns";
import StudentStats from "@/lib/StudentStats";

const SearchTemplate: FC<{
    searchFunc: (e: FormEvent) => void;
    title: string;
    registration: string;
    setRegistration: (val: string) => void;
    isLoading: boolean;
}> = ({ searchFunc, title, registration, setRegistration, isLoading }) => {
    return (
        <Card className="bg-transparent">
            <CardHeader>
                <CardTitle className="uppercase text-red-600 text-xl md:text-2xl">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={searchFunc} className="flex flex-col gap-5">
                    <Input
                        placeholder="Registration no."
                        value={registration}
                        onChange={(e) => setRegistration(e.target.value)}
                        className="bg-white dark:focus:ring-offset-white"
                        autoFocus
                    />
                    <Button
                        variant={"destructive"}
                        disabled={isLoading}
                        className="w-full"
                        type="submit"
                    >
                        {isLoading ? (
                            <Loader className="animate-spin" />
                        ) : (
                            "Search"
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

const fetchStuddent = async (registration: string) => {
    const { data } = await axios.get<{
        message: string;
        student: Student & {
            branchName: string;
        };
    }>(`/api/student/${registration}`);

    return data;
};

export const ICard = () => {
    const [registration, setRegistration] = useState("");
    const [isLoading, setIsLoading] = useState(false);
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
        <SearchTemplate
            title="I-CARD VERIFICATION"
            registration={registration}
            setRegistration={setRegistration}
            searchFunc={handleSearch}
            isLoading={isLoading}
        />
    );
};

export const Certificate = () => {
    const [registration, setRegistration] = useState("");
    const [isLoading, setIsLoading] = useState(false);
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

            if (!data?.student.certificate) {
                toast({ description: "NOT GENERATED" });
                return;
            } else {
                const student = data.student;
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                const image = document.createElement("img");
                image.src = "/eklavya_cert3.jpg";
                image.onload = async () => {
                    canvas.width = image.naturalWidth;
                    canvas.height = image.naturalHeight;
                    // template
                    ctx?.drawImage(image, 0, 0);

                    // texts
                    ctx!.font = "bold 32px Arial";
                    ctx?.fillText(student.name, 600, 500); // name
                    ctx?.fillText(student.fatherName, 400, 560); // fname
                    ctx?.fillText(student.course, 700, 630); // course
                    ctx?.fillText(student.branchName, 550, 690); // branch
                    ctx?.fillText(student.branch, 350, 750); // branch code
                    ctx?.fillText("6 months", 750, 750); // duration
                    ctx?.fillText("Jan 2023", 1150, 750); // completed date
                    ctx?.fillText("A", 650, 815); // Grade

                    ctx!.font = "bold 22px Arial";
                    ctx?.fillText(
                        format(new Date(student.updatedAt), "dd/MM/yyyy"),
                        300,
                        900
                    ); // date of creation

                    ctx?.fillText(`EUPL/${student.serialNumber}`, 1350, 185); // serial number
                    ctx?.fillText(student.formNumber, 1350, 265); // registration number

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
                                        ctx?.drawImage(qr, 760, 960, 80, 80);
                                        resolve(qr);
                                    };
                                }
                            );
                        });
                        await createQR;
                    };
                    await CreateQR();
                    const doc = new jsPDF({
                        orientation: "l",
                        compress: true,
                    });
                    const width = doc.internal.pageSize.getWidth();
                    const height = doc.internal.pageSize.getHeight();
                    doc.addImage(canvas, "", 0, 0, width, height);
                    doc.output("dataurlnewwindow", {
                        filename: `certificate_${student.formNumber}.pdf`,
                    });
                };
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SearchTemplate
            title="CERTIFICATE VERIFICATION"
            registration={registration}
            setRegistration={setRegistration}
            searchFunc={handleSearch}
            isLoading={isLoading}
        />
    );
};

export const MarkSheet = () => {
    const [registration, setRegistration] = useState("");
    const [isLoading, setIsLoading] = useState(false);
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
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                const image = document.createElement("img");
                image.src = "/eklavya_mark.jpg";
                image.onload = async () => {
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

                    //  Download
                    const doc = new jsPdf({ orientation: "p" });
                    var width = doc.internal.pageSize.getWidth();
                    var height = doc.internal.pageSize.getHeight();
                    doc.addImage(canvas, "", 0, 0, width, height);
                    doc.output("dataurlnewwindow", {
                        filename: `marksheet-${data?.student?.formNumber}.pdf`,
                    });
                };
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SearchTemplate
            title="MARKSHEET VERIFICATION"
            registration={registration}
            setRegistration={setRegistration}
            searchFunc={handleSearch}
            isLoading={isLoading}
        />
    );
};

export const RegistrationVerify = () => {
    const [registration, setRegistration] = useState("");
    const [data, setData] = useState<{
        student: Student & { branchName: string };
    }>();
    const [isLoading, setIsLoading] = useState(false);

    /**
     * FUNCTION FOR SEARCH
     */

    const handleSeach = async (e: FormEvent) => {
        e?.preventDefault();
        if (!registration) return;
        try {
            setIsLoading(true);

            const data = await fetchStuddent(registration);

            if (!!data?.message) {
                toast({ description: (data.message as string).toUpperCase() });
            }
            setData(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div>
            <SearchTemplate
                title="REGISTRATION VERIFICATION"
                registration={registration}
                setRegistration={setRegistration}
                searchFunc={handleSeach}
                isLoading={isLoading}
            />

            {data?.student && (
                <Card className="m-auto relative before:content-[' '] before:bg-[url('/logomen.png')] before:bg-no-repeat before:bg-cover before:min-w-[500px] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:opacity-50 bg-inherit py-4 overflow-auto mt-4">
                    <CardContent className="min-w-[500px]">
                        <Image
                            src={data?.student?.img}
                            height={100}
                            width={100}
                            alt="profile img"
                        />
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-semibold">
                                        Registration
                                    </TableCell>
                                    <TableCell>{registration}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-semibold">
                                        Name
                                    </TableCell>
                                    <TableCell className="capitalize">
                                        {data?.student?.name}
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className="font-semibold">
                                        Father&apos;s Name
                                    </TableCell>
                                    <TableCell className="capitalize">
                                        {data?.student?.fatherName}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-semibold">
                                        Course
                                    </TableCell>
                                    <TableCell>
                                        {data?.student?.course}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-semibold">
                                        Branch Name
                                    </TableCell>
                                    <TableCell className="capitalize">
                                        {data?.student?.branchName}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-semibold">
                                        Branch Code
                                    </TableCell>
                                    <TableCell>
                                        {data?.student?.branch}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
