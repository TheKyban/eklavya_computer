import MobileMenu from "@/components/Dashboard/sidebar/MobileMenu";
import Sidebar from "@/components/Dashboard/sidebar/Sidebar";

export default async function Dasboard({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen h-screen min-w-full">
            <Sidebar className="hidden lg:flex sticky" />
            <div className="h-full w-full">
                <MobileMenu className="lg:hidden fixed top-0 z-50 bg-white dark:bg-black" />
                <main className="w-full h-[calc(100vh-90px)] mt-[90px] lg:mt-0 lg:h-screen  dark:bg-black">
                    {children}
                </main>
            </div>
        </div>
    );
}
