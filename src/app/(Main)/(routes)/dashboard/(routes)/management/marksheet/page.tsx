import ManageMarksheet from "@/components/Dashboard/student/Manage-marksheet";
import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Prisma } from "../../../../../../../../prisma/prisma";
import { fetchBranch } from "@/lib/FETCH_FUNTCTIONS";

export default async function ManageMarks({
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
        <ManageMarksheet
            page={searchParams?.page || "1"}
            registration={searchParams?.registration || ""}
            branches={branches}
        />
    );
}
