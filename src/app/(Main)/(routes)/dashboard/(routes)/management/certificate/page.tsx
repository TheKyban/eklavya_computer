import ManageCertificate from "@/components/Dashboard/manage-certificate/Manage-certificate";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CertificateManagement() {
    /**
     * VERIFY ROLE
     */

    const session = await getServerSession(authOptions);
    if (session?.user.role !== "ADMIN") {
        return redirect("/dashboard");
    }
    return <ManageCertificate />;
}
