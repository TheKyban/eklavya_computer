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
import { useModal } from "@/hooks/use-modal-store";
import { useICard, useMarksheet } from "@/hooks/useFetch";
import { DATE_FORMAT, per_page } from "@/lib/CONSTANTS";
import { poppins } from "@/lib/FONTS";
import { format } from "date-fns";
import { Layers3, Shield, Users } from "lucide-react";
import { FC, useState } from "react";

interface pageProps {
    page: string;
    registration: string;
    branches: { branch: string; userId: string }[];
}

const ManageIcard: FC<pageProps> = ({ page, registration, branches }) => {
    const [user, setUser] = useState(branches?.[0]?.userId);
    const [type, setType] = useState<boolean>(false);
    const { onOpen } = useModal();
    const { data: fetchStudents, isLoading } = useICard({
        page,
        issue: type,
        registration,
        userId: user,
    });

    return (
        <div className="w-screen lg:w-full h-full px-5 flex flex-col gap-4">
            <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                    <Layers3 className="text-indigo-400" />
                    <span className="text-zinc-800 uppercase text-lg lg:text-2xl font-semibold">
                        Manage ICard
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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                                <SelectItem value="false">PENDING</SelectItem>
                                <SelectItem value="true">ISSUED</SelectItem>
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

                        {fetchStudents?.students?.[0]?.icard.issue && (
                            <TableHead className="text-center">Date</TableHead>
                        )}
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

                                {student?.icard.issue && (
                                    <TableCell className="text-center">
                                        {format(
                                            student?.icard?.date!,
                                            DATE_FORMAT,
                                        )}
                                    </TableCell>
                                )}
                                <TableCell className="text-center">
                                    <Button
                                        size={"sm"}
                                        variant={
                                            student?.icard?.issue
                                                ? "destructive"
                                                : "primary"
                                        }
                                        className="box-content"
                                        onClick={() =>
                                            onOpen("issueICard", {
                                                student: student,
                                                searchParams: {
                                                    page,
                                                    registration,
                                                    type: `${type}`,
                                                    userId: user,
                                                },
                                            })
                                        }
                                    >
                                        {student?.icard?.issue
                                            ? "Cancel"
                                            : "Issue"}
                                    </Button>
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

export default ManageIcard;
