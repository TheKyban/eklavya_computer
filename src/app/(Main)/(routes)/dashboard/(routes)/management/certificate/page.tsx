import ManageCertificate from "@/components/Dashboard/student/Manage-certificate";
import { authOptions } from "@/lib/auth-options";
import { fetchBranch } from "@/lib/fetchFunctions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CertificateManagement({
    searchParams,
}: {
    searchParams: { page: string; registration: string };
}) {
    /**
     * VERIFY ROLE
     */

    const session = await getServerSession(authOptions);
    if (session?.user.role !== "ADMIN") {
        return redirect("/dashboard");
    }
    const branches = await fetchBranch();

    return (
        <ManageCertificate
            branches={branches}
            page={searchParams?.page || "1"}
            registration={searchParams?.registration || ""}
        />
    );
}
