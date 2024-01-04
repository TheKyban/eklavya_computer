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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";
import { Student } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";
import { MAX_WIDTH, MIN_HEIGHT } from "@/lib/styles";
import {
    Certificate,
    MarkSheet,
    RegistrationVerify,
} from "@/components/student-zone";

export default function StudentZone() {
    const [registration, setRegistration] = useState("");
    const [tab, setTab] = useState("registration");
    const [data, setData] = useState<{
        student: Student & { branchName: string };
    }>();

    /**
     * FUNCTION FOR SEARCH
     */

    const { isPending, mutate } = useMutation({
        mutationKey: ["studentZone", tab],
        mutationFn: async () => {
            if (!registration) return;
            const { data } = await axios.get(`/api/student/${registration}`);
            console.log("mutation", data);
            if (!!data?.message) {
                toast({ description: (data.message as string).toUpperCase() });
            }
            setData(data);
            return data;
        },
    });
    return (
        <>
            <div
                className={`flex flex-col w-full ${MAX_WIDTH} ${MIN_HEIGHT} m-auto bg-orange-100 gap-5 px-2 py-16`}
            >
                {/* TAB */}
                <Tabs
                    className="max-w-[363px] md:max-w-xl lg:min-w-[500px] m-auto"
                    defaultValue={"registration"}
                    value={tab}
                    onValueChange={(e) => {
                        setTab(e);
                        setRegistration("");
                    }}
                >
                    {/* TAB LIST */}

                    <TabsList className="w-full bg-red-300">
                        <TabsTrigger
                            className="w-full text-xs sm:text-sm"
                            value="registration"
                        >
                            REGISTRATION
                        </TabsTrigger>
                        <TabsTrigger
                            className="w-ful text-xs sm:text-sm"
                            value="icard"
                        >
                            I CARD
                        </TabsTrigger>
                        <TabsTrigger
                            className="w-full text-xs sm:text-sm"
                            value="marksheet"
                        >
                            MARKSHEET
                        </TabsTrigger>
                        <TabsTrigger
                            className="w-full text-xs sm:text-sm"
                            value="certificate"
                        >
                            CERTIFICATE
                        </TabsTrigger>
                    </TabsList>

                    {/* REGISTRATION  TAB  */}

                    <TabsContent value="registration">
                        <Card className="bg-transparent">
                            <CardHeader>
                                <CardTitle className="uppercase text-red-600 text-xl md:text-2xl">
                                    Registration Verification
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Input
                                    placeholder="Registration no."
                                    value={registration}
                                    onChange={(e) =>
                                        setRegistration(e.target.value)
                                    }
                                    className="bg-white dark:focus:ring-offset-white"
                                />
                            </CardContent>
                            <CardFooter>
                                <Button
                                    variant={"destructive"}
                                    disabled={isPending}
                                    className="w-full"
                                    onClick={() => mutate()}
                                >
                                    {isPending ? (
                                        <Loader className="animate-spin" />
                                    ) : (
                                        "Search"
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* I CARD VERIFICATION  */}

                    <TabsContent value="icard">
                        <Card className="bg-transparent">
                            <CardHeader>
                                <CardTitle className="uppercase text-red-600 text-xl md:text-2xl">
                                    I Card Verification
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Input
                                    placeholder="Registration no."
                                    value={registration}
                                    onChange={(e) =>
                                        setRegistration(e.target.value)
                                    }
                                    className="bg-white dark:focus:ring-offset-white"
                                />
                            </CardContent>
                            <CardFooter>
                                <Button
                                    variant={"destructive"}
                                    disabled={isPending}
                                    className="w-full"
                                    onClick={() => mutate()}
                                >
                                    {isPending ? (
                                        <Loader className="animate-spin" />
                                    ) : (
                                        "Search"
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* MARKSHEET VERIFICATION */}

                    <TabsContent value="marksheet">
                        <Card className="bg-transparent">
                            <CardHeader>
                                <CardTitle className="uppercase text-red-600 text-xl md:text-2xl">
                                    MarkSheet Verification
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Input
                                    placeholder="Registration no."
                                    value={registration}
                                    onChange={(e) =>
                                        setRegistration(e.target.value)
                                    }
                                    className="bg-white dark:focus:ring-offset-white"
                                />
                            </CardContent>
                            <CardFooter>
                                <Button
                                    variant={"destructive"}
                                    disabled={isPending}
                                    className="w-full"
                                    onClick={() => mutate()}
                                >
                                    {isPending ? (
                                        <Loader className="animate-spin" />
                                    ) : (
                                        "Search"
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* CERTIFICATE VERIFICATION */}

                    <TabsContent value="certificate">
                        <Card className="bg-transparent">
                            <CardHeader>
                                <CardTitle className="uppercase text-red-600 text-xl md:text-2xl">
                                    Certificate Verification
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Input
                                    placeholder="Registration no."
                                    value={registration}
                                    onChange={(e) =>
                                        setRegistration(e.target.value)
                                    }
                                    className="bg-white dark:focus:ring-offset-white"
                                />
                            </CardContent>
                            <CardFooter>
                                <Button
                                    onClick={() => mutate()}
                                    variant={"destructive"}
                                    disabled={isPending}
                                    className="w-full"
                                >
                                    {isPending ? (
                                        <Loader className="animate-spin" />
                                    ) : (
                                        "Search"
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* STUDENT REGISTRATION */}
                {data?.student && tab === "registration" && (
                    <RegistrationVerify
                        img={data?.student?.img}
                        branch={data?.student?.branchName}
                        branchCode={data?.student?.branch}
                        name={data?.student?.name}
                        fatherName={data?.student?.fatherName}
                        course={data?.student?.course}
                        registration={data?.student?.formNumber}
                    />
                )}

                {/* STUDENT I-CARD  */}

                {data?.student && tab === "icard" && <div>I card here</div>}

                {/* MARKSHEET */}
                {data?.student && tab === "marksheet" && (
                    <MarkSheet student={data?.student} />
                )}

                {/* CERTIFICATE */}
                {data?.student && tab === "certificate" && (
                    <Certificate student={data?.student} />
                )}
            </div>

            {/* FOOTER */}
            <Footer />
        </>
    );
}
