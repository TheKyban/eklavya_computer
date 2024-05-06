"use client";
import { useModal } from "@/hooks/use-modal-store";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

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
import { CircleUser, Loader, Smile } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "@/components/ui/use-toast";
import { franchiseSchema } from "@/lib/schema";
import { useMutation } from "@tanstack/react-query";
import { states } from "@/lib/stateAndDistrict";
import { useCustumQuery } from "@/hooks/use-queries";
import { ImageHandler } from "@/lib/imageHandler";

export const UserApplicationModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "userApplication";
    const { userApplication, searchParams } = data;
    const [state, setState] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const form = useForm<z.infer<typeof franchiseSchema>>({
        resolver: zodResolver(franchiseSchema),
        defaultValues: {
            address: "",
            branch: "",
            district: "",
            email: "",
            img: "",
            name: "",
            password: "",
            phone: "",
            pincode: "",
            state: "",
            userId: "",
            confirmPassword: "",
        },
    });

    useEffect(() => {
        if (
            userApplication?.name &&
            userApplication?.email &&
            userApplication?.img
        ) {
            // personal information
            form.setValue("name", userApplication?.name);
            form.setValue("email", userApplication?.email);
            form.setValue("img", userApplication?.img);
            form.setValue("phone", userApplication?.phone);

            // address
            form.setValue("address", userApplication?.address?.street);
            form.setValue("pincode", userApplication?.address?.pincode);
            form.setValue("district", userApplication?.address.district);
            form.setValue("state", userApplication?.address.state);
            setState(userApplication?.address.state);

            // user
            form.setValue("branch", userApplication?.branch);
        }
    }, [data, form, userApplication]);

    const { addUser, removeApplication } = useCustumQuery();

    // delete application
    const { mutate: deleteApplication, isPending: isDeleting } = useMutation({
        mutationFn: async (id: string) => {
            const { data } = await axios.delete(
                `/api/users/application?id=${id}`,
            );
            console.log(data);
            return data;
        },

        onSuccess(data) {
            if (data) {
                toast({ description: data?.message });
            }
            if (data.success) {
                try {
                    form.reset();
                    onClose();
                    // remove from application list
                    removeApplication(
                        ["users_application_list", searchParams?.page],
                        userApplication?.id!,
                    );
                } catch (error) {
                    toast({
                        description:
                            "Application removed refresh to see effect.",
                    });
                }
            }
        },

        onError(error: AxiosError<{ message: string; succuss: boolean }>) {
            toast({ description: error.response?.data?.message });
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof franchiseSchema>) => {
            const { data } = await axios.post(
                `/api/users/application?id=${userApplication?.id}`,
                values,
            );
            return data;
        },
        onSuccess: async (data) => {
            try {
                toast({ description: data?.message });
                form.reset();
                onClose();
            } catch (error) {
                console.log("Error in form submission");
            }

            try {
                // delete application
                removeApplication(
                    ["users_application_list", searchParams?.page],
                    userApplication?.id!,
                );
                // add to user list
                addUser(["users", searchParams?.page || "1", ""], data?.user);
            } catch (error) {
                toast({
                    description:
                        "User added successfully and application deleted successfully. Refresh to see",
                });
            }
        },
        onError(error: AxiosError<{ message: string; succuss: boolean }>) {
            toast({ description: error.response?.data?.message });
        },
    });

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((value) => mutate(value))}
                        className="w-full overflow-y-auto flex flex-col gap-10 py-3 px-2 no-scrollbar"
                    >
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
                                                // value={field.value}
                                                onChange={(e) =>
                                                    ImageHandler(
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
                                                readOnly
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
                                                        {states.map((state) => (
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

                                                        {states.map((s) => {
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

                            {/* Role
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                defaultValue={"FRANCHISE"}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={"Role"}
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="ADMIN">
                                                            ADMIN
                                                        </SelectItem>
                                                        <SelectItem value="FRANCHISE">
                                                            FRANCHISE
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Is Active */}
                            {/* <FormField
                                control={form.control}
                                name="isActive"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Is Active</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                defaultValue={"true"}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={
                                                            "Is Active"
                                                        }
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="true">
                                                            YES
                                                        </SelectItem>
                                                        <SelectItem value="false">
                                                            No
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />  */}

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

                            {/* confirm password */}
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>confirm Password</FormLabel>
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
                        </div>
                        {/* BTNS */}
                        <div className="flex flex-col gap-3">
                            <Button
                                variant={"primary"}
                                disabled={isPending}
                                type="submit"
                            >
                                {isPending ? (
                                    <Loader className="animate-spin" />
                                ) : (
                                    "Accept"
                                )}
                            </Button>
                            <Button
                                variant={"destructive"}
                                disabled={isDeleting}
                                type="button"
                                onClick={() =>
                                    deleteApplication(userApplication?.id!)
                                }
                            >
                                {isDeleting ? (
                                    <Loader className="animate-spin" />
                                ) : (
                                    "Delete"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
