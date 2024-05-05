import { Footer } from "@/components/Home/footer";
import Navbar from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import { MAX_WIDTH } from "@/lib/styles";
import { ArrowRight, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="bg-orange-50 h-screen w-screen overflow-x-hidden">
            <Navbar />
            <div
                className={`${MAX_WIDTH} min-h-[calc(100vh-330px)]  mx-auto flex items-center justify-center flex-col overflow-hidden`}
            >
                <ShieldAlert className="text-red-500 h-28 w-28" />
                <h1 className="text-3xl font-semibold text-red-700">
                    Not Found
                </h1>

                <Button asChild variant={"primary"} className="mt-10">
                    <Link
                        href={"/"}
                        className="flex items-center justify-center gap-3"
                    >
                        <ArrowRight className="w-4 h-4" />
                        <span>Go to home</span>
                    </Link>
                </Button>
            </div>
            <Footer />
        </div>
    );
}
