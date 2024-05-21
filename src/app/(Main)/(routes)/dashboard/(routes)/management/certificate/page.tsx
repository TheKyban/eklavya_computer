import ManageCertificate from "@/components/Dashboard/student/Manage-certificate";
import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { fetchBranch } from "@/lib/FETCH_FUNTCTIONS";
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

    const session = await getServerSession(AUTH_OPTIONS);
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
