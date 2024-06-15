"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { toast } from "@/components/ui/use-toast";
import { CalendarIcon, Loader, Loader2 } from "lucide-react";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { DATE_FORMAT } from "@/lib/CONSTANTS";
import { IssueType, StudentWithMarksCourse } from "@/lib/TYPES";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { STATES } from "@/lib/STATE_WITH_DISTRICTS";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GENERAL_COURSE_MARKS_SCHEMA } from "@/lib/SCHEMA";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "@/components/ui/scroll-area";

export const IssueMarksheetModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "issueMarksheet";
    const { studentsWithMarks, searchParams } = data;
    const [date, setDate] = useState(
        studentsWithMarks?.certificate?.date || new Date(),
    );
    const currentYear = new Date().getFullYear() + 1;
    const form = useForm<z.infer<typeof GENERAL_COURSE_MARKS_SCHEMA>>({
        resolver: zodResolver(GENERAL_COURSE_MARKS_SCHEMA),
        defaultValues: {
            practical: 0,
            project: 0,
            viva: 0,
            written: 0,
            registration: "",
        },
    });

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationKey: ["mutateMarksheetVerification"],
        mutationFn: async ({
            registration,
            date,
            issue,
            practical,
            project,
            viva,
            written,
        }: IssueType) => {
            const { data } = await axios.put(`/api/management/marksheet`, {
                registration,
                date,
                issue,
                practical,
                project,
                viva,
                written,
            });
            return data;
        },
        onError: (error) => {
            console.log(error);
            toast({ description: error?.message });
        },

        onSuccess(data, variables) {
            if (data) {
                toast({ description: data?.message });
            }

            try {
                onClose();
                // remove data
                queryClient.setQueryData(
                    [
                        searchParams?.type === "false"
                            ? "pending_marksheet"
                            : "verified_marksheet",
                        searchParams?.page,
                        searchParams?.registration,
                        searchParams?.userId,
                    ],
                    (oldData: {
                        students: StudentWithMarksCourse[];
                        total: number;
                    }) => {
                        const students = oldData.students?.filter(
                            (student) =>
                                student?.registration !==
                                data?.student?.registration,
                        );

                        return { total: oldData.total - 1, students };
                    },
                );

                //Add To other type
                queryClient.setQueryData(
                    [
                        searchParams?.type === "false"
                            ? "verified_marksheet"
                            : "pending_marksheet",
                        searchParams?.page,
                        searchParams?.registration,
                        searchParams?.userId,
                    ],
                    (oldData: {
                        students: StudentWithMarksCourse[];
                        total: number;
                    }) => {
                        const students = [data?.student, ...oldData?.students];

                        return { total: oldData.total + 1, students };
                    },
                );
            } catch (error) {
                console.log("Error in Place Switch");
            }
        },
    });

    useEffect(() => {
        if (studentsWithMarks?.marks?.marks) {
            form.setValue(
                "practical",
                studentsWithMarks?.marks?.marks?.practical,
            );
            form.setValue("project", studentsWithMarks?.marks?.marks?.project);
            form.setValue("viva", studentsWithMarks?.marks?.marks?.viva);
            form.setValue("written", studentsWithMarks?.marks?.marks?.written);
            form.setValue("registration", studentsWithMarks?.registration);
        }
    }, [studentsWithMarks, form]);

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[80vh] h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Issue Marksheet</DialogTitle>
                </DialogHeader>
                <ScrollArea className="overflow-y-auto h-full w-full">
                    <Image
                        src={studentsWithMarks?.img as string}
                        width={200}
                        height={200}
                        className="w-[150px] h-[150px] object-cover rounded-full"
                        alt="profile"
                    />
                    <Table>
                        <TableBody>
                            {/* Registration */}
                            {studentsWithMarks?.registration && (
                                <TableRow>
                                    <TableCell>Registration No.</TableCell>
                                    <TableCell>
                                        {studentsWithMarks?.registration}
                                    </TableCell>
                                </TableRow>
                            )}

                            {/* Name */}
                            {studentsWithMarks?.name && (
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>
                                        {studentsWithMarks?.name}
                                    </TableCell>
                                </TableRow>
                            )}

                            {/* FName */}
                            {studentsWithMarks?.fatherName && (
                                <TableRow>
                                    <TableCell>Father Name</TableCell>
                                    <TableCell>
                                        {studentsWithMarks?.fatherName}
                                    </TableCell>
                                </TableRow>
                            )}

                            {/* MName */}
                            {studentsWithMarks?.motherName && (
                                <TableRow>
                                    <TableCell>Mother Name</TableCell>
                                    <TableCell>
                                        {studentsWithMarks?.motherName}
                                    </TableCell>
                                </TableRow>
                            )}

                            {/* Gender */}
                            {studentsWithMarks?.gender && (
                                <TableRow>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>
                                        {studentsWithMarks?.gender}
                                    </TableCell>
                                </TableRow>
                            )}

                            {/* Dob */}
                            {studentsWithMarks?.dob && (
                                <TableRow>
                                    <TableCell>DOB</TableCell>
                                    <TableCell>
                                        {format(
                                            new Date(studentsWithMarks?.dob),
                                            DATE_FORMAT,
                                        )}
                                    </TableCell>
                                </TableRow>
                            )}

                            {/* Email */}
                            {studentsWithMarks?.email && (
                                <TableRow>
                                    <TableCell>Email</TableCell>
                                    <TableCell>
                                        {studentsWithMarks?.email}
                                    </TableCell>
                                </TableRow>
                            )}
                            {/* Phone */}
                            {studentsWithMarks?.phone && (
                                <TableRow>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>
                                        {studentsWithMarks?.phone}
                                    </TableCell>
                                </TableRow>
                            )}
                            {/* qualification */}
                            {studentsWithMarks?.qualification && (
                                <TableRow>
                                    <TableCell>Qualification</TableCell>
                                    <TableCell>
                                        {studentsWithMarks?.qualification}
                                    </TableCell>
                                </TableRow>
                            )}

                            {/* State and District */}
                            {studentsWithMarks?.address && (
                                <TableRow>
                                    <TableCell>State</TableCell>
                                    <TableCell>
                                        {studentsWithMarks?.address.state}
                                    </TableCell>
                                </TableRow>
                            )}
                            {studentsWithMarks?.address && (
                                <TableRow>
                                    <TableCell>District</TableCell>
                                    <TableCell>
                                        {studentsWithMarks?.address.district}
                                    </TableCell>
                                </TableRow>
                            )}
                            {/* Pin code */}
                            {studentsWithMarks?.address && (
                                <TableRow>
                                    <TableCell>Pin</TableCell>
                                    <TableCell>
                                        {studentsWithMarks?.address.pincode}
                                    </TableCell>
                                </TableRow>
                            )}

                            {/* Address */}
                            {studentsWithMarks?.address && (
                                <TableRow>
                                    <TableCell>Address</TableCell>
                                    <TableCell>
                                        {studentsWithMarks?.address?.street}
                                    </TableCell>
                                </TableRow>
                            )}
                            {/* Course */}
                            {studentsWithMarks?.Course && (
                                <TableRow>
                                    <TableCell>Course</TableCell>
                                    <TableCell>
                                        {studentsWithMarks?.Course.name}
                                    </TableCell>
                                </TableRow>
                            )}

                            {/* Dor */}
                            {studentsWithMarks?.dor && (
                                <TableRow>
                                    <TableCell>DOR</TableCell>
                                    <TableCell>
                                        {format(
                                            new Date(studentsWithMarks?.dor),
                                            DATE_FORMAT,
                                        )}
                                    </TableCell>
                                </TableRow>
                            )}

                            <TableRow>
                                <TableCell>Issue Date</TableCell>
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] justify-start text-left font-normal",
                                                    !date &&
                                                        "text-muted-foreground",
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? (
                                                    format(date, DATE_FORMAT)
                                                ) : (
                                                    <span>Pick a date</span>
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
                                                selected={date}
                                                onSelect={(d) => setDate(d!)}
                                                fromYear={2015}
                                                toYear={currentYear}
                                                disabled={
                                                    studentsWithMarks?.marksheet
                                                        ?.issue
                                                }
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit((values) =>
                                mutate({
                                    date,
                                    issue: !studentsWithMarks?.marksheet?.issue,
                                    ...values,
                                }),
                            )}
                            className="flex flex-col gap-3"
                        >
                            {/* WRITTEN */}
                            <FormField
                                disabled={
                                    isPending ||
                                    studentsWithMarks?.marksheet?.issue
                                }
                                control={form.control}
                                name="written"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Written Marks</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        Number(e.target.value),
                                                    )
                                                }
                                                placeholder="Written marks"
                                                type="number"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Viva */}
                            <FormField
                                disabled={
                                    isPending ||
                                    studentsWithMarks?.marksheet?.issue
                                }
                                control={form.control}
                                name="viva"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Viva Marks</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        Number(e.target.value),
                                                    )
                                                }
                                                placeholder="Viva marks"
                                                type="number"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Practical */}
                            <FormField
                                disabled={
                                    isPending ||
                                    studentsWithMarks?.marksheet?.issue
                                }
                                control={form.control}
                                name="practical"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Practical Marks</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        Number(e.target.value),
                                                    )
                                                }
                                                placeholder="Practical marks"
                                                type="number"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Projects */}
                            <FormField
                                disabled={
                                    isPending ||
                                    studentsWithMarks?.marksheet?.issue
                                }
                                control={form.control}
                                name="project"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Marks</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        Number(e.target.value),
                                                    )
                                                }
                                                placeholder="Project marks"
                                                type="number"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                variant={
                                    studentsWithMarks?.marksheet?.issue
                                        ? "destructive"
                                        : "primary"
                                }
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <Loader className="animate-spin" />
                                ) : studentsWithMarks?.marksheet.issue ? (
                                    "CANCEL"
                                ) : (
                                    "ISSUE"
                                )}
                            </Button>
                        </form>
                    </Form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
