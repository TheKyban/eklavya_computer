import Image from "next/image";
import { LoginForm } from "./form";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Login = () => {
    return (
        <div className="flex max-w-[300px] flex-col px-8 pt-4 rounded-xl pb-5 shadow-2xl dark:bg-white/5">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image
                    className="mx-auto h-auto w-[70px]"
                    src={
                        "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1712900852/ekavaya_assets/f5tpu1skpaewn1gp0e6g.png"
                    }
                    alt="Your Company"
                    width={100}
                    height={100}
                />
                <h2 className="mt-1 text-center text-base font-semibold leading-9 tracking-tight text-gray-900">
                    Sign in to Dashboard
                </h2>
            </div>

            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                <LoginForm />
            </div>

            <Button
                asChild
                variant={"outline"}
                className="mt-4 mx-auto text-xs dark:bg-white dark:text-black dark:border-[#e7e5e4]"
                size={"sm"}
            >
                <Link
                    href={"/"}
                    className="flex items-center justify-center gap-2"
                >
                    <ArrowRight className="w-4 h-4" />
                    <span>Go to home</span>
                </Link>
            </Button>
        </div>
    );
};
