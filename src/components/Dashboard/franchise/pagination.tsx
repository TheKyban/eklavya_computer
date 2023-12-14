"use client";
import { Button } from "@/components/ui/button";
import { per_page } from "@/lib/constants";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { FC } from "react";

interface prop {
    total: number;
}

const Pagination: FC<prop> = ({ total }) => {
    const { replace } = useRouter();
    const path = usePathname();
    const searchParams = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;

    const params = new URLSearchParams(searchParams);

    const hasPrev = per_page * (page - 1) > 0;
    const hasNext = per_page * (page - 1) + per_page < total;

    const pageHandler = (type: "prev" | "next") => {
        type === "prev"
            ? params.set("page", `${page - 1}`)
            : params.set("page", `${page + 1}`);
        replace(`${path}?${params}`);
    };

    return (
        <div className="flex justify-around">
            <Button
                variant={"outline"}
                disabled={!hasPrev}
                onClick={() => pageHandler("prev")}
            >
                <ArrowLeft />
            </Button>
            <Button
                variant={"outline"}
                disabled={!hasNext}
                onClick={() => pageHandler("next")}
            >
                <ArrowRight />
            </Button>
        </div>
    );
};

export default Pagination;
