"use client";
import { LoadingCells } from "@/components/loading/loading";
import Pagination from "@/components/pagination/pagination";
import Search from "@/components/search/search";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { URL } from "@/lib/constants";
import { poppins } from "@/lib/fonts";
import { Student } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { UserCog } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

const StudentVerification = ({
    searchParams,
    userId,
}: {
    searchParams: { page: string; registration: string };
    userId: string;
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [students, setStudents] = useState<Student[]>([]);
    const [total, setTotal] = useState(0);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const url = `${URL}/api/student/all/${userId}?page=${
                searchParams.page
            }${
                !!searchParams.registration
                    ? "&formNumber=" + searchParams.registration
                    : ""
            }`;
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
    }, [setStudents, searchParams, userId]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const changeHandler = (isVerified: boolean, formNumber: string) => {
        try {
            axios.put(`${URL}/api/student/all/${userId}`, {
                isVerified,
                formNumber,
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="px-3 md:px-5 py-4 flex flex-col gap-4">
            <div className="flex justify-between px-1">
                <h1 className="flex items-center gap-2 md:gap-3 text-sm lg:text-xl uppercase font-semibold text-teal-700">
                    <UserCog className="text-red-600 w-6 h-6" />
                    Student Verification
                </h1>
                <Search
                      className="w-36 md:w-44"
                    placeholder="Registration"
                    queryName="registration"
                />
            </div>

            <div className="w-full overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Registration</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="hidden md:table-cell">
                                Father Name
                            </TableHead>
                            <TableHead className="hidden xl:table-cell">
                                Mother Name
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Date of Addmission
                            </TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead className="text-left md:text-center">
                                Verified
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading && <LoadingCells />}

                        {!isLoading &&
                            students?.map((student: Student) => (
                                <TableRow
                                    key={student.formNumber}
                                    className={poppins.className}
                                >
                                    <TableCell className="font-medium text-xs md:text-sm">
                                        {student.formNumber}
                                    </TableCell>
                                    <TableCell className="text-xs md:text-sm">{student.name}</TableCell>
                                    <TableCell className="hidden md:table-cell text-xs md:text-sm">
                                        {student.fatherName}
                                    </TableCell>
                                    <TableCell className="hidden xl:table-cell text-xs md:text-sm">
                                        {student.motherName}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell text-xs md:text-sm">
                                        {format(new Date(student.dor), "PP")}
                                    </TableCell>
                                    <TableCell className="text-xs md:text-sm">{student.course}</TableCell>
                                    <TableCell className="text-center">
                                        <Checkbox
                                            defaultChecked={student.isVerified}
                                            id={student.formNumber}
                                            className="box-content"
                                            onCheckedChange={(value) =>
                                                changeHandler(
                                                    value as boolean,
                                                    student.formNumber
                                                )
                                            }
                                        />
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

export default StudentVerification;
