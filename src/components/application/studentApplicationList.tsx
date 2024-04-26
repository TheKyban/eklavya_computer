"use client";
import { UserRoundCheck } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { useStudentApplications } from "@/hooks/useFetch";
import { LoadingCells } from "../loading/loading";
import { poppins } from "@/lib/fonts";
import { StudentApplication } from "@prisma/client";
import { format } from "date-fns";
import { per_page } from "@/lib/constants";
import Pagination from "../pagination/pagination";
import { useModal } from "@/hooks/use-modal-store";

export default function StudentApplicationList({ page }: { page: string }) {
    const { data, isLoading } = useStudentApplications(page);
    const { onOpen } = useModal();
    return (
        <div className="px-5 py-4 flex flex-col gap-4">
            <div className="flex justify-between">
                <h1 className="flex items-center gap-2 md:gap-3 lg:text-xl uppercase font-semibold text-teal-700">
                    <UserRoundCheck className="text-red-600 w-5 h-5" />
                    <span>Student Applications</span>
                </h1>
            </div>

            <div>
                <Table>
                    {/* TABLE HEADING */}
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead className="hidden md:table-cell">
                                Father Name
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Mother Name
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Date
                            </TableHead>
                            <TableHead>Course</TableHead>
                        </TableRow>
                    </TableHeader>
                    {/* TABLE BODY */}
                    <TableBody>
                        {isLoading && <LoadingCells cols={5} />}
                        {!isLoading &&
                            data?.applications?.map(
                                (student: StudentApplication) => (
                                    <TableRow
                                        key={student.id}
                                        className={`${poppins.className} cursor-pointer`}
                                        onClick={() =>
                                            onOpen("studentApplication", {
                                                studentApplication: student,
                                                searchParams: {
                                                    page: page || "1",
                                                },
                                            })
                                        }
                                    >
                                        <TableCell className="text-xs md:text-sm">
                                            {student.name}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell text-xs md:text-sm">
                                            {student.fatherName}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell text-xs md:text-sm">
                                            {student.motherName}
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell text-xs md:text-sm">
                                            {format(
                                                new Date(student.dor),
                                                "PP"
                                            )}
                                        </TableCell>
                                        <TableCell className="text-xs md:text-sm">
                                            {student.course}
                                        </TableCell>
                                    </TableRow>
                                )
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
}
