import MobileMenu from "@/components/Dashboard/sidebar/MobileMenu";
import Sidebar from "@/components/Dashboard/sidebar/Sidebar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { Loader } from "lucide-react";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

async function Dasboard({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(AUTH_OPTIONS);
    const role = session?.user.role;

    return (
        <div className="flex min-h-screen h-screen min-w-full">
            <Sidebar
                className="hidden lg:flex z-50 sticky top-0 left-0"
                role={role}
            />
            <div className="h-full w-full">
                <MobileMenu
                    role={role}
                    className="lg:hidden fixed top-0 z-50 bg-white"
                />
                <ScrollArea className="w-full h-[calc(100vh-130px)] mt-[90px] lg:mt-0 lg:h-screen py-2">
                    {role !== "ADMIN" && (
                        <Button
                            variant={"ghost"}
                            className="text-sm md:text-lg text-zinc-600 dark:text-zinc-300 cursor-grabbing font-medium mb-2"
                        >
                            Welcome to
                            <span className="text-orange-600 ml-1">
                                {session?.user?.branch}
                            </span>
                        </Button>
                    )}
                    {children}
                </ScrollArea>
            </div>
        </div>
    );
}

export default async function DasboardRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense
            fallback={
                <div className="h-screen flex items-center justify-center">
                    <Loader className="animate-spin" />
                </div>
            }
        >
            <Dasboard>{children}</Dasboard>
        </Suspense>
    );
}
