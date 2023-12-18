import VerifiedStudentList from "@/components/Dashboard/student/verified-list";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

const VerifiedStudent = ({
    searchParams,
}: {
    searchParams: { page: string; registration: string };
}) => {
    return (
        <Suspense
            fallback={<Loader2 className="animate-spin m-auto mt-[25%]" />}
        >
            <VerifiedStudentList searchParams={searchParams} />
        </Suspense>
    );
};

export default VerifiedStudent;
