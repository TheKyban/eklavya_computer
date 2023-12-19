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
import { ChangeEvent, useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CircleUser, Loader, Smile, Users } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { franchiseEditSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@prisma/client";

export const UserModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();
    const isModalOpen = isOpen && type === "User";
    const { user, searchParams } = data;
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

        onSuccess(data, variables, context) {
            if (data) {
                toast({ description: data.message });
            }
            if (data.success) {
                queryClient.setQueryData(
                    ["users", searchParams?.page, searchParams?.userId],
                    (old: { total: number; users: User[] }) => {
                        const users = old.users.map((user) =>
                            user.id === variables.id ? variables : user
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
                                                onValueChange={field.onChange}
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
                                                        <SelectItem value="bihar">
                                                            Bihar
                                                        </SelectItem>
                                                        <SelectItem value="delhi">
                                                            Delhi
                                                        </SelectItem>
                                                        <SelectItem value="jharkhand">
                                                            Jharkhand
                                                        </SelectItem>
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
                                                        <SelectItem value="bihar">
                                                            Muzaffarpur
                                                        </SelectItem>
                                                        <SelectItem value="delhi">
                                                            Patna
                                                        </SelectItem>
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

const back = () => {
    const isLoading = false;
    return (
        <Dialog>
            <DialogContent className="max-h-[90vh] h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>
                <div className="overflow-y-auto no-scrollbar">
                    <div className="w-full flex flex-col gap-5 py-3 px-2">
                        {/* PERSONAL DETAILS */}
                        <div className="flex flex-col gap-4 flex-1 ">
                            <h1 className="text-indigo-600 flex items-center gap-2 uppercase text-lg">
                                <Smile className="" /> Personal Details
                            </h1>

                            {/* PICTURE */}
                            <div>
                                <Label
                                    htmlFor="img"
                                    className="flex items-center justify-center cursor-pointer"
                                >
                                    <Image
                                        src={""}
                                        priority
                                        width={100}
                                        height={100}
                                        alt="picture"
                                        className="rounded-full w-[100px] h-[100px]"
                                    />
                                </Label>
                                <Input
                                    type="file"
                                    id="img"
                                    className="hidden"
                                />
                            </div>

                            {/* NAME */}
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input />
                            </div>

                            {/* Email */}
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input />
                            </div>

                            {/* Phone */}
                            <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input />
                            </div>

                            {/* State */}
                            <div>
                                <Label>State</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={"Select state"}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>States</SelectLabel>
                                            <SelectItem value="bihar">
                                                Bihar
                                            </SelectItem>
                                            <SelectItem value="delhi">
                                                Delhi
                                            </SelectItem>
                                            <SelectItem value="jharkhand">
                                                Jharkhand
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* District */}
                            <div>
                                <Label>State</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={"Select District"}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Districts</SelectLabel>
                                            <SelectItem value="bihar">
                                                Muzaffarpur
                                            </SelectItem>
                                            <SelectItem value="delhi">
                                                Patna
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* PinCode */}
                            <div>
                                <Label>Pin Code</Label>
                                <Input />
                            </div>

                            {/* Address */}
                            <div>
                                <Label>Street</Label>
                                <Textarea />
                            </div>
                        </div>

                        {/* ACCOUNT INFORMATION */}
                        <div className="flex flex-col gap-4 flex-1">
                            <h1 className="flex gap-2 text-teal-600 items-center uppercase text-lg">
                                <CircleUser /> Account Information
                            </h1>

                            {/* Branch Name */}
                            <div>
                                <Label>Branch Name</Label>
                                <Input />
                            </div>

                            {/* USER ID */}
                            <div>
                                <Label>User ID</Label>
                                <Input />
                            </div>

                            {/* Role */}
                            <div>
                                <Label>Role</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder={"Role"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value={"FRANCHISE"}>
                                                FRANCHISE
                                            </SelectItem>
                                            <SelectItem value="ADMIN">
                                                ADMIN
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            {/* Is Active */}
                            <div>
                                <Label>Is Active</Label>
                                <Select defaultValue="true">
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={"Is Active"}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value={"true"}>
                                                Yes
                                            </SelectItem>
                                            <SelectItem value="false">
                                                No
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Password */}
                            <div>
                                <Label>Password</Label>
                                <Input />
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant={"primary"}
                        disabled={isLoading}
                        type="submit"
                        className="w-full"
                    >
                        {isLoading ? (
                            <Loader className="animate-spin" />
                        ) : (
                            "Update"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
