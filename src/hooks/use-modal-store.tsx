import {
    Course,
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
import { StudentWithAllDetails } from "@/lib/TYPES";

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
    | "editCourse"
    | "issueCertificate"
    | "issueICard"
    | "issueMarksheet"
    | "studentVerification";

interface ModalData {
    user?: User;
    student?: StudentWithAllDetails;
    searchParams?: {
        page?: string;
        userId?: string | null;
        registration?: string;
        type?: string;
    };
    generalMarks?: z.infer<typeof GENERAL_COURSE_MARKS_SCHEMA> & {
        branch?: string | null;
        isAdmin?: boolean;
    };
    computerTypingMarks?: z.infer<typeof COMPUTER_TYPING_MARKS_SCHEMA> & {
        branch?: string | null;
        isAdmin?: boolean;
    };
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
