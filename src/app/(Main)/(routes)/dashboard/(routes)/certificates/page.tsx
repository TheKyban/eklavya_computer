import CertificateList from "@/components/Dashboard/certificate/list";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function Certificate({
    searchParams,
}: {
    searchParams: { page: string; registration: string; pending: boolean };
}) {
    return (
        <Suspense
            fallback={<Loader2 className="animate-spin m-auto mt-[25%]" />}
        >
            <CertificateList searchParams={searchParams} />
        </Suspense>
    );
}
