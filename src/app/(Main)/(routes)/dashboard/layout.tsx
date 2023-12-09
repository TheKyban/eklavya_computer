import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Dasboard({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();
    if (!session?.user) {
        redirect("/")
    }

    return <div>{children}</div>;
}
