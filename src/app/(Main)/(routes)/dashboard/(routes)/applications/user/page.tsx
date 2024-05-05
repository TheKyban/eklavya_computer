import UserApplicationList from "@/components/application/userApplicationList";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function UserApplicationPage({
    searchParams,
}: {
    searchParams: { page: string };
}) {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "ADMIN") {
        redirect("/dashboard");
    }
    return (
        <div>
            <UserApplicationList page={searchParams.page} />
        </div>
    );
}
