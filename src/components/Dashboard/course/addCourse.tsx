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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useCustumQuery } from "@/hooks/use-queries";
import { duration } from "@/lib/constants";
import { courseSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const AddCourse = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<z.infer<typeof courseSchema>>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            name: "",
            duration: "",
            fullName: "",
            modules: "",
        },
    });

    const { addData } = useCustumQuery();
    const onSubmit = async (values: z.infer<typeof courseSchema>) => {
        try {
            setIsSubmitting(true);
            const { data } = await axios.post("/api/course", values);
            toast({ description: data?.message });

            if (data?.success) {
                form.reset();
                addData(["courses_list"], data?.course);
            }
        } catch (error) {
            console.log(error);
            toast({
                description: (error as AxiosError<{ message: string }>).response
                    ?.data?.message,
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Add Course</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((values) =>
                            onSubmit(values)
                        )}
                    >
                        {/* Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter course name."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/*Full Name */}
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter course full name."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/*Duration */}
                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Duration</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select course duration" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Course Duration
                                                    </SelectLabel>
                                                    {duration?.map(
                                                        (duration) => (
                                                            <SelectItem
                                                                key={duration}
                                                                value={duration}
                                                            >
                                                                {duration}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Modules */}
                        <FormField
                            control={form.control}
                            name="modules"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Modules</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="max-h-28 h-28"
                                            placeholder="Enter course full name."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button variant={"secondary"} className="mt-3 w-full">
                            {isSubmitting ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                "ADD"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
