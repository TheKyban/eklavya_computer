import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function LoginRoot({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();
    if (session?.user) {
        redirect("/dashboard");
    }
    return <>{children}</>;
}
