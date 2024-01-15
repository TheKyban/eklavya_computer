import { role } from "@prisma/client";

export interface details {
    Logo:
        | "GraduationCap"
        | "Medal"
        | "Ribbon"
        | "ShieldAlert"
        | "ShieldCheck"
        | "Users";
    title: string;
    count: number;
    color?: string;
}

export interface UserType {
    _id: { $oid: string };
    userId: string;
    name: string;
    img: string;
    role: role;
    isActive: boolean;
    branch: string;
    totalStudents: number;
    pendingStudents: number;
    verifiedStudents: number;
    pendingCertificates: number;
    issuedCertificates: number;
}
