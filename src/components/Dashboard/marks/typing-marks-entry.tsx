"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { typingSpeedMarkSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, TextCursorInput } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type queryType = { formNumber: string };

const TypingMarksEntry = () => {
    const form = useForm<z.infer<typeof typingSpeedMarkSchema>>({
        resolver: zodResolver(typingSpeedMarkSchema),
        defaultValues: {
            hindi: 0,
            english: 0,
        },
    });
    const { data, isLoading } = useQuery<queryType[]>({
        queryKey: ["computer-typing-students"],
        queryFn: async () => {
            const { data } = await axios("/api/marks?computerTyping=true");
            console.log(data);
            return data;
        },
    });
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof typingSpeedMarkSchema>) => {
            const { data } = await axios.post(
                "/api/marks?computerTyping=true",
                values
            );
            return data;
        },
        onSuccess: (data, variables) => {
            if (data) {
                toast({ description: data?.message });
            }
            if (data?.success) {
                form.reset();
            }

            queryClient.setQueryData(
                ["computer-typing-students"],
                (oldData: queryType[]) => {
                    console.log(oldData);
                    return oldData.filter(
                        (data) =>
                            Number(data?.formNumber) !==
                            Number(variables.formNumber)
                    );
                }
            );
        },
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex gap-2 text-zinc-700 items-center">
                    <TextCursorInput className="text-orange-400 " />
                    <span>Typing Marks</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((values) => mutate(values))}
                        className="flex flex-col gap-3"
                    >
                        {/* REGISTRATION NUMBER */}
                        <FormField
                            control={form.control}
                            name="formNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Registration Number</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Registration no." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Registration number
                                                    </SelectLabel>
                                                    {isLoading && (
                                                        <SelectItem value="loading">
                                                            Loading
                                                        </SelectItem>
                                                    )}
                                                    {data?.map((student) => (
                                                        <SelectItem
                                                            key={
                                                                student.formNumber
                                                            }
                                                            value={
                                                                student.formNumber
                                                            }
                                                        >
                                                            {student.formNumber}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* ENGLISH */}
                        <FormField
                            control={form.control}
                            name="english"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>English Typing Marks</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    Number(e.target.value)
                                                )
                                            }
                                            placeholder="Hindi typing marks"
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* HINDI */}
                        <FormField
                            control={form.control}
                            name="hindi"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hindi Typing Marks</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    Number(e.target.value)
                                                )
                                            }
                                            placeholder="Hindi typing marks"
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            variant={"primary"}
                            disabled={isPending}
                            className="w-full"
                        >
                            {isPending ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default TypingMarksEntry;
