"use client";
import Pagination from "@/components/Dashboard/franchise/pagination";
import Search from "@/components/Dashboard/franchise/search";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { poppins } from "@/lib/fonts";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Pen, Trash } from "lucide-react";
import { UserCog } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingCells } from "./loading";
import { useModal } from "@/hooks/use-modal-store";

const Franchise = ({
    searchParams,
}: {
    searchParams: { page: string; userId: string };
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);
    const [total, setTotal] = useState(0);
    const { onOpen } = useModal();
    const url = `http://localhost:3000/api/user?page=${searchParams.page}${
        !!searchParams.userId ? "&userId=" + searchParams.userId : ""
    }`;

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const {
                    data: { users, total },
                } = await axios.get(url);

                setUsers(users);
                setTotal(total);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [url]);

    return (
        <div className="px-5 py-4 flex flex-col gap-4">
            <div className="flex justify-between">
                <h1 className="flex items-center gap-3 lg:text-xl uppercase font-semibold text-teal-700">
                    <UserCog className="text-red-600 w-5 h-5" />
                    Users
                </h1>
                <Search placeholder="UserId" />
            </div>

            <div>
                <Table>
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
                    <TableBody>
                        {isLoading && <LoadingCells />}

                        {!isLoading &&
                            users?.map((user: User) => (
                                <TableRow
                                    key={user.userId}
                                    className={poppins.className}
                                >
                                    <TableCell className="font-medium">
                                        {user.userId}
                                    </TableCell>
                                    <TableCell>{user.branch}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {user.name}
                                    </TableCell>
                                    <TableCell>
                                        {user.isActive ? "Yes" : "No"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant={"outline"}
                                            onClick={() =>
                                                onOpen("User", { user })
                                            }
                                            className="px-2 py-0"
                                        >
                                            <Pen className="w-5 h-5" />
                                        </Button>
                                        <Button
                                            variant={"outline"}
                                            onClick={() =>
                                                onOpen("deleteUser", { user })
                                            }
                                            className="ml-2 px-2 py-0"
                                        >
                                            <Trash className="w-5 h-5" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <Pagination total={total} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default Franchise;
