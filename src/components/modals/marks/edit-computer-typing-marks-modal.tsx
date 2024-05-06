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
import { typingSpeedMarkSchema } from "@/lib/schema";
import { useMutation } from "@tanstack/react-query";
import { useCustumQuery } from "@/hooks/use-queries";

export const EditComputerTypingMarksModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "editComputerTypingMarks";
    const { computerTypingMarks, searchParams } = data;
    const form = useForm<z.infer<typeof typingSpeedMarkSchema>>({
        resolver: zodResolver(typingSpeedMarkSchema),
        defaultValues: {
            registration: "",
            hindiTyping: 0,
            englishTyping: 0,
        },
    });

    useEffect(() => {
        if (computerTypingMarks) {
            form.setValue("registration", computerTypingMarks.registration);
            form.setValue("hindiTyping", computerTypingMarks.hindiTyping);
            form.setValue("englishTyping", computerTypingMarks.englishTyping);
        }
    }, [form, computerTypingMarks]);

    const { updateMark } = useCustumQuery();

    const { mutate, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof typingSpeedMarkSchema>) => {
            const { data } = await axios.put(
                "/api/marks?computerTyping=true",
                values,
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
            updateMark(
                [
                    "general-students-entered",
                    searchParams?.page || "1",
                    searchParams?.registration || "none",
                    true,
                ],
                { marks: data?.marks },
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
                                                    Number(e.target.value),
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
                                                    Number(e.target.value),
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
