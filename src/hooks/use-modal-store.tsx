import { Student, User } from "@prisma/client";
import { create } from "zustand";
import { generalMarksSchema, typingSpeedMarkSchema } from "@/lib/schema";
import { z } from "zod";

export type ModalType =
    | "User"
    | "deleteUser"
    | "editStudent"
    | "deleteStudent"
    | "editGeneralMarks"
    | "deleteGeneralMarks"
    | "editComputerTypingMarks"
    | "deleteComputerTypingMarks";

interface ModalData {
    user?: User;
    student?: Student;
    searchParams?: {
        page?: string;
        userId?: string | null;
        registration?: string;
        type?: string;
    };
    generalMarks?: z.infer<typeof generalMarksSchema>;
    computerTypingMarks?: z.infer<typeof typingSpeedMarkSchema>;
}

interface modalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<modalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false }),
}));
