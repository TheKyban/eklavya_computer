"use client";
import { useModal } from "@/hooks/use-modal-store";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Loader } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { studentSchema } from "@/lib/schema";
import { z } from "zod";

export const DeleteStudentModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "deleteStudent";
    const { student, searchParams } = data;

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.delete(
                `/api/student?formNumber=${student?.formNumber}`
            );
            return data;
        },
        onSuccess(data) {
            if (data) {
                toast({ description: data?.message });
                onClose();
            }
            if (!!data?.success) {
                queryClient.setQueryData(
                    [
                        searchParams?.type,
                        searchParams?.page,
                        searchParams?.registration,
                    ],
                    (old: {
                        total: number;
                        students: z.infer<typeof studentSchema>[];
                    }) => {
                        const students = old.students.filter(
                            (oldStudent) =>
                                oldStudent.formNumber !== student?.formNumber
                        );
                        return {
                            total: old.total,
                            students,
                        };
                    }
                );
            }
        },
    });

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Student
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to do this? <br />
                        <span className="font-semibold text-indigo-500">
                            {student?.name}
                        </span>{" "}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="bg-gray-100 dark:bg-zinc-950 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button
                            disabled={isPending}
                            variant={"ghost"}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant={"primary"}
                            disabled={isPending}
                            onClick={() => mutate()}
                        >
                            {isPending ? (
                                <Loader className="animate-spin" />
                            ) : (
                                "Confirm"
                            )}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
