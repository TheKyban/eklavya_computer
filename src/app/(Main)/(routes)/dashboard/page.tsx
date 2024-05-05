import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { authOptions } from "@/lib/auth-options";
import {
    fetchAdminDashboardData,
    fetchUserDashboardData,
} from "@/lib/fetchFunctions";
import { UserType, details } from "@/lib/types";
import {
    BadgeAlert,
    GraduationCap,
    LucideIcon,
    Medal,
    Ribbon,
    ShieldAlert,
    ShieldCheck,
    Users,
} from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";

const IconMap = {
    GraduationCap: GraduationCap,
    Medal: Medal,
    Ribbon: Ribbon,
    ShieldAlert: ShieldAlert,
    ShieldCheck: ShieldCheck,
    Users: Users,
};
const Dasboard = async () => {
    const session = await getServerSession(authOptions);
    let data: {
        details: details[];
        allUsers?: UserType[];
    };
    if (session?.user.role === "ADMIN") {
        data = await fetchAdminDashboardData();
    } else {
        data = await fetchUserDashboardData(session!.user.userId);
    }
    return (
        <div className="px-3 h-full w-full flex flex-col gap-5">
            {!!data?.details?.[0] && (
                <div className="flex gap-2 items-center px-5 bg-slate-200 w-fit py-3 rounded-lg">
                    <BadgeAlert className="w-8 h-8 text-indigo-600" />
                    <h1 className="uppercase text-xl text-indigo-800 font-semibold">
                        Total stats
                    </h1>
                </div>
            )}

            <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-7">
                {data?.details?.map((info: details, idx: number) => (
                    <SmallCard
                        key={idx}
                        Icon={info.Logo}
                        title={info.title}
                        number={info.count}
                        color={info.color!}
                    />
                ))}
            </div>

            {!!data?.allUsers && (
                <div className="flex flex-col gap-3 w-full h-full">
                    <div className="flex gap-2 items-center px-5 bg-slate-200 w-fit py-3 rounded-lg">
                        <Users className="w-8 h-8 text-indigo-600" />
                        <h1 className="uppercase text-xl text-indigo-800 font-semibold">
                            All User
                        </h1>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow className="uppercase">
                                <TableHead className="w-[50px]">
                                    UserID
                                </TableHead>
                                <TableHead className="text-center hidden md:table-cell">
                                    IMG
                                </TableHead>
                                <TableHead className="text-center hidden md:table-cell">
                                    Name
                                </TableHead>
                                <TableHead className="text-center hidden md:table-cell">
                                    Branch
                                </TableHead>
                                <TableHead className="text-center">
                                    Pending
                                </TableHead>
                                <TableHead className="text-center">
                                    Verified
                                </TableHead>
                                <TableHead className="text-center hidden md:table-cell">
                                    Total
                                </TableHead>
                                <TableHead className="text-center hidden md:table-cell">
                                    issued Cert
                                </TableHead>
                                <TableHead className="text-center hidden md:table-cell">
                                    pending Cert
                                </TableHead>
                                <TableHead className="text-center hidden md:table-cell">
                                    Type
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.allUsers?.map((user) => (
                                <TableRow key={user?.userId}>
                                    <TableCell>{user?.userId}</TableCell>
                                    <TableCell className="items-center justify-center hidden md:flex">
                                        <Image
                                            src={user?.img}
                                            height={60}
                                            width={60}
                                            alt="user"
                                            className="min-w-[60px] min-h-[60px] w-[60px] h-[60px] object-cover rounded-full"
                                        />
                                    </TableCell>
                                    <TableCell className="text-center hidden md:table-cell">
                                        <h3>{user?.name}</h3>
                                    </TableCell>
                                    <TableCell className="text-center hidden md:table-cell">
                                        <h1>{user?.branch}</h1>
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {user?.pendingStudents}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {user?.verifiedStudents}
                                    </TableCell>
                                    <TableCell className="text-center hidden md:table-cell">
                                        {user?.totalStudents}
                                    </TableCell>
                                    <TableCell className="text-center hidden md:table-cell">
                                        {user?.issuedCertificates}
                                    </TableCell>
                                    <TableCell className="text-center hidden md:table-cell">
                                        {user?.pendingCertificates}
                                    </TableCell>
                                    <TableCell className="text-center hidden md:table-cell">
                                        {user?.role}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
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
