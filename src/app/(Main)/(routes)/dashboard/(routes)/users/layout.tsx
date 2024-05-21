import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";

const Page = async ({ children }: { children: ReactNode }) => {
    /**
     * VERIFY ROLE
     */

    const session = await getServerSession(AUTH_OPTIONS);
    if (session?.user.role !== "ADMIN") {
        return redirect("/dashboard");
    }

    return <>{children}</>;
};

export default Page;
