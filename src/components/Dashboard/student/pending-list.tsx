"use client";
import Pagination from "@/components/pagination/pagination";
import Search from "@/components/search/search";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { poppins } from "@/lib/fonts";
import { Student } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Pen, Trash } from "lucide-react";
import { UserCog } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { LoadingCells } from "@/components/loading/loading";
import { useModal } from "@/hooks/use-modal-store";
import { format } from "date-fns";

const StudentPendingList = ({
    searchParams,
}: {
    searchParams: { page: string; registration: string };
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [students, setStudents] = useState<Student[]>([]);
    const [total, setTotal] = useState(0);
    const { onOpen } = useModal();
    const url = `http://localhost:3000/api/student?&pending=true&page=${
        searchParams.page
    }${
        !!searchParams.registration
            ? "&registration=" + searchParams.registration
            : ""
    }`;

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const {
                    data: { total, students },
                } = await axios.get(url);
                setStudents(students);
                setTotal(total);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [url]);

    return (
        <div className="px-5 py-4 flex flex-col gap-4">
            <div className="flex justify-between">
                <h1 className="flex items-center gap-3 lg:text-xl uppercase font-semibold text-teal-700">
                    <UserCog className="text-red-600 w-5 h-5" />
                    Pending Student
                </h1>
                <Search
                    className="w-44"
                    placeholder="Registration"
                    queryName="registration"
                />
            </div>

            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Registration</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Father Name</TableHead>
                            <TableHead>Mother Name</TableHead>
                            <TableHead className="hidden md:table-cell">
                                Date of Addmission
                            </TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead className="text-right">Tool</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading && <LoadingCells />}

                        {!isLoading &&
                            students?.map((student: Student) => (
                                <TableRow
                                    key={student.registration}
                                    className={poppins.className}
                                >
                                    <TableCell className="font-medium">
                                        {student.registration}
                                    </TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.fatherName}</TableCell>
                                    <TableCell>{student.motherName}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {format(new Date(student.dor), "PP")}
                                    </TableCell>
                                    <TableCell>{student.course}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant={"outline"}
                                            onClick={() =>
                                                onOpen("editStudent", {
                                                    student,
                                                })
                                            }
                                            className="px-2 py-0"
                                        >
                                            <Pen className="w-5 h-5" />
                                        </Button>
                                        <Button
                                            variant={"outline"}
                                            onClick={() =>
                                                onOpen("deleteStudent", {
                                                    student,
                                                })
                                            }
                                            className="ml-2 px-2 py-0"
                                        >
                                            <Trash className="w-5 h-5" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <Pagination total={total} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default StudentPendingList;
