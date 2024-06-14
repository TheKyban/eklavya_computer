import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

interface PropsType extends AnchorHTMLAttributes<HTMLAnchorElement> {
    session: Session | null;
    setOpen?: () => void;
}

export const IsAuth = ({
    session,
    className,
    setOpen,
    ...props
}: PropsType) => {
    return session?.user ? (
        <Link
            href="/dashboard"
            className={cn(
                "transition hover:text-blue-800 uppercase flex gap-2 items-center",
                className,
            )}
            onClick={setOpen}
            {...props}
        >
            <Lock className="w-4 h-4 text-orange-800" />
            <span>Dashbord</span>
        </Link>
    ) : (
        <Link
            href="/login"
            className={cn(
                "transition hover:text-blue-800 uppercase flex gap-2 items-center",
                className,
            )}
            onClick={setOpen}
            {...props}
        >
            <Lock className="w-4 h-4 text-orange-800" />
            <span>Login</span>
        </Link>
    );
};
