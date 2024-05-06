import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";

const Page = async ({ children }: { children: ReactNode }) => {
    /**
     * VERIFY ROLE
     */

    const session = await getServerSession(authOptions);
    if (session?.user.role !== "ADMIN") {
        return redirect("/dashboard");
    }

    return <>{children}</>;
};

export default Page;
