import ManageMarksheet from "@/components/Dashboard/student/Manage-marksheet";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Prisma } from "../../../../../../../../prisma/prisma";
import { fetchBranch } from "@/lib/fetchFunctions";

export default async function ManageMarks({
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
        <ManageMarksheet
            page={searchParams?.page || "1"}
            registration={searchParams?.registration || ""}
            branches={branches}
        />
    );
}
