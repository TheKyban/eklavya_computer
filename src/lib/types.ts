import { role } from "@prisma/client";
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
