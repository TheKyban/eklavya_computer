"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CircleUser, Loader, Smile, Users } from "lucide-react";
import { USER_SCHEMA } from "@/lib/SCHEMA";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { STATES } from "@/lib/STATE_WITH_DISTRICTS";
import { useCustumQuery } from "@/hooks/use-queries";
import { IMAGE_HANDLER } from "@/lib/IMAGE_HANDLER";

const UserRegistration = ({}) => {
    const [state, setState] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const form = useForm<z.infer<typeof USER_SCHEMA>>({
        resolver: zodResolver(USER_SCHEMA),
        defaultValues: {
            address: "",
            branch: "",
            confirmPassword: "",
            district: "",
            email: "",
            img: "",
            name: "",
            password: "",
            phone: "",
            pincode: "",
            state: "",
            userId: "",
        },
    });

    const { addUser } = useCustumQuery();

    const onSubmit = async (values: z.infer<typeof USER_SCHEMA>) => {
        try {
            const { data } = await axios.post("/api/users", values);
            if (data) {
                toast({ description: data.message });
            }

            if (data.success) {
                setState("");
                form.reset();
                addUser(["users", "1", ""], data?.user);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        return () => {
            if (form.getValues("img")) {
                axios.delete(`/api/upload?url=${form.getValues("img")}`);
            }
        };
    }, [form]);

    return (
        <div className="w-full flex h-full flex-col gap-5 px-5 pt-3">
            <h1 className="text-zinc-600 flex items-center gap-2 uppercase text-xl lg:text-2xl font-medium mb-3">
                <Users className="" /> User Registration
            </h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full flex flex-col gap-10 py-3 px-2"
                >
                    <div className="w-full flex flex-col lg:flex-row gap-5 ">
                        {/* PERSONAL DETAILS */}
                        <div className="flex flex-col gap-4 flex-1 ">
                            <h1 className="text-indigo-600 flex items-center gap-2 uppercase text-lg">
                                <Smile className="" /> Personal Details
                            </h1>

                            {/* PICTURE */}
                            <FormField
                                name="img"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-fit">
                                        <Label
                                            htmlFor="img"
                                            className="cursor-pointer relative"
                                        >
                                            <Image
                                                src={
                                                    field.value ||
                                                    "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1712930560/ekavaya_assets/jpxbhz4hxaewfz8er2kv.png"
                                                }
                                                priority
                                                width={100}
                                                height={100}
                                                alt="picture"
                                                className="rounded-full w-[100px] h-[100px]"
                                            />

                                            {isUploading && (
                                                <Loader className="absolute top-1/3 left-[38%] animate-spin" />
                                            )}
                                        </Label>
                                        <FormControl>
                                            <Input
                                                className="hidden max-w-0 w-0 h-0"
                                                type="file"
                                                id="img"
                                                accept="image/*"
                                                value={""}
                                                onChange={(e) =>
                                                    IMAGE_HANDLER(
                                                        e,
                                                        form,
                                                        setIsUploading,
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* NAME */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter email id"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Phone */}
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter phone no."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* State */}
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>State</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={(e) => {
                                                    form.setValue(
                                                        "district",
                                                        "",
                                                    );
                                                    setState(e);
                                                    field.onChange(e);
                                                }}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={
                                                            "Select state"
                                                        }
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            States
                                                        </SelectLabel>
                                                        {STATES.map((state) => (
                                                            <SelectItem
                                                                key={
                                                                    state.state
                                                                }
                                                                value={
                                                                    state.state
                                                                }
                                                            >
                                                                {state.state}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* District */}
                            <FormField
                                control={form.control}
                                name="district"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>District</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={
                                                            "Select District"
                                                        }
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Districts
                                                        </SelectLabel>

                                                        {STATES.map((s) => {
                                                            if (
                                                                s.state ===
                                                                state
                                                            ) {
                                                                return s.districts?.map(
                                                                    (
                                                                        district: string,
                                                                    ) => (
                                                                        <SelectItem
                                                                            key={
                                                                                district
                                                                            }
                                                                            value={
                                                                                district
                                                                            }
                                                                        >
                                                                            {
                                                                                district
                                                                            }
                                                                        </SelectItem>
                                                                    ),
                                                                );
                                                            }
                                                        })}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* PinCode */}
                            <FormField
                                control={form.control}
                                name="pincode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pin Code</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter Pin code"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Address */}
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter Address"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* ACCOUNT INFORMATION */}
                        <div className="flex flex-col gap-4 flex-1">
                            <h1 className="flex gap-2 text-teal-600 items-center uppercase text-lg">
                                <CircleUser /> Account Information
                            </h1>

                            {/* Branch Name */}
                            <FormField
                                control={form.control}
                                name="branch"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Branch Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter Branch Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* USER ID */}
                            <FormField
                                control={form.control}
                                name="userId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase">
                                            User Id
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter User id"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Confirm Password */}
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter Confirm password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    {/* BTNS */}
                    <div className="flex flex-col gap-3">
                        <Button
                            variant={"primary"}
                            disabled={form.formState.isSubmitting}
                            type="submit"
                        >
                            {form.formState.isSubmitting ? (
                                <Loader className="animate-spin" />
                            ) : (
                                "Submit"
                            )}
                        </Button>
                        <Button
                            variant={"outline"}
                            type="reset"
                            onClick={() => form.reset()}
                        >
                            Reset
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default UserRegistration;
