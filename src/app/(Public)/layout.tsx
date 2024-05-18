import { Footer } from "@/components/Home/footer";
import Navbar from "@/components/Navbar/Navbar";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerSession(authOptions);
    return (
        <div className="w-full h-full min-h-screen bg-orange-50 flex flex-col relative">
            <Navbar session={session} />
            {children}

            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
};

export default PublicLayout;
