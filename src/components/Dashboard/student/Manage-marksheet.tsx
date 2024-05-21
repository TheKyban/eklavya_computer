"use client";
import { LoadingCells } from "@/components/loading/loading";
import Pagination from "@/components/pagination/pagination";
import Search from "@/components/search/search";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { useMarksheet } from "@/hooks/useFetch";
import { per_page } from "@/lib/CONSTANTS";
import { poppins } from "@/lib/FONTS";
import { StudentWithMarksCourse } from "@/lib/TYPES";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Layers3, Shield, Users } from "lucide-react";
import { FC, useState } from "react";

interface pageProps {
    page: string;
    registration: string;
    branches: { branch: string; userId: string }[];
}

const ManageMarksheet: FC<pageProps> = ({ page, registration, branches }) => {
    const [user, setUser] = useState(branches?.[0]?.userId);
    const [type, setType] = useState<boolean>(false);

    const { data: fetchStudents, isLoading } = useMarksheet({
        page,
        pending: type,
        registration,
        userId: user,
    });

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationKey: ["mutateMarksheetVerification"],
        mutationFn: async ({ registration }: { registration: string }) => {
            const { data } = await axios.put(`/api/management/marksheet`, {
                registration,
            });
            return data;
        },
        onError: (error) => {
            console.log(error);
            toast({ description: error?.message });
        },

        onSuccess(data, variables) {
            if (data) {
                toast({ description: data?.message });
            }

            try {
                // remove data
                queryClient.setQueryData(
                    [
                        type ? "pending_marksheet" : "verified_marksheet",
                        page,
                        registration,
                        user,
                    ],
                    (oldData: {
                        students: StudentWithMarksCourse[];
                        total: number;
                    }) => {
                        const students = oldData.students?.filter(
                            (student) =>
                                student?.registration !==
                                data?.student?.registration,
                        );

                        return { total: oldData.total - 1, students };
                    },
                );

                //Add To other type
                queryClient.setQueryData(
                    [
                        !type ? "pending_marksheet" : "verified_marksheet",
                        page,
                        registration,
                        user,
                    ],
                    (oldData: {
                        students: StudentWithMarksCourse[];
                        total: number;
                    }) => {
                        const students = [data?.student, ...oldData?.students];

                        return { total: oldData.total + 1, students };
                    },
                );
            } catch (error) {
                console.log("Error in Place Switch");
            }
        },
    });

    return (
        <div className="w-screen lg:w-full h-full px-5 flex flex-col gap-4">
            <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                    <Layers3 className="text-indigo-400" />
                    <span className="text-zinc-800 text-lg lg:text-2xl font-semibold">
                        Manage Marksheet
                    </span>
                </div>
                <Search
                    className="w-32 md:w-44"
                    placeholder="Registration"
                    queryName="registration"
                />
            </div>

            <div className="w-full flex flex-wrap gap-5">
                {/* Users */}
                <div className="flex flex-col gap-2">
                    <div className="flex gap-1 items-center">
                        <Users className="w-5 h-5 text-teal-500" />
                        <span>USER ID</span>
                    </div>
                    <Select
                        defaultValue={user}
                        value={user}
                        onValueChange={(val) => setUser(val)}
                        disabled={isPending}
                    >
                        <SelectTrigger className="w-36">
                            <SelectValue placeholder="Select User" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {branches?.map((branch) => (
                                    <SelectItem
                                        key={branch.userId}
                                        value={branch.userId}
                                    >
                                        {branch.userId}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Type */}
                <div className="flex flex-col gap-2">
                    <div className="flex gap-1 items-center">
                        <Shield className="text-rose-500 w-5 h-5" />
                        <span>Type</span>
                    </div>
                    <Select
                        defaultValue={`${type}`}
                        value={`${type}`}
                        disabled={isPending}
                        onValueChange={(val) =>
                            setType(val === "true" ? true : false)
                        }
                    >
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>courses</SelectLabel>
                                <SelectItem value="true">PENDING</SelectItem>
                                <SelectItem value="false">ISSUED</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Table>
                {/* TABLE HEADER */}
                <TableHeader>
                    <TableRow>
                        {fetchStudents?.students?.[0]?.registration && (
                            <TableHead>Registration No.</TableHead>
                        )}
                        {fetchStudents?.students?.[0]?.name && (
                            <TableHead>Name</TableHead>
                        )}
                        {fetchStudents?.students?.[0]?.course && (
                            <TableHead>Course</TableHead>
                        )}
                        {fetchStudents?.students?.[0]?.marks?.marks
                            ?.written && <TableHead>Written</TableHead>}
                        {fetchStudents?.students?.[0]?.marks?.marks?.viva && (
                            <TableHead className="hidden md:table-cell">
                                Viva
                            </TableHead>
                        )}
                        {fetchStudents?.students?.[0]?.marks?.marks
                            ?.practical && <TableHead>Practical</TableHead>}
                        {fetchStudents?.students?.[0]?.marks?.marks
                            ?.project && <TableHead>Projects</TableHead>}
                        {fetchStudents?.students?.[0]?.marks?.typingMarks
                            ?.englishTyping && <TableHead>English</TableHead>}
                        {fetchStudents?.students?.[0]?.marks?.typingMarks
                            ?.hindiTyping && <TableHead>Hindi</TableHead>}
                        {fetchStudents?.students?.[0] && (
                            <TableHead className="text-center">Issue</TableHead>
                        )}
                    </TableRow>
                </TableHeader>
                {/* TABLE BODY */}
                <TableBody>
                    {/* SHIMMER */}
                    {isLoading && <LoadingCells rows={6} cols={6} />}
                    {!isLoading &&
                        fetchStudents?.students?.map((student) => (
                            /**
                             * TABLE ROW
                             */
                            <TableRow
                                key={student.registration}
                                className={poppins.className}
                            >
                                {student?.registration && (
                                    <TableCell className="font-medium">
                                        {student?.registration}
                                    </TableCell>
                                )}

                                {student?.name && (
                                    <TableCell className="font-medium">
                                        {student?.name}
                                    </TableCell>
                                )}

                                {student?.course && (
                                    <TableCell className="font-medium">
                                        {student?.Course?.name}
                                    </TableCell>
                                )}

                                {student?.marks?.marks?.written && (
                                    <TableCell className="font-medium">
                                        {student?.marks?.marks?.written}
                                    </TableCell>
                                )}

                                {student?.marks?.marks?.viva && (
                                    <TableCell>
                                        {student?.marks?.marks?.viva}
                                    </TableCell>
                                )}

                                {student?.marks?.marks?.practical && (
                                    <TableCell className="hidden md:table-cell">
                                        {student?.marks?.marks?.practical}
                                    </TableCell>
                                )}

                                {student?.marks?.marks?.project && (
                                    <TableCell>
                                        {student?.marks?.marks?.project}
                                    </TableCell>
                                )}

                                {student?.marks?.typingMarks?.englishTyping && (
                                    <TableCell>
                                        {
                                            student?.marks?.typingMarks
                                                ?.englishTyping
                                        }
                                    </TableCell>
                                )}
                                {student?.marks?.typingMarks?.hindiTyping && (
                                    <TableCell>
                                        {
                                            student?.marks?.typingMarks
                                                ?.hindiTyping
                                        }
                                    </TableCell>
                                )}
                                <TableCell className="text-center">
                                    <Checkbox
                                        className="box-content"
                                        defaultChecked={student?.marksheet}
                                        onCheckedChange={(value) =>
                                            mutate({
                                                registration:
                                                    student.registration,
                                            })
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            {fetchStudents?.total! > per_page && (
                <Pagination
                    total={fetchStudents?.total!}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
};

export default ManageMarksheet;
