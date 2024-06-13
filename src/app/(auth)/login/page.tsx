import { Login } from "@/components/login/Login";
import { Boxes } from "@/components/ui/background-box";
import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await getServerSession(AUTH_OPTIONS);
    if (session) {
        return redirect("/dashboard");
    }
    return (
        <div className="w-screen h-screen max-h-screen max-w-[100vw] relative overflow-hidden flex items-center justify-center">
            <Boxes />
            <div className="relative z-50">
                <Login />
            </div>
        </div>
    );
}
