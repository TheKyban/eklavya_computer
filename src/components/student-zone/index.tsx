import { Student } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { FC, FormEvent, useState } from "react";
import jsPdf from "jspdf";
import { Button } from "@/components/ui/button";
import qrcode from "qrcode";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { Loader } from "lucide-react";

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
            if (!!data?.message) {
                toast({ description: (data.message as string).toUpperCase() });
            }

            if (!data?.student.certificate) {
                toast({ description: "NOT GENERATED" });
                return;
            } else {
                toast({ description: "Certificate will available soon." });
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
                image.src = "/samples/sample_mark.jpg";
                image.onload = async () => {
                    canvas.width = image.naturalWidth;
                    canvas.height = image.naturalHeight;
                    // template
                    ctx?.drawImage(image, 0, 0);

                    // texts
                    ctx!.font = "bold 14px Arial";
                    ctx?.fillText(data?.student.name, 240, 240); // name
                    ctx?.fillText(data?.student.motherName, 240, 265); // Mname
                    ctx?.fillText(data?.student.fatherName, 240, 287); // fname
                    ctx?.fillText(data?.student.course, 240, 310); // course
                    ctx?.fillText("6 months", 240, 335); // course
                    ctx?.fillText(data?.student.branchName, 240, 360); // course
                    ctx?.fillText(data?.student.branch, 240, 385); // course

                    ctx?.fillText(
                        data?.student?.written?.toString()!,
                        530,
                        610
                    ); // course
                    ctx?.fillText(
                        data?.student?.practical?.toString()!,
                        530,
                        637
                    ); // course
                    ctx?.fillText(
                        data?.student?.project?.toString()!,
                        530,
                        664
                    ); // course
                    ctx?.fillText(data?.student?.viva?.toString()!, 530, 690);

                    // qr
                    const CreateQR = async () => {
                        const createQR = new Promise((resolve) => {
                            qrcode.toDataURL(
                                `${{
                                    name: data?.student.name,
                                    registration: data?.student.formNumber,
                                    father: data?.student.fatherName,
                                    mother: data?.student.motherName,
                                    course: data?.student.course,
                                    branch: data?.student.branch,
                                    branchName: data?.student?.branchName,
                                }}`,
                                { width: 80, margin: 1 },
                                (er, url) => {
                                    const qr = document.createElement("img");
                                    qr.src = url;
                                    qr.onload = async () => {
                                        ctx?.drawImage(qr, 530, 50, 80, 80);
                                        resolve(qr);
                                    };
                                }
                            );
                        });
                        await createQR;
                    };
                    await CreateQR();

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
