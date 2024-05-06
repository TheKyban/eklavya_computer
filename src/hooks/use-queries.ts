import {
    Marks,
    Student,
    StudentApplication,
    User,
    UserApplication,
} from "@prisma/client";
import { QueryKey, useQueryClient } from "@tanstack/react-query";

type queryType = { id: string; [key: string]: string };

export const useCustumQuery = () => {
    const queryClient = useQueryClient();

    const addUser = (key: QueryKey, data: User) => {
        queryClient.setQueryData(
            key,
            (old: { total: number; users: User[] }) => {
                return {
                    total: old?.total + 1,
                    users: [data, ...old?.users],
                };
            },
        );
    };

    const removeUser = (key: QueryKey, id: string) => {
        queryClient.setQueryData(
            key,
            (old: { total: number; users: User[] }) => {
                const users = old?.users?.filter((user) => user?.id !== id);
                return {
                    total: old?.total - 1,
                    users,
                };
            },
        );
    };
    const updateUser = (key: QueryKey, data: User) => {
        queryClient.setQueryData(
            key,
            (old: { total: number; users: User[] }) => {
                const users = old?.users?.map((user) =>
                    user?.id === data?.id ? data : user,
                );
                return {
                    total: old?.total,
                    users,
                };
            },
        );
    };
    const removeStudent = (key: QueryKey, registration: string) => {
        queryClient.setQueryData(
            key,
            (old: { total: number; students: Student[] }) => {
                const students = old?.students.filter(
                    (student) => student?.registration !== registration,
                );
                return {
                    total: old?.total - 1,
                    students,
                };
            },
        );
    };
    const addStudent = (key: QueryKey, data: Student) => {
        queryClient.setQueryData(
            key,
            (oldData: { total: number; students: Student[] }) => {
                return {
                    total: oldData?.total + 1,
                    students: [data, ...oldData?.students],
                };
            },
        );
    };
    const updateStudent = (key: QueryKey, data: Student) => {
        queryClient.setQueryData(
            key,
            (oldData: { total: number; students: Student[] }) => {
                const students = oldData.students.map((student) =>
                    student.registration === data?.registration
                        ? data
                        : student,
                );
                return {
                    total: oldData?.total,
                    students,
                };
            },
        );
    };

    const removeRegistrationNumberFromUnMarkedList = (
        key: QueryKey,
        registration: number,
    ) => {
        queryClient.setQueryData(key, (oldData: queryType[]) => {
            return oldData?.filter(
                (data) => Number(data?.registration) !== registration,
            );
        });
    };
    const addRegistrationNumberToUnMarkedList = (
        key: QueryKey,
        registration: number,
    ) => {
        queryClient.setQueryData(key, (oldData: queryType[]) => {
            return [{ registration }, ...oldData];
        });
    };
    const addMark = (key: QueryKey, data: { marks: Marks }) => {
        queryClient.setQueryData(
            key,
            (oldData: { total: number; studentsWithMarks: Marks[] }) => {
                return {
                    total: oldData.total + 1,
                    studentsWithMarks: [data, ...oldData?.studentsWithMarks],
                };
            },
        );
    };
    const removeMark = (key: QueryKey, registration: string) => {
        queryClient.setQueryData(
            key,
            (oldData: {
                total: number;
                studentsWithMarks: { marks: Marks }[];
            }) => {
                const marks = oldData?.studentsWithMarks.filter(
                    (mark) =>
                        mark?.marks?.studentRegistrationNumber !== registration,
                );
                return {
                    total: oldData?.total - 1,
                    studentsWithMarks: marks,
                };
            },
        );
    };
    const updateMark = (key: QueryKey, data: { marks: Marks }) => {
        queryClient.setQueryData(
            key,
            (oldData: {
                total: number;
                studentsWithMarks: { marks: Marks }[];
            }) => {
                const marks = oldData?.studentsWithMarks?.map((mark) =>
                    mark?.marks.studentRegistrationNumber ===
                    data?.marks?.studentRegistrationNumber
                        ? data
                        : mark,
                );
                return {
                    total: oldData?.total,
                    studentsWithMarks: marks,
                };
            },
        );
    };

    const addData = (key: QueryKey, data: queryType) => {
        queryClient.setQueryData(key, (old: queryType[]) => {
            const allData = [data, ...old];
            return allData;
        });
    };
    const updateData = (key: QueryKey, data: queryType) => {
        queryClient.setQueryData(key, (old: queryType[]) => {
            const allData = old?.map((oldData) => {
                return data?.id === oldData?.id ? data : oldData;
            });
            return allData;
        });
    };
    const removeData = (key: QueryKey, id: string) => {
        queryClient.setQueryData(key, (old: queryType[]) => {
            const allData = old.filter((data) => {
                return data?.id !== id;
            });
            return allData;
        });
    };

    const removeApplication = (key: QueryKey, id: string) => {
        queryClient.setQueryData(
            key,
            (old: {
                total: number;
                applications: UserApplication[] | StudentApplication[];
            }) => {
                const applications = old.applications?.filter(
                    (application) => application?.id !== id,
                );
                return {
                    total: old?.total - 1,
                    applications,
                };
            },
        );
    };

    return {
        addData,
        removeStudent,
        addStudent,
        updateStudent,
        removeRegistrationNumberFromUnMarkedList,
        addRegistrationNumberToUnMarkedList,
        addMark,
        removeMark,
        updateMark,
        addUser,
        removeUser,
        updateUser,
        removeApplication,
        updateData,
        removeData,
    };
};
