import StudentVerification from "@/components/Dashboard/student/verification";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const StudentVerificationPage = async ({
    searchParams,
    params,
}: {
    searchParams: { page: string; registration: string };
    params: { userId: string };
}) => {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== "ADMIN") {
        return redirect("/dashboard");
    }
    return (
        <div>
            <StudentVerification
                searchParams={searchParams}
                userId={params.userId}
                header
            />
        </div>
    );
};

export default StudentVerificationPage;
