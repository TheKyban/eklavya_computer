"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { UserType, details } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
    GraduationCap,
    Loader,
    LucideIcon,
    Medal,
    Ribbon,
    ShieldAlert,
    ShieldCheck,
    Users,
} from "lucide-react";
import Image from "next/image";

const IconMap = {
    GraduationCap: GraduationCap,
    Medal: Medal,
    Ribbon: Ribbon,
    ShieldAlert: ShieldAlert,
    ShieldCheck: ShieldCheck,
    Users: Users,
};
const Dasboard = () => {
    const { data, isLoading } = useQuery<{
        details: details[];
        allUsers: UserType[];
    }>({
        queryKey: ["dashboard"],
        queryFn: async () => {
            const { data } = await axios("/api/dashboard");
            console.log(data);
            return data;
        },
    });
    return (
        <div className="px-3 h-full w-full flex flex-col gap-5">
            {isLoading && (
                <div className="flex w-full h-[70vh] items-center justify-center">
                    <Loader className="w-10 h-10 text-blue-600 animate-spin" />
                </div>
            )}
            <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-7">
                {data?.details?.map((info: details, idx: number) => (
                    <SmallCard
                        key={idx}
                        Icon={IconMap[info.Logo]}
                        title={info.title}
                        number={info.count}
                        color={info.color!}
                    />
                ))}
            </div>

            <div className="flex flex-col gap-3">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>IMG</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead>Pending</TableHead>
                            <TableHead>Verified</TableHead>
                            <TableHead>issued Cert</TableHead>
                            <TableHead>pending Cert</TableHead>
                            <TableHead>Type</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.allUsers?.map((user) => (
                            <TableRow
                                key={user.userId}
                                className="shadow-md py-2 px-3 flex gap-2"
                            >
                                <TableCell>
                                    <Image
                                        src={user.img}
                                        height={60}
                                        width={60}
                                        alt="user"
                                        className="w-[60px] h-[60px] object-cover rounded-full"
                                    />
                                </TableCell>
                                <TableCell className="flex items-start justify-center flex-col">
                                    <h1 className="text-lg">{user.branch}</h1>
                                    <h3>{user.name}</h3>
                                </TableCell>

                                <TableCell>
                                    {user.pendingCertificates}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
const SmallCard = ({
    color,
    title,
    number,
    Icon,
}: {
    color: string;
    title: string;
    number: string | number;
    Icon: LucideIcon;
}) => {
    return (
        <div
            className={`drop-shadow-md flex justify-between items-center rounded-lg max-w-sm px-6 py-4 bg-zinc-50 dark:bg-white/10 gap-8`}
        >
            <div
                className={`w-20 py-4 rounded-lg bg-teal-100 dark:bg-white/5 px-5`}
            >
                <Icon className={`w-10 h-10 text-${color}-600`} />
            </div>
            <div className="flex flex-col gap- items-center">
                <span
                    className={`text-base text-end font-medium text-${color}-600 uppercase`}
                >
                    {title}
                </span>
                <span
                    className={`self-end text-2xl font-semibold text-${color}-600`}
                >
                    {number}
                </span>
            </div>
        </div>
    );
};
export default Dasboard;
