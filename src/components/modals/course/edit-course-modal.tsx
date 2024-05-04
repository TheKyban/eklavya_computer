"use client";
import { useModal } from "@/hooks/use-modal-store";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader, Trash } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "@/components/ui/use-toast";
import { courseEditSchema } from "@/lib/schema";
import { useMutation } from "@tanstack/react-query";
import { useCustumQuery } from "@/hooks/use-queries";
import { Textarea } from "../../ui/textarea";
import { duration } from "@/lib/constants";

export const EditCourseModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "editCourse";
    const { course } = data;
    const [isDeleting, setIsDeleting] = useState(false);

    const form = useForm<z.infer<typeof courseEditSchema>>({
        resolver: zodResolver(courseEditSchema),
        defaultValues: {
            duration: "",
            fullName: "",
            modules: "",
            name: "",
            id: "",
        },
    });

    useEffect(() => {
        if (!!course) {
            form.setValue("fullName", course?.fullName);
            form.setValue("name", course?.name);
            form.setValue("duration", course?.duration);
            form.setValue("id", course?.id);
            form.setValue("modules", course?.modules || "");
        }
    }, [data, form, course]);

    const { updateData, removeData } = useCustumQuery();
    const { mutate, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof courseEditSchema>) => {
            const { data } = await axios.put("/api/course", values);
            return data;
        },

        onSuccess(data) {
            if (data) {
                toast({ description: data.message });
            }
            if (data.success) {
                form.reset();
                onClose();
                updateData(["courses_list"], data?.course);
            }
        },
        onError(error: AxiosError<{ message: string; succuss: boolean }>) {
            toast({ description: error.response?.data?.message });
        },
    });

    const handleRemove = async (id: string) => {
        try {
            setIsDeleting(true);
            const { data } = await axios.delete(`/api/course?id=${id}`);
            toast({ description: data.message });
            if (data.success) {
                removeData(["courses_list"], course?.id!);
                form.reset();
                onClose();
            }
        } catch (error) {
            toast({
                description: (
                    error as AxiosError<{ message: string; succuss: boolean }>
                ).response?.data?.message,
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Course</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((value) => mutate(value))}
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
                        {/* BTNS */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-3">
                            <Button
                                variant={"primary"}
                                disabled={isPending || !form.formState.isDirty}
                                type="submit"
                                className="w-full"
                            >
                                {isPending ? (
                                    <Loader className="animate-spin" />
                                ) : (
                                    "Update"
                                )}
                            </Button>
                            <Button
                                variant={"destructive"}
                                disabled={isDeleting}
                                type="button"
                                onClick={() => handleRemove(course?.id!)}
                            >
                                {isDeleting ? (
                                    <Loader className="animate-spin" />
                                ) : (
                                    <Trash className="w-5 h-5" />
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
