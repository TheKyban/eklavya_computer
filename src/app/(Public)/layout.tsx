import Navbar from "@/components/Navbar/Navbar";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div suppressHydrationWarning>
            <Navbar />
            {children}
        </div>
    );
};

export default PublicLayout;
