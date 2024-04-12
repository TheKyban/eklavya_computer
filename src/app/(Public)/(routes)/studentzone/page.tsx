"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { MAX_WIDTH, MIN_HEIGHT } from "@/lib/styles";
import {
    Certificate,
    ICard,
    MarkSheet,
    RegistrationVerify,
} from "@/components/student-zone";

export default function StudentZone() {
    const [tab, setTab] = useState("registration");

    return (
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
                    <RegistrationVerify />
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
        </div>
    );
}
