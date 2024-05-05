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
import { useUserApplications } from "@/hooks/useFetch";
import { LoadingCells } from "../loading/loading";
import { poppins } from "@/lib/fonts";
import { UserApplication } from "@prisma/client";
import { format } from "date-fns";
import { per_page } from "@/lib/constants";
import Pagination from "../pagination/pagination";
import { useModal } from "@/hooks/use-modal-store";

export default function UserApplicationList({ page }: { page: string }) {
    const { data, isLoading } = useUserApplications(page);
    const { onOpen } = useModal();
    return (
        <div className="px-5 py-4 flex flex-col gap-4">
            <div className="flex justify-between">
                <h1 className="flex items-center gap-2 md:gap-3 lg:text-xl uppercase font-semibold text-teal-700">
                    <UserRoundCheck className="text-red-600 w-5 h-5" />
                    <span>User Applications</span>
                </h1>
            </div>

            <div>
                <Table>
                    {/* TABLE HEADING */}
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead className="table-cell">
                                Branch Name
                            </TableHead>
                            <TableHead className="table-cell">Email</TableHead>
                            <TableHead className="table-cell">Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    {/* TABLE BODY */}
                    <TableBody>
                        {isLoading && <LoadingCells cols={7} />}
                        {!isLoading &&
                            data?.applications?.map((user: UserApplication) => (
                                <TableRow
                                    key={user.id}
                                    className={`${poppins.className} cursor-pointer`}
                                    onClick={() =>
                                        onOpen("userApplication", {
                                            userApplication: user,
                                            searchParams: {
                                                page: page || "1",
                                            },
                                        })
                                    }
                                >
                                    <TableCell className="text-xs md:text-sm">
                                        {user.name}
                                    </TableCell>
                                    <TableCell className="table-cell text-xs md:text-sm">
                                        {user.branch}
                                    </TableCell>
                                    <TableCell className="table-cell text-xs md:text-sm">
                                        {user.email}
                                    </TableCell>
                                    <TableCell className="table-cell text-xs md:text-sm">
                                        {format(new Date(user.createdAt), "PP")}
                                    </TableCell>
                                </TableRow>
                            ))}
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
