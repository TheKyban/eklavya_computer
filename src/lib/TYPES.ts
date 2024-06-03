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

export type StudentWithCourse = Student & {
    Course: Course;
};
export type StudentWithMarksCourse = StudentWithCourse & {
    marks: Marks;
};

export type StudentWithMarksCourseBranchName = StudentWithMarksCourse & {
    Branch: { branch: string };
};

export interface IssueType {
    registration: string;
    issue: boolean;
    date: Date;
}
