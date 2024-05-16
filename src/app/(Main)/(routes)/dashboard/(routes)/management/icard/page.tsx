import ManageIcard from "@/components/Dashboard/student/Manage-Icard";
import { authOptions } from "@/lib/auth-options";
import { fetchBranch } from "@/lib/fetchFunctions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function IcardManagePage({
    searchParams,
}: {
    searchParams: { page: string; registration: string };
}) {
    const session = await getServerSession(authOptions);
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
