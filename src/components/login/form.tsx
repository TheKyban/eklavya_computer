"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { LoginError } from "./error-login";
import { ArrowRight, Loader } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: FormData) => {
        const userId = data.get("userid");
        const password = data.get("password");
        try {
            setIsLoading(true);
            signIn("credentials", { userId, password });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };
    return (
        <form
            className="w-full space-y-4"
            action={onSubmit}
        >
            <div className="w-full">
                <label
                    htmlFor="userid"
                    className="block uppercase text-xs font-medium leading-6 text-gray-900 "
                >
                    User id
                </label>
                <input
                    id="userid"
                    name="userid"
                    type="text"
                    autoComplete="userid"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset bg-white focus:ring-indigo-600 sm:text-sm sm:leading-6  px-5"
                />
            </div>

            <div className="w-full">
                <label
                    htmlFor="password"
                    className="block uppercase text-xs font-medium leading-6 text-gray-900 "
                >
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  px-5 dark:focus:ring-1"
                />
            </div>
            <LoginError />
            <button
                type="submit"
                className="mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed"
                disabled={isLoading}
            >
                {isLoading ? <Loader className="animate-spin" /> : "Sign in"}
            </button>
        </form>
    );
};
