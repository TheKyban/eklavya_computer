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
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";
import { Student } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";
import { MIN_HEIGHT } from "@/lib/styles";

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
            const { data } = await axios.get(
                `/api/student/${registration}?type=${tab}`
            );
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
                className={`flex flex-col w-full min-h-[${MIN_HEIGHT}] gap-5 px-2 py-16`}
            >
                {/* TAB */}
                <Tabs
                    className="max-w-xl lg:min-w-[500px] m-auto"
                    defaultValue={"registration"}
                    value={tab}
                    onValueChange={(e) => {
                        setTab(e);
                        setRegistration("");
                    }}
                >
                    {/* TAB LIST */}

                    <TabsList className="w-full">
                        <TabsTrigger className="w-full" value="registration">
                            REGISTRATION
                        </TabsTrigger>
                        <TabsTrigger className="w-full" value="icard">
                            I CARD
                        </TabsTrigger>
                        <TabsTrigger className="w-full" value="marksheet">
                            MARKSHEET
                        </TabsTrigger>
                        <TabsTrigger className="w-full" value="certificate">
                            CERTIFICATE
                        </TabsTrigger>
                    </TabsList>

                    {/* REGISTRATION  TAB  */}

                    <TabsContent value="registration">
                        <Card className="bg-transparent">
                            <CardHeader>
                                <CardTitle>Registratio Verification</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Input
                                    placeholder="Registration no."
                                    value={registration}
                                    onChange={(e) =>
                                        setRegistration(e.target.value)
                                    }
                                />
                            </CardContent>
                            <CardFooter>
                                <Button
                                    variant={"primary"}
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
                                <CardTitle>I Card Verification</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Input
                                    placeholder="Registration no."
                                    value={registration}
                                    onChange={(e) =>
                                        setRegistration(e.target.value)
                                    }
                                />
                            </CardContent>
                            <CardFooter>
                                <Button
                                    variant={"primary"}
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
                                <CardTitle>MarkSheet Verification</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Input
                                    placeholder="Registration no."
                                    value={registration}
                                    onChange={(e) =>
                                        setRegistration(e.target.value)
                                    }
                                />
                            </CardContent>
                            <CardFooter>
                                <Button
                                    variant={"primary"}
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
                                <CardTitle>Certificate Verification</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Input
                                    placeholder="Registration no."
                                    value={registration}
                                    onChange={(e) =>
                                        setRegistration(e.target.value)
                                    }
                                />
                            </CardContent>
                            <CardFooter>
                                <Button
                                    onClick={() => mutate()}
                                    variant={"primary"}
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

const RegistrationVerify = ({
    registration,
    name,
    fatherName,
    course,
    branch,
    branchCode,
    img,
}: {
    registration: string;
    name: string;
    fatherName: string;
    course: string;
    branch: string;
    branchCode: string;
    img: string;
}) => {
    return (
        <Card
            id={styles.registrationVerify}
            className="m-auto max-w-xl lg:min-w-[500px] relative bg-transparent py-4"
        >
            <CardContent>
                <Image src={img} height={100} width={100} alt="profile img" />
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-semibold">
                                Registration
                            </TableCell>
                            <TableCell>{registration}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">
                                Name
                            </TableCell>
                            <TableCell className="capitalize">{name}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="font-semibold">
                                Father&apos;s Name
                            </TableCell>
                            <TableCell className="capitalize">
                                {fatherName}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">
                                Course
                            </TableCell>
                            <TableCell>{course}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">
                                Branch Name
                            </TableCell>
                            <TableCell className="capitalize">
                                {branch}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">
                                Branch Code
                            </TableCell>
                            <TableCell>{branchCode}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
