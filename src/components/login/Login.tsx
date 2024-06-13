import Image from "next/image";
import { LoginForm } from "./form";
import { Button } from "../ui/button";
import Link from "next/link";

export const Login = () => {
    return (
        <div className="flex max-w-[300px] flex-col px-8 pt-4 rounded-xl pb-5 shadow-2xl bg-orange-100/50">
            <h1 className="text-center font-medium text-xl mt-4">EKLAVAYA</h1>

            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                <LoginForm />
            </div>
            <Button variant={"destructive"} className="my-3">
                <Link href={"/"}>Go to Home</Link>
            </Button>
        </div>
    );
};
