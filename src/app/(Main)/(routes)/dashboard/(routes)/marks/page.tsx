"use client";

import ComputerTypingEnteredMarks from "@/components/Dashboard/marks/computer-typing-students-marks-list";
import GeneralEntredMarks from "@/components/Dashboard/marks/general-mark-list";
import GeneralMarksEntry from "@/components/Dashboard/marks/general-marks-entry";
import TypingMarksEntry from "@/components/Dashboard/marks/computer-typing-marks-entry";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileSpreadsheet, TextCursorInput } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Marks = () => {
    const searchParams = useSearchParams();
    const typing = Boolean(searchParams.get("typing")) || false;
    const [tab, setTab] = useState(typing ? "typing" : "general");
    const [tabM, setTabM] = useState(
        typing ? "typingEntered" : "generalEntered"
    );
    const page = searchParams.get("page");
    const registration = searchParams.get("registration");

    useEffect(() => {
        setTab(typing ? "typing" : "general");
        setTabM(typing ? "typingEntered" : "generalEntered");
    }, [typing]);
    return (
        <div className="flex flex-col items-center py-3 px-3 gap-6">
            <div className="w-full ">
                <h1 className="text-xl flex gap-1 items-center justify-center font-semibold">
                    <FileSpreadsheet className="w-8 h-8 text-green-400" /> Marks
                    Entry
                </h1>
            </div>
            <div className="flex gap-8 flex-wrap flex-col xl:flex-row">
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
                        <GeneralMarksEntry />
                    </TabsContent>
                    <TabsContent value="typing">
                        <TypingMarksEntry />
                    </TabsContent>
                </Tabs>
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
                        />
                    </TabsContent>
                    <TabsContent value="typingEntered">
                        <ComputerTypingEnteredMarks
                            page={page}
                            registration={registration}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Marks;
