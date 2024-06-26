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
import { poppins } from "@/lib/FONTS";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Pen, Trash } from "lucide-react";
import { UserCog } from "lucide-react";
import { LoadingCells } from "@/components/loading/loading";
import { useModal } from "@/hooks/use-modal-store";
import { per_page } from "@/lib/CONSTANTS";
import { useUsers } from "@/hooks/useFetch";

const UserList = ({
    searchParams,
}: {
    searchParams: { page: string; userId: string };
}) => {
    const { onOpen } = useModal();

    const { data, isLoading } = useUsers(
        searchParams.page || "1",
        searchParams.userId || "",
    );

    return (
        <div className="px-5 py-4 flex flex-col gap-4">
            <div className="flex justify-between">
                <h1 className="flex items-center gap-3 lg:text-xl uppercase font-semibold text-teal-700">
                    <UserCog className="text-red-600 w-5 h-5" />
                    Manage Users
                </h1>
                <Search
                    placeholder="UserId"
                    queryName="userId"
                    className="text-xs lg:text-sm"
                />
            </div>

            <div>
                <Table>
                    {/* TABLE HEADER */}
                    <TableHeader>
                        <TableRow>
                            <TableHead>User ID</TableHead>
                            <TableHead>Branch</TableHead>
                            <TableHead className="hidden md:table-cell">
                                Owner
                            </TableHead>
                            <TableHead>Active</TableHead>
                            <TableHead className="text-right">Tool</TableHead>
                        </TableRow>
                    </TableHeader>
                    {/* TABLE BODY */}
                    <TableBody>
                        {/* SHIMMER */}
                        {isLoading && <LoadingCells />}
                        {!isLoading &&
                            data?.users?.map((user: User) => (
                                /**
                                 * TABLE ROW
                                 */
                                <TableRow
                                    key={user.userId}
                                    className={poppins.className}
                                >
                                    <TableCell className="font-medium">
                                        {user?.userId}
                                    </TableCell>
                                    <TableCell>{user?.branch}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {user?.name}
                                    </TableCell>
                                    <TableCell>
                                        {user?.isActive ? "Yes" : "No"}
                                    </TableCell>
                                    <TableCell className="text-right flex justify-end gap-2">
                                        <>
                                            {/* EDIT BTN */}
                                            <Button
                                                variant={"outline"}
                                                onClick={() =>
                                                    onOpen("User", {
                                                        user,
                                                        searchParams: {
                                                            page:
                                                                searchParams.page ||
                                                                "1",
                                                            userId: searchParams?.userId,
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
                                                    onOpen("deleteUser", {
                                                        user,
                                                        searchParams: {
                                                            page:
                                                                searchParams.page ||
                                                                "1",
                                                            userId: searchParams?.userId,
                                                        },
                                                    })
                                                }
                                                className="px-2 py-0"
                                            >
                                                <Trash className="w-5 h-5" />
                                            </Button>
                                        </>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                {data?.total > per_page && (
                    <Pagination total={data?.total} isLoading={isLoading} />
                )}
            </div>
        </div>
    );
};

export default UserList;
