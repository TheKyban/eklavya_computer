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
    const typing = searchParams.get("typing") === "true" ? true : false;
    const [tabM, setTabM] = useState(
        typing ? "typingEntered" : "generalEntered",
    );
    const page = searchParams.get("page");
    const registration = searchParams.get("registration");

    return (
        <div className="w-full flex flex-col gap-5">
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
    );
};

export default Marks;
