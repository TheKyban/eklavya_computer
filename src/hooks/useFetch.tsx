"use client";
import { generalMarksSchema, typingSpeedMarkSchema } from "@/lib/schema";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const useClients = () => {
    return useQuery({
        queryKey: ["allUserDetailsForCarousel"],
        queryFn: async () => {
            const { data } = await axios("/api/user-details");
            return data;
        },
        staleTime: 1000 * 60 * 60, // 1hr
    });
};

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

export const useStudents = (
    page: string,
    pending: boolean | undefined,
    registration: string
) => {
    const url = `/api/student?${pending ? "pending=true&" : ""}page=${page}${
        !!registration ? "&formNumber=" + registration : ""
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
    user: string | undefined,
    registration: string,
    type: string
) => {
    const url = `/api/student-verification/${user}?pending=${type}&page=${page}${
        !!registration ? "&formNumber=" + registration : ""
    }`;
    return useQuery({
        queryKey: [
            "student_verification",
            page || "1",
            user,
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
    return useQuery<{ formNumber: string }[]>({
        queryKey: ["computer-students-mark", typing],
        queryFn: async () => {
            const { data } = await axios(
                `/api/marks?${typing ? "computerTyping=true" : ""}`
            );
            return data;
        },
    });
};

export const useStudentMarkEntered = (
    page: string,
    registration: string,
    typing: boolean
) => {
    type studentsWithMarks = z.infer<typeof typingSpeedMarkSchema> &
        z.infer<typeof generalMarksSchema>;
    return useQuery<{
        total: number;
        studentsWithMarks: studentsWithMarks[];
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
                    !!registration ? "&formNumber=" + registration : ""
                }${typing ? "&computerTyping=true" : ""}`
            );

            console.log(data);
            return data;
        },
    });
};

export const useCertificate = (
    pending: boolean,
    page: string,
    registration: string
) => {
    const url = `/api/certificate?${
        pending ? "pending=true&" : ""
    }page=${page}${!!registration ? "&formNumber=" + registration : ""}`;
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

export const useVerifyCertificate = (
    registration: string,
    page: string,
    user: string,
    course: string,
    type: string
) => {
    return useQuery({
        queryKey: [
            "students",
            registration || "none",
            page || "1",
            user,
            course,
            type,
        ],
        queryFn: async () => {
            const { data } = await axios(
                `/api/verify/marks?userId=${user}&${
                    course === "computerTyping" ? "computerTyping=true&" : "&"
                }verified=${type}&page=${page ? page : "1"}${
                    !!registration ? "&formNumber=" + registration : ""
                }`
            );
            return data;
        },
    });
};
