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
import { useCustumQuery } from "@/hooks/use-queries";
import { useStudentMark } from "@/hooks/useFetch";
import { typingSpeedMarkSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, TextCursorInput } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const TypingMarksEntry = () => {
    const form = useForm<z.infer<typeof typingSpeedMarkSchema>>({
        resolver: zodResolver(typingSpeedMarkSchema),
        defaultValues: {
            hindiTyping: 0,
            englishTyping: 0,
        },
    });
    const { data, isLoading } = useStudentMark(true);
    const { removeFormNumber, addMark } = useCustumQuery();
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

            /**
             * TODO all
             */

            /**
             * Removing registration number from entry list
             */

            removeFormNumber(
                ["computer-students-mark", true],
                Number(variables.registration)
            );

            /**
             * Adding registration number and marks to entered list
             */
            addMark(["general-students-entered", "1", "none", true], variables);
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
                            name="registration"
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
                                                                student.registration
                                                            }
                                                            value={
                                                                student.registration
                                                            }
                                                        >
                                                            {
                                                                student.registration
                                                            }
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
                            name="englishTyping"
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
                            name="hindiTyping"
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
