"use client";
import { useModal } from "@/hooks/use-modal-store";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { GENERAL_COURSE_MARKS_SCHEMA } from "@/lib/SCHEMA";
import { useMutation } from "@tanstack/react-query";
import { useCustumQuery } from "@/hooks/use-queries";

export const EditGeneralMarks = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "editGeneralMarks";
    const { generalMarks, searchParams } = data;
    const form = useForm<z.infer<typeof GENERAL_COURSE_MARKS_SCHEMA>>({
        resolver: zodResolver(GENERAL_COURSE_MARKS_SCHEMA),
        defaultValues: {
            practical: 0,
            project: 0,
            viva: 0,
            written: 0,
        },
    });

    useEffect(() => {
        if (generalMarks) {
            form.setValue("registration", generalMarks.registration);
            form.setValue("practical", generalMarks.practical);
            form.setValue("written", generalMarks.written);
            form.setValue("viva", generalMarks.viva);
            form.setValue("project", generalMarks.project);
        }
    }, [form, generalMarks]);
    const { updateMark } = useCustumQuery();
    const { mutate, isPending } = useMutation({
        mutationFn: async (
            values: z.infer<typeof GENERAL_COURSE_MARKS_SCHEMA>,
        ) => {
            const { data } = await axios.put("/api/marks", values);
            return data;
        },

        onSuccess(data) {
            if (data) {
                toast({ description: data.message });
            }
            if (data.success) {
                form.reset();
                onClose();
            }

            /**
             * Replacing marks with updated marks
             */
            updateMark(
                [
                    "general-students-entered",
                    searchParams?.page || "1",
                    searchParams?.registration || "none",
                    false,
                ],
                {
                    marks: data?.marks,
                },
            );
        },
    });

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Marks</DialogTitle>
                </DialogHeader>

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
                                        <Input
                                            {...field}
                                            readOnly
                                            placeholder="Written marks"
                                        />
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
                                "Update"
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
