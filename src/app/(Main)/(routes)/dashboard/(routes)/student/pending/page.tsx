import StudentPendingList from "@/components/Dashboard/student/pending-list";
import { Loader2 } from "lucide-react";
import { FC, Suspense } from "react";

const PendingStudents = ({
    searchParams,
}: {
    searchParams: { page: string; registration: string };
}) => {
    return (
        <Suspense
            fallback={<Loader2 className="animate-spin m-auto mt-[25%]" />}
        >
            <StudentPendingList searchParams={searchParams} />
        </Suspense>
    );
};

export default PendingStudents;
