"use client";

import { Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const params = useSearchParams();
    const error = params.get("error");

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
        <div className="w-full h-full flex justify-center py-5 lg:py-[100px]">
            <div className="flex h-fit w-fit max-w-[350px] flex-1 flex-col  px-8 pt-4 rounded-xl pb-10 shadow-2xl dark:bg-white/5">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image
                        className="mx-auto h-auto w-[100px]"
                        src={"https://res.cloudinary.com/ddgjcyk0q/image/upload/v1712900852/ekavaya_assets/f5tpu1skpaewn1gp0e6g.png"}
                        alt="Your Company"
                        width={100}
                        height={100}
                    />
                    <h2 className="mt-5 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action={onSubmit}>
                        <div>
                            <label
                                htmlFor="userid"
                                className="block uppercase text-sm font-medium leading-6 text-gray-900 "
                            >
                                User id
                            </label>
                            <div className="mt-2">
                                <input
                                    id="userid"
                                    name="userid"
                                    type="text"
                                    autoComplete="userid"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset bg-white focus:ring-indigo-600 sm:text-sm sm:leading-6  px-5"
                                    // value={userId}
                                    // onChange={(e) => setUserId(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block uppercase text-sm font-medium leading-6 text-gray-900 "
                                >
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  px-5 dark:focus:ring-1"
                                    // value={password}
                                    // onChange={(e) =>
                                    //     setPassword(e.target.value)
                                    // }
                                />
                            </div>
                        </div>
                        {error && (
                            <p className="text-red-600 capitalize text-center">
                                {error}
                            </p>
                        )}
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader className="animate-spin" />
                                ) : (
                                    "Sign in"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
