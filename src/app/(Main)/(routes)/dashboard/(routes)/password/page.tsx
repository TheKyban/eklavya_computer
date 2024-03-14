"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { changePasswordSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader, TextCursorInputIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Password = () => {
    const form = useForm<z.infer<typeof changePasswordSchema>>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            confirmPassword: "",
            currentPassword: "",
            password: "",
        },
    });

    const ChangeHandler = async (
        values: z.infer<typeof changePasswordSchema>
    ) => {
        try {
            const { data } = await axios.post("/api/password", values);
            if (data) {
                toast({ description: data.message });
            }
            if (data.success) {
                form.reset();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card className="m-auto mt-5 lg:mt-28 max-w-xs lg:max-w-md drop-shadow-xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TextCursorInputIcon className="text-indigo-600" />
                    <span className="text-indigo-600 text-xl lg:text-2xl">
                        Change Password
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <Form {...form}>
                    <form
                        className="flex flex-col gap-3"
                        onSubmit={form.handleSubmit(ChangeHandler)}
                    >
                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Current Password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter new password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter confirm password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            variant={"secondary"}
                            className="w-full mt-3 font-semibold text-indigo-600"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? (
                                <Loader className="animate-spin" />
                            ) : (
                                "Change"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default Password;
