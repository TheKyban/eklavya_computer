import { Login } from "@/components/login/Login";
import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Login",
};

export default async function LoginPage() {
    const session = await getServerSession(AUTH_OPTIONS);
    if (session) {
        return redirect("/dashboard");
    }
    return (
        <div className="w-screen h-screen max-h-screen max-w-[100vw]  relative overflow-hidden flex items-center justify-center bg-[url('/bg.jpg')] bg-no-repeat bg-cover bg-right-bottom">
            <div className="relative z-50 ">
                <Login />
            </div>
            {/* <Boxes /> */}
        </div>
    );
}
