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
import { Eye, UserRoundCheck, View } from "lucide-react";
import axios from "axios";
import { LoadingCells } from "@/components/loading/loading";
import { useModal } from "@/hooks/use-modal-store";
import { format } from "date-fns";
import { URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

const CertificateList = ({
    searchParams,
}: {
    searchParams: {
        page: string;
        registration: string;
        pending?: boolean;
    };
}) => {
    const { onOpen } = useModal();

    const url = `${URL}/api/certificate?${
        searchParams.pending ? "pending=true&" : ""
    }page=${searchParams.page}${
        !!searchParams.registration
            ? "&formNumber=" + searchParams.registration
            : ""
    }`;
    const { data, isLoading } = useQuery({
        queryKey: [
            searchParams?.pending
                ? "pending_certificate"
                : "verified_certificate",
            searchParams.page || "1",
            searchParams.registration ? searchParams.registration : "none",
        ],
        queryFn: async () => {
            const { data } = await axios.get(url);
            return data;
        },
    });

    return (
        <div className="px-5 py-4 flex flex-col gap-4">
            <div className="flex justify-between">
                <h1 className="flex items-center gap-2 md:gap-3 lg:text-xl uppercase font-semibold text-teal-700">
                    <UserRoundCheck className="text-red-600 w-5 h-5" />
                    {searchParams?.pending
                        ? "Pending Certificate"
                        : "Issued Certificate"}
                </h1>
                <Search
                    className="w-32 md:w-44"
                    placeholder="Registration"
                    queryName="registration"
                />
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
                                View
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    {/* TABLE BODY */}
                    <TableBody>
                        {isLoading && <LoadingCells m={7} />}
                        {!isLoading &&
                            data?.certificates?.map((student: Student) => (
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
                                    <TableCell className="text-left sm:text-right text-xs md:text-sm">
                                        {/* EDIT BTN */}
                                        <Button
                                            variant={"outline"}
                                            onClick={() =>
                                                onOpen("editStudent", {
                                                    student,
                                                    searchParams: {
                                                        type: searchParams?.pending
                                                            ? "pending_certificate"
                                                            : "verified_certificate",

                                                        page:
                                                            searchParams.page ||
                                                            "1",
                                                        registration:
                                                            searchParams.registration
                                                                ? searchParams.registration
                                                                : "none",
                                                    },
                                                })
                                            }
                                            className="px-2 py-0"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                {/* PAGINATION */}
                <Pagination total={data?.total} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default CertificateList;
