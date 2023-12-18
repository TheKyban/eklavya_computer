import Search from "@/components/search/search";
import { UserCog } from "lucide-react";
import React from "react";

const StudentVerification = () => {
    return (
        <div className="px-5 py-4 flex flex-col gap-4">
            <div className="flex justify-between">
                <h1 className="flex items-center gap-3 lg:text-xl uppercase font-semibold text-teal-700">
                    <UserCog className="text-red-600 w-6 h-6" />
                    Student Verification
                </h1>
                <Search
                    className="w-36 md:w-44"
                    placeholder="Registration"
                    queryName="registration"
                />
            </div>
        </div>
    );
};

export default StudentVerification;
