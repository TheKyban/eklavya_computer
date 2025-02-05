import MarksPage from "@/components/Dashboard/marks/marksPage";
import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { fetchBranch } from "@/lib/FETCH_FUNTCTIONS";
import { getServerSession } from "next-auth";

export default async function MarksRootPage() {
    const session = await getServerSession(AUTH_OPTIONS);
    const isAdmin = session?.user?.role === "ADMIN";
    if (isAdmin) {
        const branches = await fetchBranch();
        return (
            <div className="flex gap-8 flex-wrap flex-col lg:flex-row items-start justify-center py-3 px-3">
                <MarksPage branches={branches} isAdmin={isAdmin} />
            </div>
        );
    } else {
        return (
            <div className="flex gap-8 flex-wrap flex-col lg:flex-row items-start justify-center py-3 px-3">
                <MarksPage
                    isAdmin={false}
                    branches={[
                        {
                            branch: session?.user?.branch as string,
                            userId: session?.user?.userId as string,
                        },
                    ]}
                />
            </div>
        );
    }
}
