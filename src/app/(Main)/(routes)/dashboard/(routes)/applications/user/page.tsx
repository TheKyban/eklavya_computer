import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function UserApplicationPage() {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "ADMIN") {
        redirect("/dashboard");
    }
    return (
        <div>
            <h1>User Application</h1>
            <p>This is the user application page</p>
        </div>
    );
}
