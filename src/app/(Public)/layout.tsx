import { Footer } from "@/components/Home/footer";
import Navbar from "@/components/Navbar/Navbar";
import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { getServerSession } from "next-auth";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerSession(AUTH_OPTIONS);
    return (
        <div className="w-full h-full min-h-screen  flex flex-col relative">
            <Navbar session={session} />
            {children}

            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
};

export default PublicLayout;
