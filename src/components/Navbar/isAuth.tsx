import { cn } from "@/lib/utils";
import { ChevronRight, Lock } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { AnchorHTMLAttributes } from "react";
import AnimatedShinyText from "../ui/shiny-text";
import AnimatedGradientText from "../ui/animated-gradient-text";

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
                "transition hover:text-blue-800 flex gap-2 items-center",
                className,
            )}
            onClick={setOpen}
            {...props}
        >
            <AnimatedGradientText>
                🔒 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
                <span
                    className={cn(
                        `inline animate-gradient bg-gradient-to-r from-[#cdff17] via-[#00e1ff] to-[#cdff17] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                    )}
                >
                    Dashbord
                </span>
                <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
        </Link>
    ) : (
        <Link
            href="/login"
            onClick={setOpen}
            {...props}
            className={cn(className)}
        >
            <AnimatedGradientText>
                🔑 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
                <span
                    className={cn(
                        `inline animate-gradient bg-gradient-to-r from-[#cdff17] via-[#00e1ff] to-[#cdff17] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                    )}
                >
                    Admin & Centre Login
                </span>
                <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
        </Link>
    );
};
