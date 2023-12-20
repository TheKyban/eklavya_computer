"use client";

import GeneralMarksEntry from "@/components/Dashboard/marks/general-marks-entry";
import TypingMarksEntry from "@/components/Dashboard/marks/typing-marks-entry";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileSpreadsheet, TextCursorInput } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface pageProps {}

const Marks: FC<pageProps> = () => {
    const searchParams = useSearchParams();
    const typing = Boolean(searchParams.get("typing")) || false;
    const [tab, setTab] = useState(typing ? "typing" : "general");
    useEffect(() => {
        setTab(typing ? "typing" : "general");
    }, [typing]);
    return (
        <div className="flex flex-col items-center py-3 px-3 gap-6">
            <div className="w-full ">
                <h1 className="text-xl flex gap-1 items-center font-semibold">
                    <FileSpreadsheet className="w-8 h-8 text-green-400" /> Marks
                    Entry
                </h1>
            </div>

            <Tabs
                defaultValue={"general"}
                className="sm:w-[400px]"
                value={tab ? tab : "general"}
                onValueChange={(value: string) => setTab(value)}
            >
                <TabsList className="grid w-full grid-cols-2 h-12 px-2">
                    <TabsTrigger value="general">
                        <FileSpreadsheet className="text-green-400 w-5 h-5 mr-1" />{" "}
                        General
                    </TabsTrigger>
                    <TabsTrigger value="typing">
                        {" "}
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
};

export default Marks;
