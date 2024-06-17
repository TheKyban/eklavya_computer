"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useUniversityPrograms } from "@/hooks/useFetch";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { UniversityPrograms } from "@prisma/client";

export const UniversityImageList = () => {
    const { data, isLoading } = useUniversityPrograms();
    return (
        <div className="px-6">
            <h1 className="text-2xl uppercase font-semibold mt-5 mb-5">
                University Images
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}

                {data?.map((asset) => (
                    <ImageCard key={asset.id} link={asset.url} id={asset.id} />
                ))}
            </div>
        </div>
    );
};

const ImageCard = ({ link, id }: { link: string; id: string }) => {
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const deleteHandler = async () => {
        try {
            setIsLoading(true);

            const { data } = await axios.delete(
                `/api/universityPrograms?id=${id}`,
            );
            console.log(data);
            if (data?.result === "ok") {
                toast({ description: "Deleted!" });

                queryClient.setQueryData(
                    ["university_programs"],
                    (old: UniversityPrograms[]) => {
                        const allData = old?.filter((img) => img?.id !== id);
                        return allData;
                    },
                );
            }
        } catch (error: any) {
            console.log(error);
            toast({ description: error?.message });
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="flex flex-col gap-2 w-full max-w-[500px]">
            <div className="relative w-full max-w-[500px] h-[200px]">
                <Image src={link} fill alt="banner" />
            </div>
            <Button
                variant={"destructive"}
                className="w-full"
                onClick={deleteHandler}
            >
                {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    "DELETE"
                )}
            </Button>
        </div>
    );
};
