import { Student } from "@prisma/client";
import { create } from "zustand";

interface modalStore {
    students: Student[] | null;
    setStudents: (students: Student[]) => void;
    removeStudent: (formNumber: string) => void;
    updateStudent: (student: Student) => void;
}

export const useStudent = create<modalStore>((set) => ({
    students: null,
    setStudents: (students) => set(() => ({ students })),
    removeStudent: (formNumber) =>
        set((state) => ({
            students: state.students?.filter(
                (student) => student.formNumber !== formNumber
            ),
        })),
    updateStudent: (Cstudent) =>
        set((state) => ({
            students: state.students?.map((Ostudent) =>
                Ostudent.formNumber === Cstudent.formNumber
                    ? Cstudent
                    : Ostudent
            ),
        })),
}));
