import User from "@/components/Dashboard/user/user-list";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

const UserList = ({
    searchParams,
}: {
    searchParams: { page: string; userId: string };
}) => {
    return (
        <Suspense
            fallback={<Loader2 className="animate-spin m-auto mt-[25%]" />}
        >
            <User searchParams={searchParams} />
        </Suspense>
    );
};

export default UserList;
