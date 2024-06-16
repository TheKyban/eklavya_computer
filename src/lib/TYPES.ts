import { Course, Marks, Student, role } from "@prisma/client";
import { LucideIcon } from "lucide-react";

export interface details {
    Logo: LucideIcon;
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

export type StudentWithAllDetails = Student & {
    Branch: { branch: string };
    Course: Course;
    marks?: Marks;
};

export interface IssueType {
    registration: string;
    issue: boolean;
    date: Date;
    practical?: number;
    project?: number;
    viva?: number;
    written?: number;
    englishTyping?: number;
    hindiTyping?: number;
}
