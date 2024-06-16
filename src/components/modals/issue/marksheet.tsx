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
import { IssueType, StudentWithAllDetails } from "@/lib/TYPES";

import { Input } from "@/components/ui/input";
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
    const { student, searchParams } = data;
    const [date, setDate] = useState(student?.certificate?.date || new Date());
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
                        students: StudentWithAllDetails[];
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
                        students: StudentWithAllDetails[];
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
        if (student?.marks?.marks) {
            form.setValue("practical", student?.marks?.marks?.practical);
            form.setValue("project", student?.marks?.marks?.project);
            form.setValue("viva", student?.marks?.marks?.viva);
            form.setValue("written", student?.marks?.marks?.written);
            form.setValue("registration", student?.registration);
        }
    }, [student, form]);

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[80vh] h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Issue Marksheet</DialogTitle>
                </DialogHeader>
                <ScrollArea className="overflow-y-auto h-full w-full">
                    <Image
                        src={student?.img as string}
                        width={200}
                        height={200}
                        className="w-[150px] h-[150px] object-cover rounded-full"
                        alt="profile"
                    />
                    <Table>
                        <TableBody>
                            {/* Registration */}
                            {student?.registration && (
                                <TableRow>
                                    <TableCell>Registration No.</TableCell>
                                    <TableCell>
                                        {student?.registration}
                                    </TableCell>
                                </TableRow>
                            )}

                            {/* Name */}
                            {student?.name && (
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>{student?.name}</TableCell>
                                </TableRow>
                            )}

                            {/* FName */}
                            {student?.fatherName && (
                                <TableRow>
                                    <TableCell>Father Name</TableCell>
                                    <TableCell>{student?.fatherName}</TableCell>
                                </TableRow>
                            )}

                            {/* MName */}
                            {student?.motherName && (
                                <TableRow>
                                    <TableCell>Mother Name</TableCell>
                                    <TableCell>{student?.motherName}</TableCell>
                                </TableRow>
                            )}

                            {/* Gender */}
                            {student?.gender && (
                                <TableRow>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>{student?.gender}</TableCell>
                                </TableRow>
                            )}

                            {/* Dob */}
                            {student?.dob && (
                                <TableRow>
                                    <TableCell>DOB</TableCell>
                                    <TableCell>
                                        {format(
                                            new Date(student?.dob),
                                            DATE_FORMAT,
                                        )}
                                    </TableCell>
                                </TableRow>
                            )}

                            {/* Email */}
                            {student?.email && (
                                <TableRow>
                                    <TableCell>Email</TableCell>
                                    <TableCell>{student?.email}</TableCell>
                                </TableRow>
                            )}
                            {/* Phone */}
                            {student?.phone && (
                                <TableRow>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>{student?.phone}</TableCell>
                                </TableRow>
                            )}
                            {/* qualification */}
                            {student?.qualification && (
                                <TableRow>
                                    <TableCell>Qualification</TableCell>
                                    <TableCell>
                                        {student?.qualification}
                                    </TableCell>
                                </TableRow>
                            )}

                            {/* State and District */}
                            {student?.address && (
                                <TableRow>
                                    <TableCell>State</TableCell>
                                    <TableCell>
                                        {student?.address.state}
                                    </TableCell>
                                </TableRow>
                            )}
                            {student?.address && (
                                <TableRow>
                                    <TableCell>District</TableCell>
                                    <TableCell>
                                        {student?.address.district}
                                    </TableCell>
                                </TableRow>
                            )}
                            {/* Pin code */}
                            {student?.address && (
                                <TableRow>
                                    <TableCell>Pin</TableCell>
                                    <TableCell>
                                        {student?.address.pincode}
                                    </TableCell>
                                </TableRow>
                            )}

                            {/* Address */}
                            {student?.address && (
                                <TableRow>
                                    <TableCell>Address</TableCell>
                                    <TableCell>
                                        {student?.address?.street}
                                    </TableCell>
                                </TableRow>
                            )}
                            {/* Course */}
                            {student?.Course && (
                                <TableRow>
                                    <TableCell>Course</TableCell>
                                    <TableCell>
                                        {student?.Course.name}
                                    </TableCell>
                                </TableRow>
                            )}

                            {/* Dor */}
                            {student?.dor && (
                                <TableRow>
                                    <TableCell>DOR</TableCell>
                                    <TableCell>
                                        {format(
                                            new Date(student?.dor),
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
                                                    student?.marksheet?.issue
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
                                    issue: !student?.marksheet?.issue,
                                    ...values,
                                }),
                            )}
                            className="flex flex-col gap-3"
                        >
                            {/* WRITTEN */}
                            <FormField
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
                                                disabled={
                                                    isPending ||
                                                    student?.marksheet?.issue
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
                                                disabled={
                                                    isPending ||
                                                    student?.marksheet?.issue
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
                                                disabled={
                                                    isPending ||
                                                    student?.marksheet?.issue
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
                                                disabled={
                                                    isPending ||
                                                    student?.marksheet?.issue
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
                                    student?.marksheet?.issue
                                        ? "destructive"
                                        : "primary"
                                }
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <Loader className="animate-spin" />
                                ) : student?.marksheet.issue ? (
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
