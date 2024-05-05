"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FC, HTMLAttributes, useEffect, useState } from "react";

interface pageProps extends HTMLAttributes<HTMLInputElement> {
    queryName: string;
}

const Search: FC<pageProps> = ({
    queryName,
    placeholder,
    className,
    ...props
}) => {
    const { replace } = useRouter();
    const path = usePathname();
    const params = useSearchParams();
    const query = new URLSearchParams(params);

    let timer: NodeJS.Timeout;
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            if (e.target.value) {
                query.set(queryName, e.target.value);
                query.set("page", "1");
            } else {
                query.delete("page");
                query.delete(queryName);
            }
            replace(`${path}?${query}`);
        }, 300);
    };

    return (
        <div className="relative" suppressHydrationWarning>
            <Input
                {...props}
                placeholder={placeholder}
                className={cn("rounded-3xl w-32 uppercase", className)}
                onChange={onChange}
                defaultValue={params.get(queryName) as string}
            />
            <SearchIcon
                className="w-4 h-4 md:w-5 md:h-5 absolute top-[50%] translate-y-[-50%] right-3 md:right-4 text-teal-600 cursor-pointer"
                suppressHydrationWarning
            />
        </div>
    );
};

export default Search;
