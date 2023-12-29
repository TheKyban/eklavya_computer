import Navbar from "@/components/Navbar/Navbar";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-full bg-orange-50">
            <Navbar />

            {children}
        </div>
    );
};

export default PublicLayout;
