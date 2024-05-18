import { Session } from "next-auth";
import Link from "next/link";

export const IsAuth = async ({ session }: { session: Session | null }) => {
    return session?.user ? (
        <Link href="/dashboard" className={"transition hover:text-blue-100"}>
            <span>Dashbord</span>
        </Link>
    ) : (
        <Link href="/login" className={"transition hover:text-blue-100"}>
            <span>Login</span>
        </Link>
    );
};
