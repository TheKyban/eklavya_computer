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
import { CalendarIcon, GraduationCap, Loader, PlusCircle } from "lucide-react";
import { STUDENT_APPLICATION_SCHEMA } from "@/lib/SCHEMA";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { STATES } from "@/lib/STATE_WITH_DISTRICTS";
import { IMAGE_HANDLER } from "@/lib/IMAGE_HANDLER";
import { MAX_WIDTH } from "@/lib/STYLES";
import { useBranch, useCourse } from "@/hooks/useFetch";

const StudentApplicationForm = () => {
    const currentYear = new Date().getFullYear();
    const [state, setState] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const { data, isLoading } = useBranch();
    const { data: courses, isLoading: isCourseLoading } = useCourse();

    const form = useForm<z.infer<typeof STUDENT_APPLICATION_SCHEMA>>({
        resolver: zodResolver(STUDENT_APPLICATION_SCHEMA),
        defaultValues: {
            address: "",
            branch: "",
            district: "",
            email: "",
            img: "",
            name: "",
            phone: "",
            pincode: "",
            state: "",
            course: "",
            dor: new Date(),
            fatherName: "",
            motherName: "",
            dob: new Date(),
            gender: "MALE",
            qualification: "",
        },
    });

    const onSubmit = async (
        values: z.infer<typeof STUDENT_APPLICATION_SCHEMA>,
    ) => {
        try {
            const { data } = await axios.post(
                "/api/application/studentApplication",
                values,
            );
            if (data) {
                toast({ description: data.message });
            }
            if (data.success) {
                form.reset();
                setState("");
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
        <div className={`w-full ${MAX_WIDTH} m-auto px-2 py-16`}>
            <div className="w-full flex h-full flex-col gap-5 px-5 pt-3">
                <h1 className="text-zinc-600 flex items-center gap-2 uppercase text-xl lg:text-2xl font-medium mb-3">
                    <PlusCircle className="text-orange-600" /> Student
                    Addmission Form
                </h1>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full flex flex-col gap-5 py-3 px-2"
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
                                            accept="image/*"
                                            id="img"
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

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            {/* Branch */}
                            <FormField
                                control={form.control}
                                name="branch"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Branch</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={(e) => {
                                                    field.onChange(e);
                                                }}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={
                                                            "Select Branch"
                                                        }
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Branch
                                                        </SelectLabel>
                                                        {isLoading && (
                                                            <SelectItem value="loading">
                                                                Loading...
                                                            </SelectItem>
                                                        )}
                                                        {data?.branches.map(
                                                            (branch) => (
                                                                <SelectItem
                                                                    key={
                                                                        branch.userId
                                                                    }
                                                                    value={
                                                                        branch.userId
                                                                    }
                                                                >
                                                                    {`${branch.branch} (${branch.userId})`}
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
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
                                                                "text-muted-foreground",
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP",
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
                                                            ),
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
                            {/* <FormField
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
                                                                "text-muted-foreground",
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP",
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
                            /> */}
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
        </div>
    );
};

export default StudentApplicationForm;
