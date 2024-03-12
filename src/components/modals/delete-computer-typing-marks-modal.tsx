"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { toast } from "@/components/ui/use-toast";
import { Loader } from "lucide-react";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import { useMutation } from "@tanstack/react-query";
import { useCustumQuery } from "@/hooks/use-queries";

export const DeleteComputerTypingMarksModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "deleteComputerTypingMarks";
    const { computerTypingMarks, searchParams } = data;
    const { addFormNumber, removeMark } = useCustumQuery();

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.delete(
                `/api/marks?computerTyping=true&formNumber=${computerTypingMarks?.formNumber}`
            );
            return data;
        },

        onSuccess(data, variables, context) {
            if (data) {
                toast({ description: data?.message });
            }

            if (data?.success) {
                onClose();
            }

            /**
             * REMOVING MARKS FROM ENTERED LIST
             */
            removeMark(
                [
                    "general-students-entered",
                    searchParams?.page || "1",
                    "none",
                    true,
                ],
                computerTypingMarks?.formNumber as string
            );

            /**
             * ADD REGISTRATION NUMBER TO ENTERY LIST
             */

            addFormNumber(
                ["computer-students-mark", true],
                Number(computerTypingMarks?.formNumber)
            );
        },
    });

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Marks
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to do this? <br />
                        <span className="font-semibold text-indigo-500">
                            {computerTypingMarks?.formNumber}
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
