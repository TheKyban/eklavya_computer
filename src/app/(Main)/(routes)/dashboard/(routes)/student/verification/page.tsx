import StudentVerification from "@/components/Dashboard/student/verification";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const StudentVerificationPage = async ({
    searchParams,
}: {
    searchParams: { page: string; registration: string };
}) => {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== "ADMIN") {
        return redirect("/dashboard");
    }
    return (
        <div>
            <StudentVerification searchParams={searchParams} />
        </div>
    );
};

export default StudentVerificationPage;
