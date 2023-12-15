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
import { Pen } from "lucide-react";
import { UserCog } from "lucide-react";
import axios from "axios";

const Franchise = async ({
    searchParams,
}: {
    searchParams: { page: string; userId: string };
}) => {
    try {
        const url = `http://localhost:3000/api/user?page=${searchParams.page}${
            !!searchParams.userId ? "&userId=" + searchParams.userId : ""
        }`;
        const {
            data: { users, total },
        } = await axios.get(url);
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
                                <TableHead className="text-right">
                                    Tool
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users?.map((user: User) => (
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
                                        <Button variant={"outline"}>
                                            <Pen className="w-5 h-5" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Pagination total={total} />
                </div>
            </div>
        );
    } catch (error) {
        console.log(error);
    }
};

export default Franchise;
