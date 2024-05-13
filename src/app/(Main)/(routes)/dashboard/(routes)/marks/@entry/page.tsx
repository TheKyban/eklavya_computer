"use client";
import { FileSpreadsheet, TextCursorInput } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import GeneralMarksEntry from "@/components/Dashboard/marks/general-marks-entry";
import TypingMarksEntry from "@/components/Dashboard/marks/computer-typing-marks-entry";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EntryPage() {
    const searchParams = useSearchParams();
    const typing = searchParams.get("typing") === "true" ? true : false;
    const [tab, setTab] = useState(typing ? "typing" : "general");
    return (
        <div className="w-full flex flex-col gap-5">
            <div className="w-full ">
                <h1 className="text-xl flex gap-1 items-center justify-center font-semibold">
                    <FileSpreadsheet className="w-8 h-8 text-green-400" /> Marks
                    Entry
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
                    <GeneralMarksEntry />
                </TabsContent>
                <TabsContent value="typing">
                    <TypingMarksEntry />
                </TabsContent>
            </Tabs>
        </div>
    );
}
