import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Users } from "lucide-react";
import { HTMLAttributes } from "react";

interface props extends HTMLAttributes<HTMLDivElement> {
    user: string;
    setUser: (user: string) => void;
    isLoading?: boolean;
    branches: { branch: string; userId: string }[];
}
export const UserBranchList = ({
    user,
    setUser,
    isLoading,
    branches,
    className,
    ...more
}: props) => {
    return (
        <div className={cn("flex flex-col gap-2", className)} {...more}>
            <div className="flex gap-1 items-center">
                <Users className="w-5 h-5 text-teal-500" />
                <span>USER ID</span>
            </div>
            <Select
                defaultValue={user}
                value={user}
                onValueChange={(val) => setUser(val)}
                disabled={isLoading}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select User" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {branches?.map((branch) => (
                            <SelectItem
                                key={branch.userId}
                                value={branch.userId}
                            >
                                {branch.userId} - {branch?.branch}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};
