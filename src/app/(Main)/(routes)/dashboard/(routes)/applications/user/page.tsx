import UserApplicationList from "@/components/application/userApplicationList";
import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function UserApplicationPage({
    searchParams,
}: {
    searchParams: { page: string };
}) {
    const session = await getServerSession(AUTH_OPTIONS);
    if (session?.user?.role !== "ADMIN") {
        redirect("/dashboard");
    }
    return (
        <div>
            <UserApplicationList page={searchParams.page} />
        </div>
    );
}
