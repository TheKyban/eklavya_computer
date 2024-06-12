import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { fetchBranch } from "@/lib/FETCH_FUNTCTIONS";
import MarksheetPrinter from "@/components/Dashboard/print/MARKSHEET_PRINTER";

export default async function MarksheetPrinterPage({
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
        <MarksheetPrinter
            page={searchParams?.page || "1"}
            registration={searchParams?.registration || ""}
            branches={branches}
        />
    );
}
