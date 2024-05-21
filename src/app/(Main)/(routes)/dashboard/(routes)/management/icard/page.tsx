import ManageIcard from "@/components/Dashboard/student/Manage-Icard";
import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { fetchBranch } from "@/lib/FETCH_FUNTCTIONS";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function IcardManagePage({
    searchParams,
}: {
    searchParams: { page: string; registration: string };
}) {
    const session = await getServerSession(AUTH_OPTIONS);
    if (session?.user.role !== "ADMIN") {
        return redirect("/dashboard");
    }

    const branches = await fetchBranch();
    return (
        <div>
            <ManageIcard
                branches={branches}
                page={searchParams?.page || "1"}
                registration={searchParams?.registration || ""}
            />
        </div>
    );
}
