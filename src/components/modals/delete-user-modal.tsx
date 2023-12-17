"use client";
import { useModal } from "@/hooks/use-modal-store";
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
import { CircleUser, Loader, Smile, Users } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { franchiseEditSchema } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const DeleteUserModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();
    const isModalOpen = isOpen && type === "deleteUser";
    const { user } = data;
    const [isLoading, setIsLoading] = useState(false);
    const onDelete = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.delete(
                `/api/user?userId=${user?.userId}`
            );
            if (data) {
                toast({ description: data.message });
            }
            if (data.success) {
                onClose();
                router.refresh();
                router.push("/dashboard/franchise");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete User
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to do this? <br />
                        <span className="font-semibold text-indigo-500">
                            {user?.branch}
                        </span>{" "}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button
                            disabled={isLoading}
                            variant={"ghost"}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant={"primary"}
                            disabled={isLoading}
                            onClick={onDelete}
                        >
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
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
