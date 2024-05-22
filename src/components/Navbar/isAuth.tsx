import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

interface PropsType extends AnchorHTMLAttributes<HTMLAnchorElement> {
    session: Session | null;
}

export const IsAuth = ({ session, className, ...props }: PropsType) => {
    return session?.user ? (
        <Link
            href="/dashboard"
            className={cn(
                "transition hover:text-blue-800 uppercase",
                className,
            )}
            {...props}
        >
            <span>Dashbord</span>
        </Link>
    ) : (
        <Link
            href="/login"
            className={cn(
                "transition hover:text-blue-800 uppercase",
                className,
            )}
            {...props}
        >
            <span>Login</span>
        </Link>
    );
};
