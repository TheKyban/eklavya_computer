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
import { GENERAL_COURSE_MARKS_SCHEMA } from "@/lib/SCHEMA";
import { zodResolver } from "@hookform/resolvers/zod";
import { Marks } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FileSpreadsheet, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const GeneralMarksEntry = ({
    isAdmin,
    userId,
}: {
    isAdmin?: boolean;
    userId?: string | number;
}) => {
    const form = useForm<z.infer<typeof GENERAL_COURSE_MARKS_SCHEMA>>({
        resolver: zodResolver(GENERAL_COURSE_MARKS_SCHEMA),
        defaultValues: {
            practical: 0,
            project: 0,
            viva: 0,
            written: 0,
        },
    });

    const { data, isLoading } = useStudentMark(false, isAdmin, userId);
    const { removeRegistrationNumberFromUnMarkedList, addMark } =
        useCustumQuery();

    const { mutate, isPending } = useMutation({
        mutationFn: async (
            values: z.infer<typeof GENERAL_COURSE_MARKS_SCHEMA>,
        ) => {
            const { data } = await axios.post<{
                message: string;
                success: boolean;
                marks?: Marks;
            }>("/api/marks", values);
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
             * Removing registration number from entry list
             */
            removeRegistrationNumberFromUnMarkedList(
                ["computer-students-mark", false, isAdmin, userId],
                Number(data?.marks?.studentRegistrationNumber),
            );

            /**
             * Adding registration and marks to entered list
             */
            addMark(
                [
                    "general-students-entered",
                    "1",
                    "none",
                    false,
                    isAdmin,
                    userId,
                ],
                {
                    marks: data?.marks!,
                },
            );
        },
    });
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex gap-2 text-zinc-700">
                    <FileSpreadsheet className="text-green-400" /> General Marks
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
                                                                student?.registration!
                                                            }
                                                            value={`${student?.registration}`}
                                                        >
                                                            {
                                                                student?.registration
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
                        {/* WRITTEN */}
                        <FormField
                            control={form.control}
                            name="written"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Written Marks</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    Number(e.target.value),
                                                )
                                            }
                                            placeholder="Written marks"
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Practical */}
                        <FormField
                            control={form.control}
                            name="practical"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Practical Marks</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    Number(e.target.value),
                                                )
                                            }
                                            placeholder="Practical marks"
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Viva */}
                        <FormField
                            control={form.control}
                            name="viva"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Viva Marks</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    Number(e.target.value),
                                                )
                                            }
                                            placeholder="Viva marks"
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Projects */}
                        <FormField
                            control={form.control}
                            name="project"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Marks</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    Number(e.target.value),
                                                )
                                            }
                                            placeholder="Project marks"
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            variant={"primary"}
                            className="w-full"
                            disabled={isPending}
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

export default GeneralMarksEntry;
