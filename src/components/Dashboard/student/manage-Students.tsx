"use client";
import { LoadingCells } from "@/components/loading/loading";
import Pagination from "@/components/pagination/pagination";
import Search from "@/components/search/search";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
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
import { useModal } from "@/hooks/use-modal-store";
import {
    useStudentVerification,
    useStudents,
    useUsers,
} from "@/hooks/useFetch";
import { per_page } from "@/lib/CONSTANTS";
import { poppins } from "@/lib/FONTS";
import { StudentWithAllDetails } from "@/lib/TYPES";
import { format } from "date-fns";
import { GraduationCap, Pen, Shield, Trash, Users } from "lucide-react";
import { useState } from "react";
import { UserBranchList } from "../UserBranchList";

export const ManageStudents = ({
    branches,
    page,
    registration,
}: {
    page: string;
    registration: string;
    branches: { branch: string; userId: string }[];
}) => {
    const { onOpen } = useModal();
    const [user, setUser] = useState(branches?.[0].userId);
    const [type, setType] = useState<boolean>(false);
    const { data, isLoading } = useStudents(
        page || "1",
        type,
        registration,
        user,
    );

    return (
        <div className="px-5 flex flex-col gap-4">
            <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                    <GraduationCap className="text-indigo-400" />
                    <span className="text-zinc-800 uppercase text-2xl font-semibold">
                        Students
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
                <UserBranchList
                    user={user}
                    setUser={(val) => setUser(val)}
                    branches={branches}
                    isLoading={isLoading}
                />

                {/* Type */}
                <div className="flex flex-col gap-2">
                    <div className="flex gap-1 items-center">
                        <Shield className="text-rose-500 w-5 h-5" />
                        <span>Type</span>
                    </div>
                    <Select
                        defaultValue={`${type}`}
                        value={`${type}`}
                        onValueChange={(val) => setType(val === "true")}
                        disabled={isLoading}
                    >
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="true">VERIFIED</SelectItem>
                                <SelectItem value="false">PENDING</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div>
                <Table>
                    {/* TABLE HEADING */}
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
                            <TableHead className="text-left sm:text-right">
                                Tool
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    {/* TABLE BODY */}
                    <TableBody>
                        {isLoading && <LoadingCells cols={6} />}
                        {!isLoading &&
                            data?.students?.map(
                                (student: StudentWithAllDetails) => (
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
                                        <TableCell className="text-left sm:text-right text-xs md:text-sm flex justify-end gap-2">
                                            {/* EDIT BTN */}
                                            <Button
                                                variant={"outline"}
                                                onClick={() =>
                                                    onOpen("editStudent", {
                                                        student,
                                                        searchParams: {
                                                            type: type
                                                                ? "verified_list"
                                                                : "pending_list",
                                                            page: page || "1",
                                                            registration:
                                                                registration
                                                                    ? registration
                                                                    : "",
                                                            userId: user,
                                                        },
                                                    })
                                                }
                                                className="px-2 py-0"
                                            >
                                                <Pen className="w-5 h-5" />
                                            </Button>
                                            {/* DELETE BTN */}
                                            <Button
                                                variant={"outline"}
                                                onClick={() =>
                                                    onOpen("deleteStudent", {
                                                        student,
                                                        searchParams: {
                                                            type: type
                                                                ? "verified_list"
                                                                : "pending_list",

                                                            page: page || "1",
                                                            registration:
                                                                registration
                                                                    ? registration
                                                                    : "",
                                                            userId: user,
                                                        },
                                                    })
                                                }
                                                className="sm:ml-2 px-2 py-0"
                                            >
                                                <Trash className="w-5 h-5" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ),
                            )}
                    </TableBody>
                </Table>
                {/* PAGINATION */}
                {data && data?.total > per_page && (
                    <Pagination total={data?.total} isLoading={isLoading} />
                )}
            </div>
        </div>
    );
};
