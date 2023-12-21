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
import {
    CalendarIcon,
    CircleUser,
    GraduationCap,
    Loader,
    Smile,
} from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { studentSchema } from "@/lib/schema";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Courses } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { states } from "@/lib/stateAndDistrict";

export const EditStudentModal = () => {
    const currentYear = new Date().getFullYear();
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "editStudent";
    const { student, searchParams } = data;
    const [state, setState] = useState("");
    const form = useForm<z.infer<typeof studentSchema>>({
        resolver: zodResolver(studentSchema),
    });

    useEffect(() => {
        if (student?.name && student?.email && student?.img) {
            // personal information
            form.setValue("formNumber", student.formNumber);
            form.setValue("name", student?.name);
            form.setValue("fatherName", student.fatherName);
            form.setValue("motherName", student.motherName);
            form.setValue("email", student?.email);
            form.setValue("img", student?.img);
            form.setValue("phone", student?.phone);
            form.setValue("gender", student?.gender);

            // dates
            form.setValue("dob", new Date(student?.dob));
            form.setValue("dor", new Date(student?.dor));

            form.setValue("qualification", student?.qualification!);
            form.setValue("course", student?.course);

            // address
            form.setValue("address", student?.address?.street);
            form.setValue("pincode", student?.address?.pincode);
            form.setValue("district", student?.address.district);
            form.setValue("state", student?.address.state);
            setState(student.address.state);

            // Franchise
            form.setValue("branch", student.branch);
        }
    }, [data, form, student]);

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof studentSchema>) => {
            const { data } = await axios.put("/api/student", values);
            return data;
        },

        onSuccess(data, variables) {
            if (data) {
                toast({ description: data.message });
                form.reset();
                onClose();
            }
            if (data.success) {
                queryClient.setQueryData(
                    [
                        searchParams?.type,
                        searchParams?.page,
                        searchParams?.registration,
                    ],
                    (old: {
                        total: number;
                        students: z.infer<typeof studentSchema>[];
                    }) => {
                        const students = old.students.map((student) =>
                            student.formNumber === variables.formNumber
                                ? {
                                      img: variables.img,
                                      name: variables.name,
                                      fatherName: variables.fatherName,
                                      formNumber: variables.formNumber,
                                      branch: variables.branch,
                                      course: variables.course,
                                      dob: variables.dob,
                                      dor: variables.dor,
                                      email: variables.email,
                                      phone: variables.phone,
                                      gender: variables.gender,
                                      motherName: variables.motherName,
                                      qualification: variables.qualification,
                                      address: {
                                          state: variables.state,
                                          district: variables.district,
                                          pincode: variables.pincode,
                                          street: variables.address,
                                      },
                                  }
                                : student
                        );
                        return {
                            total: old.total,
                            students,
                        };
                    }
                );
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
                    <DialogTitle>Edit Student</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((values) => mutate(values))}
                        className="w-full flex flex-col gap-5 py-3 px-2 overflow-y-auto no-scrollbar"
                    >
                        <h1 className="text-indigo-600 flex items-center gap-2 uppercase text-lg">
                            <GraduationCap className="" /> Student Details
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
                                            src={field.value || "/noavatar.png"}
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
                                            value={""}
                                            onChange={(e) => handleImage(e)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            {/* FORM NUMBER */}
                            <FormField
                                control={form.control}
                                name="formNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Registration Id</FormLabel>

                                        <FormControl>
                                            <Input
                                                placeholder="Enter Form number"
                                                {...field}
                                                readOnly
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
                            {/* FNAME */}
                            <FormField
                                control={form.control}
                                name="fatherName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Father Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter father name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* MNAME */}
                            <FormField
                                control={form.control}
                                name="motherName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mother Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter mother name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Gender */}
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                value={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="MALE" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        MALE
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="FEMALE" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        FEMALE
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="TRANSGENDER" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        TRANSGENDER
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* DOB */}
                            <FormField
                                control={form.control}
                                name="dob"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1">
                                        <FormLabel>Date Of Birth</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] justify-start text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    align="start"
                                                    className=" w-auto p-0"
                                                >
                                                    <Calendar
                                                        mode="single"
                                                        captionLayout="dropdown-buttons"
                                                        selected={field.value}
                                                        onSelect={
                                                            field.onChange
                                                        }
                                                        fromYear={1960}
                                                        toYear={currentYear}
                                                    />
                                                </PopoverContent>
                                            </Popover>
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

                            {/* Qualification */}
                            <FormField
                                control={form.control}
                                name="qualification"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Qualification</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter Qualification"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* COURSE */}
                            <FormField
                                control={form.control}
                                name="course"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Course</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={
                                                            "Select Course"
                                                        }
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Courses
                                                        </SelectLabel>
                                                        {Courses.map(
                                                            (course) => (
                                                                <SelectItem
                                                                    key={course}
                                                                    value={
                                                                        course
                                                                    }
                                                                >
                                                                    {course}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* DOR */}
                            <FormField
                                control={form.control}
                                name="dor"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1">
                                        <FormLabel>
                                            Date Of Registration
                                        </FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] justify-start text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    align="start"
                                                    className=" w-auto p-0"
                                                >
                                                    <Calendar
                                                        mode="single"
                                                        captionLayout="dropdown-buttons"
                                                        selected={field.value}
                                                        onSelect={
                                                            field.onChange
                                                        }
                                                        fromYear={1960}
                                                        toYear={currentYear}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
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
