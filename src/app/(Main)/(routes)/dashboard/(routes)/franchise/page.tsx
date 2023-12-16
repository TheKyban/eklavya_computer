import Franchise from "@/components/Dashboard/franchise/franchise-list";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

const FranchiseList = ({
    searchParams,
}: {
    searchParams: { page: string; userId: string };
}) => {
    return (
        <Suspense
            fallback={<Loader2 className="animate-spin m-auto mt-[25%]" />}
        >
            <Franchise searchParams={searchParams} />
        </Suspense>
    );
};

export default FranchiseList;
