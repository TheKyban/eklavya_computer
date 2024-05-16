"use client";
import { Course, Marks, Student } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import queryString from "query-string";
import { StudentWithMarksCourse } from "@/lib/types";

export const useUsers = (page: string, userId?: string, select?: string) => {
    const url = `/api/users?page=${page}${!!userId ? "&userId=" + userId : ""}${
        !!select ? "&select=" + select : ""
    }`;
    return useQuery({
        queryKey: ["users", page, userId],
        queryFn: async () => {
            const { data } = await axios.get(url);
            return data;
        },
    });
};
export const useBranch = () => {
    return useQuery({
        queryKey: ["branches"],
        queryFn: async () => {
            const { data } = await axios.get<{
                branches: { branch: string; userId: string }[];
            }>("/api/branch");
            return data;
        },
    });
};

export const useStudents = (
    page: string,
    pending: boolean | undefined,
    registration: string,
) => {
    const url = `/api/student?${pending ? "pending=true&" : ""}page=${page}${
        !!registration ? "&registration=" + registration : ""
    }`;
    return useQuery({
        queryKey: [
            pending ? "pending_list" : "verified_list",
            page,
            registration ? registration : "none",
        ],
        queryFn: async () => {
            const { data } = await axios.get(url);
            return data;
        },
    });
};

export const useStudentVerification = (
    page: string,
    userId: string | undefined,
    registration: string,
    type: string,
) => {
    const url = queryString.stringifyUrl({
        url: "/api/management/student-verification",
        query: {
            registration,
            pending: type,
            page,
            userId,
        },
    });
    return useQuery({
        queryKey: [
            "student_verification",
            page || "1",
            userId,
            registration ? registration : "",
            type,
        ],
        queryFn: async () => {
            const { data } = await axios.get(url);
            return data;
        },
    });
};

export const useStudentMark = (typing: boolean = false) => {
    return useQuery<{ registration: string }[]>({
        queryKey: ["computer-students-mark", typing],
        queryFn: async () => {
            const { data } = await axios(
                `/api/marks?${typing ? "computerTyping=true" : ""}`,
            );
            return data;
        },
    });
};

export const useStudentMarkEntered = (
    page: string,
    registration: string,
    typing: boolean,
) => {
    return useQuery<{
        total: number;
        studentsWithMarks: { marks: Marks }[];
    }>({
        queryKey: [
            "general-students-entered",
            page,
            registration || "none",
            typing,
        ],
        queryFn: async () => {
            const { data } = await axios(
                `/api/marks/entered?&page=${page}${
                    !!registration ? "&registration=" + registration : ""
                }${typing ? "&computerTyping=true" : ""}`,
            );

            return data;
        },
    });
};

export const useCertificate = (
    pending: boolean,
    page: string,
    registration: string,
) => {
    const url = `/api/certificate?${
        pending ? "pending=true&" : ""
    }page=${page}${!!registration ? "&registration=" + registration : ""}`;
    return useQuery({
        queryKey: [
            pending ? "pending_certificate" : "verified_certificate",
            page || "1",
            registration || "none",
        ],
        queryFn: async () => {
            const { data } = await axios.get(url);
            return data;
        },
    });
};

type studentsWithMarks = Student & { Course: Course; marks: Marks };
export const useVerifyCertificate = (
    registration: string,
    page: string,
    user: string,
    course: string,
    type: boolean,
) => {
    return useQuery<{
        studentsWithMarks: studentsWithMarks[];
        total: number;
    }>({
        queryKey: ["students", registration, page, user, course, type],
        queryFn: async () => {
            const url = queryString.stringifyUrl({
                url: "/api/management/certificate",
                query: {
                    userId: user,
                    computerTyping: course === "computerTyping",
                    page,
                    registration,
                    verified: type,
                },
            });
            const { data } = await axios(url);
            return data;
        },
    });
};

export const useMarksheet = ({
    page,
    pending,
    registration,
    userId,
}: {
    pending: boolean;
    registration: string | undefined;
    page: string | undefined;
    userId: string | number;
}) => {
    return useQuery<{ total: number; students: StudentWithMarksCourse[] }>({
        queryKey: [
            pending ? "pending_marksheet" : "verified_marksheet",
            page,
            registration,
            userId,
        ],
        queryFn: async () => {
            const url = queryString.stringifyUrl({
                url: "/api/management/marksheet",
                query: {
                    page,
                    registration,
                    pending: pending,
                    userId,
                },
            });
            const { data } = await axios.get(url);
            return data;
        },
    });
};
export const useICard = ({
    page,
    pending,
    registration,
    userId,
}: {
    pending: boolean;
    registration: string | undefined;
    page: string | undefined;
    userId: string | number;
}) => {
    return useQuery<{ total: number; students: StudentWithMarksCourse[] }>({
        queryKey: [
            pending ? "pending_icard" : "verified_icard",
            page,
            registration,
            userId,
        ],
        queryFn: async () => {
            const url = queryString.stringifyUrl({
                url: "/api/management/icard",
                query: {
                    page,
                    registration,
                    pending: pending,
                    userId,
                },
            });
            const { data } = await axios.get(url);
            return data;
        },
    });
};

export const useAssests = () => {
    return useQuery<{ public_id: string; secure_url: string }[]>({
        queryKey: ["assets"],
        queryFn: async () => {
            const { data } = await axios(
                "/api/upload?folder=eklavaya-carousel",
            );
            return data?.assets;
        },
        staleTime: 60 * 1000 * 30,
    });
};

export const useStudentApplications = (page: string) => {
    const url = `/api/student/application?page=${page}`;
    return useQuery({
        queryKey: ["student_application_list", page || "1"],
        queryFn: async () => {
            const { data } = await axios.get(url);
            return data;
        },
    });
};

export const useUserApplications = (page: string) => {
    const url = `/api/users/application?page=${page}`;
    return useQuery({
        queryKey: ["users_application_list", page || "1"],
        queryFn: async () => {
            const { data } = await axios.get(url);
            return data;
        },
    });
};

export const useCourse = () => {
    return useQuery<Course[]>({
        queryKey: ["courses_list"],
        queryFn: async () => {
            const { data } = await axios.get("/api/course");
            return data?.data;
        },
    });
};
