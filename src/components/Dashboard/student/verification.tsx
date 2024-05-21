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
import { useCustumQuery } from "@/hooks/use-queries";
import { useStudentVerification, useUsers } from "@/hooks/useFetch";
import { per_page } from "@/lib/CONSTANTS";
import { poppins } from "@/lib/FONTS";
import { Course, Student, role } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { GraduationCap, Shield, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface userType {
    role: role;
    userId: string;
}

type verify = "false" | "true";

const StudentVerificationManagement = ({
    branches,
    page,
    registration,
}: {
    page: string;
    registration: string;
    branches: { branch: string; userId: string }[];
}) => {
    const { data: session } = useSession();

    const [user, setUser] = useState(branches?.[0].userId);
    const [type, setType] = useState<verify>("false");

    /**
     * FETCHING USERS
     */

    const { data, isLoading } = useStudentVerification(
        page,
        user,
        registration,
        type,
    );

    const { removeStudent, addStudent } = useCustumQuery();

    const { mutate, isPending } = useMutation({
        mutationFn: async ({ registration }: { registration: string }) => {
            const { data } = await axios.put(
                `/api/management/student-verification`,
                {
                    registration,
                },
            );
            return data;
        },

        onSuccess(data, variables) {
            if (data) {
                toast({ description: data?.message });
            }

            // remove Student from the list
            removeStudent(
                [
                    "student_verification",
                    page || "1",
                    user,
                    registration ? registration : "",
                    type,
                ],
                data.student.registration,
            );

            //Add To other list
            addStudent(
                [
                    "student_verification",
                    page || "1",
                    user,
                    registration ? registration : "",
                    type === "false" ? "true" : "false",
                ],
                data.student,
            );
        },
    });

    return (
        <div className="px-5 flex flex-col gap-4">
            <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                    <GraduationCap className="text-indigo-400" />
                    <span className="text-zinc-800 text-2xl font-semibold">
                        Student Verification
                    </span>
                </div>
                <Search
                    className="w-32 md:w-44 text-xs lg:text-sm"
                    placeholder="Registration"
                    queryName="registration"
                />
            </div>

            <div className="flex flex-wrap gap-5">
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
                        defaultValue={type}
                        value={type}
                        onValueChange={(val) => setType(val as verify)}
                        disabled={isPending}
                    >
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>courses</SelectLabel>
                                <SelectItem value="true">VERIFIED</SelectItem>
                                <SelectItem value="false">PENDING</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div>
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
                        {isLoading && <LoadingCells cols={7} />}

                        {!isLoading &&
                            data?.students?.map(
                                (student: Student & { Course: Course }) => (
                                    <TableRow
                                        key={student?.registration}
                                        className={poppins.className}
                                    >
                                        <TableCell className="font-medium text-xs md:text-sm">
                                            {student?.registration}
                                        </TableCell>
                                        <TableCell className="text-xs md:text-sm">
                                            {student?.name}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell text-xs md:text-sm">
                                            {student?.fatherName}
                                        </TableCell>
                                        <TableCell className="hidden xl:table-cell text-xs md:text-sm">
                                            {student?.motherName}
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell text-xs md:text-sm">
                                            {format(
                                                new Date(student?.dor),
                                                "PP",
                                            )}
                                        </TableCell>
                                        <TableCell className="text-xs md:text-sm">
                                            {student?.Course?.name}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Checkbox
                                                defaultChecked={
                                                    student?.isVerified
                                                }
                                                id={student?.registration}
                                                className="box-content"
                                                onCheckedChange={(value) =>
                                                    mutate({
                                                        registration:
                                                            student?.registration,
                                                    })
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                ),
                            )}
                    </TableBody>
                </Table>
                {data?.total > per_page && (
                    <Pagination total={data?.total} isLoading={isLoading} />
                )}
            </div>
        </div>
    );
};

export default StudentVerificationManagement;
