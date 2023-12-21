"use client";
import { useModal } from "@/hooks/use-modal-store";
import {
    Dialog,
    DialogContent,
    DialogFooter,
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
import { ChangeEvent, useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CircleUser, Loader, Smile } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { franchiseEditSchema } from "@/lib/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@prisma/client";
import { states } from "@/lib/stateAndDistrict";

export const UserModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "User";
    const { user, searchParams } = data;
    const [state, setState] = useState("");
    const form = useForm<z.infer<typeof franchiseEditSchema>>({
        resolver: zodResolver(franchiseEditSchema),
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
            role: "",
            id: "",
            isActive: "",
        },
    });

    useEffect(() => {
        if (user?.name && user?.email && user?.img) {
            // personal information
            form.setValue("name", user?.name);
            form.setValue("email", user?.email);
            form.setValue("img", user?.img);
            form.setValue("phone", user?.phone);

            // address
            form.setValue("address", user?.address?.street);
            form.setValue("pincode", user?.address?.pincode);
            form.setValue("district", user?.address.district);
            form.setValue("state", user?.address.state);
            setState(user?.address.state);

            // user
            form.setValue("id", user?.id);
            form.setValue("branch", user?.branch);
            form.setValue("userId", user?.userId);
            form.setValue("password", user?.password);
            form.setValue("isActive", `${user?.isActive}`);
            form.setValue("role", user?.role);
        }
    }, [data, form, user]);
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof franchiseEditSchema>) => {
            const { data } = await axios.put("/api/user", values);
            return data;
        },

        onSuccess(data, variables) {
            if (data) {
                toast({ description: data.message });
            }
            if (data.success) {
                queryClient.setQueryData(
                    ["users", searchParams?.page, searchParams?.userId],
                    (old: {
                        total: number;
                        users: z.infer<typeof franchiseEditSchema>[];
                    }) => {
                        const users = old.users.map((user) =>
                            user.id === variables.id
                                ? {
                                      img: variables.img,
                                      id: variables.id,
                                      isActive: variables.isActive,
                                      password: variables.password,
                                      role: variables.role,
                                      userId: variables.userId,
                                      name: variables.name,
                                      branch: variables.branch,
                                      email: variables.email,
                                      phone: variables.phone,
                                      address: {
                                          state: variables.state,
                                          district: variables.district,
                                          pincode: variables.pincode,
                                          street: variables.address,
                                      },
                                  }
                                : user
                        );

                        return {
                            total: old.total,
                            users,
                        };
                    }
                );
                form.reset();
                onClose();
            }
        },
    });

    const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 40000) {
                form.setError("img", {
                    message: "Image Should be lesser than 40kb",
                });
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file as Blob);
            reader.onloadend = () => {
                form.setValue("img", reader.result as string);
                form.setError("img", { message: "" });
            };
        }
    };

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
                                            className="cursor-pointer"
                                        >
                                            <Image
                                                src={
                                                    field.value ||
                                                    "/noavatar.png"
                                                }
                                                priority
                                                width={100}
                                                height={100}
                                                alt="picture"
                                                className="rounded-full w-[100px] h-[100px]"
                                            />
                                        </Label>
                                        <FormControl>
                                            <Input
                                                className="hidden max-w-0 w-0 h-0"
                                                type="file"
                                                id="img"
                                                // value={field.value}
                                                onChange={(e) => handleImage(e)}
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
                                                        ""
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
                                                                        district: string
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
                                                                    )
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

                            {/* Role */}
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
                                                defaultValue={field.value}
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
                            <FormField
                                control={form.control}
                                name="isActive"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Is Active</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
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
                                    "Update"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
