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
import { FormEvent, useState } from "react";
import axios from "axios";
import { Loader } from "lucide-react";
import { Student } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";
import { MAX_WIDTH, MIN_HEIGHT } from "@/lib/styles";
import {
    Certificate,
    ICard,
    MarkSheet,
    RegistrationVerify,
} from "@/components/student-zone";

export default function StudentZone() {
    const [registration, setRegistration] = useState("");
    const [tab, setTab] = useState("registration");
    const [data, setData] = useState<{
        student: Student & { branchName: string };
    }>();
    const [isLoading, setIsLoading] = useState(false);

    /**
     * FUNCTION FOR SEARCH
     */

    const handleSeach = async (e: FormEvent) => {
        e?.preventDefault();
        if (!registration) return;
        try {
            setIsLoading(true);
            const { data } = await axios.get(`/api/student/${registration}`);
            if (!!data?.message) {
                toast({ description: (data.message as string).toUpperCase() });
            }
            setData(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
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
                        <Card className="bg-transparent mb-4">
                            <CardHeader>
                                <CardTitle className="uppercase text-red-600 text-xl md:text-2xl">
                                    Registration Verification
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={handleSeach}
                                    className="flex flex-col gap-5"
                                >
                                    <Input
                                        placeholder="Registration no."
                                        value={registration}
                                        onChange={(e) =>
                                            setRegistration(e.target.value)
                                        }
                                        className="bg-white dark:focus:ring-offset-white"
                                    />
                                    <Button
                                        variant={"destructive"}
                                        disabled={isLoading}
                                        className="w-full"
                                        type="submit"
                                    >
                                        {isLoading ? (
                                            <Loader className="animate-spin" />
                                        ) : (
                                            "Search"
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

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
                    </TabsContent>

                    {/* I CARD VERIFICATION  */}

                    <TabsContent value="icard">
                        <ICard />
                    </TabsContent>

                    {/* MARKSHEET VERIFICATION */}

                    <TabsContent value="marksheet">
                        <MarkSheet />
                    </TabsContent>

                    {/* CERTIFICATE VERIFICATION */}

                    <TabsContent value="certificate">
                        <Certificate />
                    </TabsContent>
                </Tabs>

                {/* STUDENT REGISTRATION */}
            </div>

            {/* FOOTER */}
            <Footer />
        </>
    );
}
