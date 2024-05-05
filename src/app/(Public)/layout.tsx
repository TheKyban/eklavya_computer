import { Footer } from "@/components/Home/footer";
import Navbar from "@/components/Navbar/Navbar";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-full min-h-screen bg-orange-50 flex flex-col">
            <Navbar />
            {children}

            {/*
             * FOOTER
             */}

            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
};

export default PublicLayout;
