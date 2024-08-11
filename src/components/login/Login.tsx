import Image from "next/image";
import { LoginForm } from "./form";
import { Button } from "../ui/button";
import Link from "next/link";
import { EKLAVAYA_LOGO } from "@/lib/ASSETS";

export const Login = () => {
    return (
        <div className="flex max-w-[300px] flex-col px-8 pt-4 rounded-xl pb-5 bg-yellow-900  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100 items-center">
            <Image
                src={EKLAVAYA_LOGO}
                width={80}
                height={50}
                alt="logo"
                className="mb-2"
            />
            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                <LoginForm />
            </div>
            <Button variant={"destructive"} className="my-3 w-full">
                <Link href={"/"}>Go to Home</Link>
            </Button>
        </div>
    );
};
