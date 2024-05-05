import StudentList from "@/components/Dashboard/student/list";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

const Lists = ({
    searchParams,
}: {
    searchParams: { page: string; registration: string; pending: boolean };
}) => {
    return (
        <Suspense
            fallback={<Loader2 className="animate-spin m-auto mt-[25%]" />}
        >
            <StudentList searchParams={searchParams} />
        </Suspense>
    );
};

export default Lists;
