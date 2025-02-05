"use client";

import TypingMarksEntry from "@/components/Dashboard/marks/computer-typing-marks-entry";
import ComputerTypingEnteredMarks from "@/components/Dashboard/marks/computer-typing-students-marks-list";
import GeneralEntredMarks from "@/components/Dashboard/marks/general-mark-list";
import GeneralMarksEntry from "@/components/Dashboard/marks/general-marks-entry";
import { UserBranchList } from "@/components/Dashboard/UserBranchList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileSpreadsheet, TextCursorInput } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const MarksPage = ({
    branches,
    isAdmin,
}: {
    branches?: { branch: string; userId: string }[];
    isAdmin?: boolean;
}) => {
    const searchParams = useSearchParams();
    const typing = searchParams?.get("typing") === "true" ? true : false;
    const [tabM, setTabM] = useState(
        typing ? "typingEntered" : "generalEntered",
    );
    const [tab, setTab] = useState(typing ? "typing" : "general");
    const page = searchParams?.get("page") || "1";
    const registration = searchParams?.get("registration") || "";

    const [user, setUser] = useState(branches?.[0].userId);

    return (
        <div className="w-full h-full space-y-6 p-3 container">
            {user && branches && isAdmin && (
                <UserBranchList
                    user={user}
                    setUser={(val) => setUser(val)}
                    branches={branches}
                />
            )}
            <div className="w-full h-full flex flex-wrap gap-8 flex-col lg:flex-row items-center justify-center">
                {/* Entery */}
                <div className="flex flex-col gap-5">
                    <div className="w-full ">
                        <h1 className="text-xl flex gap-1 items-center justify-center font-semibold">
                            <FileSpreadsheet className="w-8 h-8 text-green-400" />{" "}
                            Marks Entry
                        </h1>
                    </div>
                    <Tabs
                        defaultValue={"general"}
                        className="w-[300px] sm:w-[400px] mx-auto"
                        value={tab ? tab : "general"}
                        onValueChange={(value: string) => setTab(value)}
                    >
                        <TabsList className="grid w-full grid-cols-2 h-12 px-2">
                            <TabsTrigger value="general">
                                <FileSpreadsheet className="text-green-400 w-5 h-5 mr-1" />{" "}
                                General
                            </TabsTrigger>
                            <TabsTrigger value="typing">
                                <TextCursorInput className="text-orange-400 w-5 h-5 mr-1" />
                                Typing
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="general">
                            <GeneralMarksEntry
                                isAdmin={isAdmin}
                                userId={user}
                            />
                        </TabsContent>
                        <TabsContent value="typing">
                            <TypingMarksEntry isAdmin={isAdmin} userId={user} />
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Entered */}
                <div className="flex lg:self-start flex-col gap-5">
                    <div className="w-full ">
                        <h1 className="text-xl flex gap-1 items-center justify-center font-semibold">
                            <FileSpreadsheet className="w-8 h-8 text-blue-400" />
                            Entered Marks
                        </h1>
                    </div>
                    <Tabs
                        defaultValue={"generalEntered"}
                        value={tabM ? tabM : "generalEntered"}
                        onValueChange={(value: string) => setTabM(value)}
                        className="w-[350px] md:w-[550px] xl:w-[650px] mx-auto"
                    >
                        <TabsList className="grid w-full grid-cols-2 h-12 px-2">
                            <TabsTrigger
                                value="generalEntered"
                                className="min-w-[50px]"
                            >
                                <FileSpreadsheet className="text-green-400 w-5 h-5 mr-1" />{" "}
                                General List
                            </TabsTrigger>
                            <TabsTrigger value="typingEntered">
                                <TextCursorInput className="text-orange-400 w-5 h-5 mr-1" />
                                Typing List
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="generalEntered">
                            <GeneralEntredMarks
                                page={page}
                                registration={registration}
                                isAdmin={isAdmin}
                                userId={user}
                            />
                        </TabsContent>
                        <TabsContent value="typingEntered">
                            <ComputerTypingEnteredMarks
                                page={page}
                                registration={registration}
                                isAdmin={isAdmin}
                                userId={user}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default MarksPage;
