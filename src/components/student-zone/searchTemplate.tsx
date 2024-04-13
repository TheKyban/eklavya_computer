import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FC, FormEvent, HTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    searchFunc: (e: FormEvent) => void;
    title: string;
    registration: string;
    setRegistration: (val: string) => void;
    btnText?: string;
    isLoading: boolean;
}
export const SearchTemplate: FC<CardProps> = ({
    searchFunc,
    title,
    registration,
    setRegistration,
    isLoading,
    className,
    btnText,
    ...props
}) => {
    return (
        <Card className={cn("bg-transparent", className)} {...props}>
            <CardHeader>
                <CardTitle className="uppercase text-red-600 text-xl md:text-2xl">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={searchFunc} className="flex flex-col gap-5">
                    <Input
                        placeholder="Registration no."
                        value={registration}
                        onChange={(e) => setRegistration(e.target.value)}
                        className="bg-white dark:focus:ring-offset-white"
                        autoFocus
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
                            btnText || "Search"
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};
