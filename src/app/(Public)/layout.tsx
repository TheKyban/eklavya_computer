import Navbar from "@/components/Navbar/Navbar";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-full dark:bg-slate-800">
            <Navbar />

            {children}
        </div>
    );
};

export default PublicLayout;
