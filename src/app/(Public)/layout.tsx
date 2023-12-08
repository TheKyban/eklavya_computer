import Navbar from "@/components/Navbar/Navbar";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-full dark:bg-[#e0f1bc1c]">
            <Navbar />
            {children}
        </div>
    );
};

export default PublicLayout;
