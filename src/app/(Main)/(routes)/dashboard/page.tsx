"use client";
import { details } from "@/lib/types";
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

const IconMap = {
    GraduationCap: GraduationCap,
    Medal: Medal,
    Ribbon: Ribbon,
    ShieldAlert: ShieldAlert,
    ShieldCheck: ShieldCheck,
    Users: Users,
};
const Dasboard = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["dashboard"],
        queryFn: async () => {
            const { data } = await axios("/api/dashboard");
            return data;
        },
    });
    return (
        <div className="px-3 h-full w-full">
            {isLoading && (
                <div className="flex w-full h-[70vh] items-center justify-center">
                    <Loader className="w-10 h-10 text-blue-600 animate-spin" />
                </div>
            )}
            <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-7">
                {data?.map((info: details, idx: number) => (
                    <SmallCard
                        key={idx}
                        Icon={IconMap[info.Logo]}
                        title={info.title}
                        number={info.count}
                        color={info.color!}
                    />
                ))}
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
            <div className={`w-20 py-4 rounded-lg bg-teal-100 dark:bg-white/5 px-5`}>
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
