import { generalMarksSchema, typingSpeedMarkSchema } from "@/lib/schema";
import { Student } from "@prisma/client";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

type queryType = { _id: string; [key: string]: string };
interface markType {
    formNumber?: string;
    englishTyping?: number;
    hindiTyping?: number;
    written?: number;
    practical?: number;
    viva?: number;
    project?: number;
}
export const useCustumQuery = () => {
    const queryClient = useQueryClient();

    // const updateData = (key: QueryKey, data: queryType) => {
    //     queryClient.setQueryData(key, (old: queryType[]) => {
    //         const allData = old?.map((client) =>
    //             client?._id === data?._id
    //                 ? {
    //                       ...data,
    //                   }
    //                 : client
    //         );
    //         return allData;
    //     });
    // };

    // const removeData = (key: QueryKey, id: string) => {
    //     queryClient.setQueryData(key, (old: queryType[]) => {
    //         const allData = old?.filter((data) => data?._id !== id);
    //         return allData;
    //     });
    // };
    // const addData = (key: QueryKey, data: queryType) => {
    //     queryClient.setQueryData(key, (old: queryType[]) => {
    //         const allData = [data, ...old];
    //         return allData;
    //     });
    // };
    const removeStudent = (key: QueryKey, formNumber: string) => {
        queryClient.setQueryData(
            key,
            (old: { total: number; students: Student[] }) => {
                const students = old.students.filter(
                    (student) => student.formNumber !== formNumber
                );
                return {
                    total: old.total - 1,
                    students,
                };
            }
        );
    };
    const addStudent = (key: QueryKey, data: Student) => {
        queryClient.setQueryData(
            key,
            (oldData: { total: number; students: Student[] }) => {
                return {
                    total: oldData.total + 1,
                    students: [data, ...oldData.students],
                };
            }
        );
    };
    const updateStudent = (key: QueryKey, data: Student) => {
        queryClient.setQueryData(
            key,
            (oldData: { total: number; students: Student[] }) => {
                const students = oldData.students.map((student) =>
                    student.formNumber === data.formNumber ? data : student
                );
                return {
                    total: oldData.total,
                    students,
                };
            }
        );
    };

    const removeFormNumber = (key: QueryKey, formNumber: number) => {
        queryClient.setQueryData(key, (oldData: queryType[]) => {
            return oldData.filter(
                (data) => Number(data?.formNumber) !== formNumber
            );
        });
    };
    const addFormNumber = (key: QueryKey, formNumber: number) => {
        queryClient.setQueryData(key, (oldData: queryType[]) => {
            return [{ formNumber }, ...oldData];
        });
    };
    const addMark = (key: QueryKey, data: markType) => {
        queryClient.setQueryData(
            key,
            (oldData: { total: number; studentsWithMarks: markType[] }) => {
                return {
                    total: oldData.total + 1,
                    studentsWithMarks: [data, ...oldData?.studentsWithMarks],
                };
            }
        );
    };
    const removeMark = (key: QueryKey, formNumber: string) => {
        queryClient.setQueryData(
            key,
            (oldData: { total: number; studentsWithMarks: markType[] }) => {
                const marks = oldData.studentsWithMarks.filter(
                    (mark) => mark.formNumber !== formNumber
                );
                return {
                    total: oldData.total - 1,
                    studentsWithMarks: marks,
                };
            }
        );
    };
    const updateMark = (key: QueryKey, data: markType) => {
        queryClient.setQueryData(
            key,
            (oldData: { total: number; studentsWithMarks: markType[] }) => {
                const marks = oldData.studentsWithMarks.map((mark) =>
                    mark.formNumber === data.formNumber ? data : mark
                );
                return {
                    total: oldData.total,
                    studentsWithMarks: marks,
                };
            }
        );
    };

    return {
        removeStudent,
        addStudent,
        updateStudent,
        removeFormNumber,
        addFormNumber,
        addMark,
        removeMark,
        updateMark,
    };
};
