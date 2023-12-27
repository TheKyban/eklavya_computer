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
import { poppins } from "@/lib/fonts";
import { Student, role } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

const ManageCertificate = ({
    searchParams,
}: {
    searchParams: { page: string; registration: string };
}) => {
    const { data: session } = useSession();

    const [user, setUser] = useState(session?.user.userId);
    const [type, setType] = useState<verify>("false");
    const registration = searchParams.registration;
    const page = searchParams.page;
    /**
     * FETCHING USERS
     */

    const { data: fetchUsers, isLoading: isUserLoading } = useQuery({
        queryKey: ["userIds"],
        queryFn: async () => {
            const url = `/api/users?page=1&name=aditya&select=userId,role`;
            const { data } = await axios.get(url);
            return data;
        },
    });
    const queryClient = useQueryClient();

    const url = `/api/student-verification/${user}?pending=${type}&page=${
        searchParams.page
    }${!!registration ? "&formNumber=" + registration : ""}`;
    const { data, isLoading } = useQuery({
        queryKey: [
            "student_verification",
            page || "1",
            user,
            registration ? registration : "",
            type,
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
                `/api/student-verification/${user}`,
                {
                    isVerified,
                    formNumber,
                }
            );
            return data;
        },

        onSuccess(data, variables) {
            if (data) {
                toast({ description: data?.message });
            }

            // remove data
            queryClient.setQueryData(
                [
                    "student_verification",
                    page || "1",
                    user,
                    registration ? registration : "",
                    type,
                ],
                (oldData: { total: number; students: Student[] }) => {
                    const students = oldData.students.filter(
                        (student) =>
                            student.formNumber !== data.student.formNumber
                    );

                    return {
                        total: oldData.total - 1,
                        students,
                    };
                }
            );

            //Add To other type
            queryClient.setQueryData(
                [
                    "student_verification",
                    page || "1",
                    user,
                    registration ? registration : "",
                    type === "false" ? "true" : "false",
                ],
                (oldData: { total: number; students: Student[] }) => {
                    return {
                        total: oldData.total + 1,
                        students: [data.student, ...oldData.students],
                    };
                }
            );
        },
    });
    useEffect(() => {
        setUser(session?.user.userId);
    }, [session]);

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
                    className="w-32 md:w-44"
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
                    >
                        <SelectTrigger className="w-36">
                            <SelectValue placeholder="Select User" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Admin</SelectLabel>
                                <SelectItem
                                    value={session?.user.userId as string}
                                >
                                    {session?.user.userId}
                                </SelectItem>

                                {isUserLoading && (
                                    <SelectItem value="loading2">
                                        Loading...
                                    </SelectItem>
                                )}

                                {fetchUsers?.users?.map(
                                    (user: userType) =>
                                        user.role === "ADMIN" && (
                                            <SelectItem
                                                key={user.userId}
                                                value={user.userId}
                                            >
                                                {user.userId}
                                            </SelectItem>
                                        )
                                )}

                                <SelectLabel>Users</SelectLabel>
                                {isUserLoading && (
                                    <SelectItem value="loading1">
                                        Loading...
                                    </SelectItem>
                                )}

                                {fetchUsers?.users?.map(
                                    (user: userType) =>
                                        user.role === "FRANCHISE" && (
                                            <SelectItem
                                                key={user.userId}
                                                value={user.userId}
                                            >
                                                {user.userId}
                                            </SelectItem>
                                        )
                                )}
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
                    >
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>courses</SelectLabel>
                                <SelectItem value="true">Verified</SelectItem>
                                <SelectItem value="false">Pending</SelectItem>
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
                        {isLoading && <LoadingCells m={7} />}

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

export default ManageCertificate;
