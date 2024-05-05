"use client";
import { LinkStyle } from "@/lib/styles";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const IsAuth = () => {
    const { status } = useSession();
    return status === "authenticated" ? (
        <Link href="/dashboard" className={LinkStyle}>
            <span>Dashbord</span>
        </Link>
    ) : (
        <Link href="/login" className={LinkStyle}>
            <span>Login</span>
        </Link>
    );
};
