"use client";
import { LoadingCells } from "@/components/loading/loading";
import Pagination from "@/components/pagination/pagination";
import Search from "@/components/search/search";
import { Button } from "@/components/ui/button";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { ArrowLeft, UserCog } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const StudentVerification = ({
    searchParams,
    userId,
    header = false,
}: {
    searchParams: { page: string; registration: string };
    userId: string;
    header?: boolean;
}) => {
    const { data: session } = useSession();
    const router = useRouter();
    const queryclient = useQueryClient();
    const url = `${URL}/api/student/all/${userId}?page=${searchParams.page}${
        !!searchParams.registration
            ? "&formNumber=" + searchParams.registration
            : ""
    }`;
    const { data, isLoading } = useQuery({
        queryKey: [
            "student_verification",
            searchParams.page || "1",
            userId,
            searchParams.registration ? searchParams.registration : "",
        ],
        queryFn: async () => {
            const { data } = await axios.get(url);
            return data;
        },
    });

    const { mutate } = useMutation({
        mutationFn: async ({
            isVerified,
            formNumber,
        }: {
            isVerified: boolean;
            formNumber: string;
        }) => {
            const { data } = await axios.put(
                `${URL}/api/student/all/${userId}`,
                {
                    isVerified,
                    formNumber,
                }
            );
            return data;
        },

        onSuccess(data, variables, context) {
            queryclient.setQueryData(
                [
                    "student_verification",
                    searchParams.page || "1",
                    userId,
                    searchParams.registration ? searchParams.registration : "",
                ],
                (old: { total: number; students: Student[] }) => {
                    const students = old?.students.map((student) => {
                        return Number(student.formNumber) ===
                            Number(variables.formNumber)
                            ? {
                                  ...student,
                                  isVerified: !student.isVerified,
                              }
                            : student;
                    });
                    return { total: old.total, students };
                }
            );

            if (session?.user.userId === userId) {
                if (variables.isVerified) {
                    queryclient.setQueryData(
                        ["verified_list", "1", "none"],
                        (old: { total: number; students: Student[] }) => {
                            return {
                                total: old.total + 1,
                                students: [data.student, ...old.students],
                            };
                        }
                    );
                    queryclient.setQueryData(
                        ["pending_list", "1", "none"],
                        (old: { total: number; students: Student[] }) => {
                            const students = old?.students?.filter(
                                (student) => student.id !== data.student.id
                            );
                            return { total: old.total - 1, students };
                        }
                    );
                } else {
                    queryclient.setQueryData(
                        ["pending_list", "1", "none"],
                        (old: { total: number; students: Student[] }) => {
                            return {
                                total: old.total + 1,
                                students: [data.student, ...old.students],
                            };
                        }
                    );
                    queryclient.setQueryData(
                        ["verified_list", "1", "none"],
                        (old: { total: number; students: Student[] }) => {
                            const students = old?.students?.filter(
                                (student) => student.id !== data.student.id
                            );
                            return { total: old.total - 1, students };
                        }
                    );
                }
            }
        },
    });

    return (
        <div className="px-3 md:px-5 py-4 flex flex-col gap-4">
            {header && (
                <div className="flex items-center justify-between">
                    <Button
                        variant={"link"}
                        onClick={() =>
                            router.push("/dashboard/user?ToVerification=true")
                        }
                    >
                        <ArrowLeft />
                    </Button>
                    <div className="flex items-center justify-center gap-3">
                        <span className="font-semibold uppercase">USER:</span>
                        <span>{userId}</span>
                    </div>
                </div>
            )}
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
                            data?.students?.map((student: Student) => (
                                <TableRow
                                    key={student.formNumber}
                                    className={poppins.className}
                                >
                                    <TableCell className="font-medium text-xs md:text-sm">
                                        {student.formNumber}
                                    </TableCell>
                                    <TableCell className="text-xs md:text-sm">
                                        {student.name}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-xs md:text-sm">
                                        {student.fatherName}
                                    </TableCell>
                                    <TableCell className="hidden xl:table-cell text-xs md:text-sm">
                                        {student.motherName}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell text-xs md:text-sm">
                                        {format(new Date(student.dor), "PP")}
                                    </TableCell>
                                    <TableCell className="text-xs md:text-sm">
                                        {student.course}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Checkbox
                                            defaultChecked={student.isVerified}
                                            id={student.formNumber}
                                            className="box-content"
                                            onCheckedChange={(value) =>
                                                mutate({
                                                    isVerified:
                                                        value as boolean,
                                                    formNumber:
                                                        student.formNumber,
                                                })
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <Pagination total={data?.total} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default StudentVerification;
