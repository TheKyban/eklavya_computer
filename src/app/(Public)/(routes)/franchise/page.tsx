"use client";
import { Footer } from "@/components/Home/footer";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { MAX_WIDTH, MIN_HEIGHT } from "@/lib/styles";
import { Address } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Franchise() {
    const [branch, setBranch] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState<{
        img: string;
        userId: string;
        address: Address;
        name: string;
        branch: string;
    }>();

    const { mutate, isPending } = useMutation({
        mutationKey: ["userSearch", branch],
        mutationFn: async () => {
            if (branch.length < 5 || password.length < 8) {
                return;
            }

            const { data } = await axios.post("/api/search", {
                branch,
                password,
            });

            if (data) {
                setBranch("");
                setPassword("");
                if (data?.message) {
                    toast({ description: data.message });
                }
            }

            if (data.success) {
                setData(data.user);
            }
        },
    });

    return (
        <>
            <div
                className={`w-full ${MAX_WIDTH} bg-orange-100 m-auto ${MIN_HEIGHT} h-full py-20 lg:pt-28 flex items-center justify-center gap-9 flex-wrap`}
            >
                {/* VERIFIY FRANCHISE */}
                <Card className="max-w-lg w-1/2 min-w-[350px] bg-transparent">
                    <CardHeader>
                        <CardTitle className="uppercase text-red-600">
                            Verify Franchise
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <Label className="text-red-950">Branch Code</Label>
                            <Input
                                placeholder="Enter Branch Code"
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label className="text-red-950">Password</Label>
                            <Input
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            variant={"destructive"}
                            onClick={() => mutate()}
                            disabled={isPending}
                        >
                            {isPending ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                "Search"
                            )}
                        </Button>
                    </CardFooter>
                </Card>

                {/* IF FRANCHISE DATA EXIST */}

                {data && (
                    <Card className="bg-transparent">
                        <CardHeader className="items-center">
                            {data?.img && (
                                <Image
                                    src={data?.img}
                                    width={150}
                                    height={150}
                                    alt="avatar"
                                    className="rounded-full"
                                />
                            )}

                            {data?.userId && (
                                <div className="flex items-center gap-3">
                                    <p className="text-lg font-semibold">
                                        Branch Code :
                                    </p>
                                    <span>{data?.userId}</span>
                                </div>
                            )}
                        </CardHeader>
                        <CardContent>
                            {data?.branch && (
                                <div className="flex gap-3 items-center">
                                    <p className="text-lg font-semibold">
                                        Branch Name:
                                    </p>
                                    <span>{data?.branch}</span>
                                </div>
                            )}
                            {data?.name && (
                                <div className="flex gap-3 items-center">
                                    <p className="text-lg font-semibold">
                                        Director Name:{" "}
                                    </p>
                                    <span>{data?.name}</span>
                                </div>
                            )}
                            {data?.address && (
                                <div className="flex items-center gap-3">
                                    <p className="text-lg font-semibold">
                                        Address :
                                    </p>
                                    <span>{data?.address.street}</span>
                                </div>
                            )}

                            {data?.address.district && (
                                <div className="flex items-center gap-3">
                                    <p className="text-lg font-semibold">
                                        District:{" "}
                                    </p>
                                    <span>{data?.address.district}</span>
                                </div>
                            )}
                            {data?.address.state && (
                                <div className="flex items-center gap-3">
                                    <p className="text-lg font-semibold">
                                        State:{" "}
                                    </p>
                                    <span>{data?.address.state}</span>
                                </div>
                            )}
                            {data?.address.pincode && (
                                <div className="flex items-center gap-3">
                                    <p className="text-lg font-semibold">
                                        Pin code:{" "}
                                    </p>
                                    <span>{data?.address.pincode}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
            {/*
             *
             * FOOTER
             *
             */}

            <Footer />
        </>
    );
}
