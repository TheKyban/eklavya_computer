import { Footer } from "@/components/Home/footer";
import Navbar from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { MAX_WIDTH } from "@/lib/STYLES";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function NotFound() {
    const session = await getServerSession(AUTH_OPTIONS);
    return (
        <div className="bg-orange-50 h-screen w-screen overflow-x-hidden">
            <Navbar session={session} />
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
