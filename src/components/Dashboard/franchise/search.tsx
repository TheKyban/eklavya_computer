"use client";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FC, HTMLAttributes, useEffect, useState } from "react";

interface pageProps extends HTMLAttributes<HTMLInputElement> {}

const Search: FC<pageProps> = ({ placeholder, ...props }) => {
    const { replace } = useRouter();
    const path = usePathname();
    const params = useSearchParams();
    const query = new URLSearchParams(params);

    let timer: NodeJS.Timeout;
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            if (e.target.value) {
                query.set("userId", e.target.value);
                query.set("page", "1");
            } else {
                query.delete("page");
                query.delete("userId");
            }
            replace(`${path}?${query}`);
        }, 300);
    };

    return (
        <div className="relative" suppressHydrationWarning>
            <Input
                {...props}
                placeholder={placeholder}
                className="rounded-3xl w-32"
                onChange={onChange}
                defaultValue={params.get("userId") as string}
            />
            <SearchIcon
                className="w-5 h-5 absolute top-[50%] translate-y-[-50%] right-4 text-teal-600 cursor-pointer"
                suppressHydrationWarning
            />
        </div>
    );
};

export default Search;
