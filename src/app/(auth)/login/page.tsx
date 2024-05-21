import { Login } from "@/components/login/Login";
import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await getServerSession(AUTH_OPTIONS);
    if (session) {
        return redirect("/dashboard");
    }
    return (
        <div className="w-full h-full min-h-screen bg-orange-50 flex items-center justify-center">
            <Login />
        </div>
    );
}
