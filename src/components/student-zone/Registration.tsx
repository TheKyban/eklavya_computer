"use client";
import { Course, Marks, Student } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { fetchStuddent } from "@/lib/fetchFunctions";
import { SearchTemplate } from "@/components/student-zone/searchTemplate";
import { MAX_WIDTH } from "@/lib/styles";

const Registration = () => {
    const [registration, setRegistration] = useState("");
    const [data, setData] = useState<{
        student: Student & {
            Course: Course;
            Branch: {
                branch: string;
                userId: string;
            };
            marks?: Marks;
        };
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
            setData({ student: data?.student! });
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
                    title="REGISTRATION VERIFICATION"
                    registration={registration}
                    setRegistration={setRegistration}
                    searchFunc={handleSeach}
                    isLoading={isLoading}
                />

                {data?.student && (
                    <Card className="m-auto relative before:content-[' '] before:bg-[url('https://res.cloudinary.com/ddgjcyk0q/image/upload/v1712900852/ekavaya_assets/f5tpu1skpaewn1gp0e6g.png')] before:bg-no-repeat before:bg-cover before:min-w-[500px] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:opacity-50 bg-inherit py-4 overflow-auto mt-4">
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
                                            {data?.student?.Branch?.branch}
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
        </div>
    );
};

export default Registration;
