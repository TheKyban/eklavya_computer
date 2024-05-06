import { authOptions } from "@/lib/auth-options";
import { Loader } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";

async function Login({ children }: { children: ReactNode }) {
    const session = await getServerSession(authOptions);
    if (session) {
        return redirect("/dashboard");
    }

    return <>{children}</>;
}

export default async function LoginLayoutRoot({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense
            fallback={
                <div className="h-[90vh] flex items-center justify-center">
                    <Loader className="animate-spin" />
                </div>
            }
        >
            <Login>{children}</Login>
        </Suspense>
    );
}
