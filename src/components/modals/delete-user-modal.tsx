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
import { User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCustumQuery } from "@/hooks/use-queries";

export const DeleteUserModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "deleteUser";
    const { user, searchParams } = data;
    const queryClient = useQueryClient();

    const { removeUser } = useCustumQuery();

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.delete(
                `/api/users?userId=${user?.userId}`
            );
            return data;
        },
        onSuccess(data) {
            if (data) {
                toast({ description: data?.message });
                onClose();
            }
            if (!!data?.success) {
                removeUser(
                    [
                        "users",
                        searchParams?.page || "1",
                        searchParams?.userId || "",
                    ],
                    user?.id as string
                );
            }
        },
    });

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete User
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to do this? <br />
                        <span className="font-semibold text-indigo-500">
                            {user?.branch}
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
