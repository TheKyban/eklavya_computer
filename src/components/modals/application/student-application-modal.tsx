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
import { CalendarIcon, GraduationCap, Loader } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "@/components/ui/use-toast";
import { studentSchema } from "@/lib/schema";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../../ui/calendar";
import { useMutation } from "@tanstack/react-query";
import { states } from "@/lib/stateAndDistrict";
import { useCustumQuery } from "@/hooks/use-queries";
import { ImageHandler } from "@/lib/imageHandler";
import { useSession } from "next-auth/react";
import { useCourse } from "@/hooks/useFetch";

export const StudentApplicationModal = () => {
    const { data: session } = useSession();
    const currentYear = new Date().getFullYear();
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "studentApplication";
    const { studentApplication, searchParams } = data;
    const [state, setState] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const { data: courses, isLoading: isCourseLoading } = useCourse();

    const form = useForm<z.infer<typeof studentSchema>>({
        resolver: zodResolver(studentSchema),
        defaultValues: {
            address: "",
            branch: "",
            course: "",
            district: "",
            dob: new Date(),
            dor: new Date(),
            email: "",
            fatherName: "",
            registration: "",
            gender: "",
            img: "",
            motherName: "",
            name: "",
            phone: "",
            pincode: "",
            qualification: "",
            state: "",
        },
    });

    useEffect(() => {
        if (
            studentApplication?.name &&
            studentApplication?.email &&
            studentApplication?.img
        ) {
            // personal information
            form.setValue("name", studentApplication?.name);
            form.setValue("fatherName", studentApplication.fatherName);
            form.setValue("motherName", studentApplication.motherName);
            form.setValue("email", studentApplication?.email);
            form.setValue("img", studentApplication?.img);
            form.setValue("phone", studentApplication?.phone);
            form.setValue("gender", studentApplication?.gender);

            // dates
            form.setValue("dob", new Date(studentApplication?.dob));
            form.setValue("dor", new Date(studentApplication?.dor));

            form.setValue("qualification", studentApplication?.qualification!);
            form.setValue("course", studentApplication?.course);

            // address
            form.setValue("address", studentApplication?.address?.street);
            form.setValue("pincode", studentApplication?.address?.pincode);
            form.setValue("district", studentApplication?.address.district);
            form.setValue("state", studentApplication?.address.state);
            setState(studentApplication.address.state);

            // Franchise
            form.setValue("branch", studentApplication.branch);
        }
    }, [data, form, studentApplication]);

    const { removeApplication, addStudent } = useCustumQuery();
    // delete application
    const { mutate: deleteApplication, isPending: isDeleting } = useMutation({
        mutationFn: async (id: string) => {
            const { data } = await axios.delete(
                `/api/student/application?id=${id}`
            );
            return data;
        },

        onSuccess(data) {
            if (data) {
                toast({ description: data.message });
            }
            if (data.success) {
                // remove from application list
                removeApplication(
                    ["student_application_list", searchParams?.page],
                    studentApplication?.id!
                );
                form.reset();
                onClose();
            }
        },
        onError(error: AxiosError<{ message: string; succuss: boolean }>) {
            toast({ description: error.response?.data?.message });
        },
    });

    // accept application
    const { mutate, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof studentSchema>) => {
            const { data } = await axios.post(
                `/api/student/application?id=${studentApplication?.id}`,
                values
            );
            return data;
        },
        onError(error: AxiosError<{ message: string; succuss: boolean }>) {
            toast({ description: error.response?.data?.message });
        },

        onSuccess: async (data) => {
            if (data) {
                toast({ description: data.message });
                form.reset();
                onClose();
            }

            try {
                // remove from application list
                removeApplication(
                    ["student_application_list", searchParams?.page],
                    studentApplication?.id!
                );

                // add to pending list
                addStudent(
                    ["pending_list", searchParams?.page, "none"],
                    data.student
                );
            } catch (error) {
                console.log("error in addStudent");
                toast({ description: data.message });
            }
        },
    });

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
                                            value={""}
                                            onChange={(e) =>
                                                ImageHandler(
                                                    e,
                                                    form,
                                                    setIsUploading
                                                )
                                            }
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
                                name="registration"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Form number</FormLabel>

                                        <FormControl>
                                            <Input
                                                placeholder="Enter Form number"
                                                {...field}
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
                                                        {isCourseLoading && (
                                                            <SelectLabel>
                                                                Loading...
                                                            </SelectLabel>
                                                        )}
                                                        {courses?.map(
                                                            (course) => (
                                                                <SelectItem
                                                                    key={
                                                                        course?.id
                                                                    }
                                                                    value={
                                                                        course?.id!
                                                                    }
                                                                >
                                                                    {
                                                                        course?.name
                                                                    }
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
                                    "Accept"
                                )}
                            </Button>
                            <Button
                                variant={"destructive"}
                                disabled={isDeleting}
                                type="button"
                                onClick={() =>
                                    deleteApplication(studentApplication?.id!)
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
