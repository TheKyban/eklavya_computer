import CertificatePrinter from "@/components/Dashboard/print/CERTIFICATE_PRINTER";
import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { fetchBranch } from "@/lib/FETCH_FUNTCTIONS";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CertificatePrinterPage({
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
        <CertificatePrinter
            branches={branches}
            page={searchParams?.page || "1"}
            registration={searchParams?.registration || ""}
        />
    );
}
