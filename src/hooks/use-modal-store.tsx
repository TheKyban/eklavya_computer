import {
    Course,
    Student,
    StudentApplication,
    User,
    UserApplication,
} from "@prisma/client";
import { create } from "zustand";
import {
    GENERAL_COURSE_MARKS_SCHEMA,
    COMPUTER_TYPING_MARKS_SCHEMA,
} from "@/lib/SCHEMA";
import { z } from "zod";

export type ModalType =
    | "User"
    | "deleteUser"
    | "editStudent"
    | "deleteStudent"
    | "editGeneralMarks"
    | "deleteGeneralMarks"
    | "editComputerTypingMarks"
    | "deleteComputerTypingMarks"
    | "studentApplication"
    | "userApplication"
    | "editCourse";

interface ModalData {
    user?: User;
    student?: Student;
    searchParams?: {
        page?: string;
        userId?: string | null;
        registration?: string;
        type?: string;
    };
    generalMarks?: z.infer<typeof GENERAL_COURSE_MARKS_SCHEMA>;
    computerTypingMarks?: z.infer<typeof COMPUTER_TYPING_MARKS_SCHEMA>;
    studentApplication?: StudentApplication;
    userApplication?: UserApplication;
    course?: Course;
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
