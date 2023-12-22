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
import { Label } from "@/components/ui/label";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CircleUser, Loader, Loader2, Smile } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { typingSpeedMarkSchema } from "@/lib/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const EditComputerTypingMarksModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "editComputerTypingMarks";
    const { computerTypingMarks, searchParams } = data;
    const form = useForm<z.infer<typeof typingSpeedMarkSchema>>({
        resolver: zodResolver(typingSpeedMarkSchema),
        defaultValues: {
            formNumber: "",
            hindiTyping: 0,
            englishTyping: 0,
        },
    });

    useEffect(() => {
        if (computerTypingMarks) {
            form.setValue("formNumber", computerTypingMarks.formNumber);
            form.setValue("hindiTyping", computerTypingMarks.hindiTyping);
            form.setValue("englishTyping", computerTypingMarks.englishTyping);
        }
    }, [form, computerTypingMarks]);
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof typingSpeedMarkSchema>) => {
            const { data } = await axios.put(
                "/api/marks?computerTyping=true",
                values
            );
            return data;
        },

        onSuccess(data, variables) {
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
            queryClient.setQueryData(
                [
                    "computer-typing-students-entered",
                    searchParams?.page,
                    searchParams?.registration,
                ],
                (oldMarks: {
                    total: number;
                    studentsWithMarks: z.infer<typeof typingSpeedMarkSchema>[];
                }) => {
                    const studentsWithMarks = oldMarks.studentsWithMarks.map(
                        (mark) => {
                            return mark.formNumber === variables.formNumber
                                ? variables
                                : mark;
                        }
                    );

                    return {
                        total: oldMarks.total,
                        studentsWithMarks,
                    };
                }
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
                            name="formNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Registration Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            readOnly
                                            placeholder="Registration Number"
                                        />
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
