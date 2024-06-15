"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { toast } from "@/components/ui/use-toast";
import { CalendarIcon, Loader } from "lucide-react";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import { useMutation } from "@tanstack/react-query";
import { useCustumQuery } from "@/hooks/use-queries";
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
import { IssueType } from "@/lib/TYPES";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { COMPUTER_TYPING_MARKS_SCHEMA } from "@/lib/SCHEMA";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

export const IssueCertificateModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "issueCertificate";
    const { studentsWithMarks, searchParams } = data;
    const [date, setDate] = useState(
        studentsWithMarks?.certificate?.date || new Date(),
    );
    const currentYear = new Date().getFullYear() + 1;
    const form = useForm<z.infer<typeof COMPUTER_TYPING_MARKS_SCHEMA>>({
        resolver: zodResolver(COMPUTER_TYPING_MARKS_SCHEMA),
        defaultValues: {
            registration: "",
            englishTyping: 0,
            hindiTyping: 0,
        },
    });
    const { addMark, removeMark } = useCustumQuery();
    const { mutate, isPending } = useMutation({
        mutationKey: ["mutateMarksVerification"],
        mutationFn: async ({
            registration,
            issue,
            date,
            hindiTyping,
            englishTyping,
        }: IssueType) => {
            const { data } = await axios.put(`/api/management/certificate`, {
                registration,
                issue,
                date,
                hindiTyping,
                englishTyping,
            });
            return data;
        },

        onSuccess(data) {
            if (data) {
                toast({ description: data?.message });
            }
            if (!!data?.student) {
                onClose();

                try {
                    // remove data
                    removeMark(
                        [
                            "students",
                            searchParams?.registration,
                            searchParams?.page,
                            studentsWithMarks?.branch,
                            studentsWithMarks?.Course.name === "COMPUTER TYPING"
                                ? "computerTyping"
                                : "other",
                            searchParams?.type === "true" ? true : false,
                        ],
                        data?.student?.registration,
                    );

                    //Add To other type
                    addMark(
                        [
                            "students",
                            searchParams?.registration,
                            searchParams?.page,
                            studentsWithMarks?.branch,
                            studentsWithMarks?.Course.name === "COMPUTER TYPING"
                                ? "computerTyping"
                                : "other",
                            searchParams?.type === "true" ? false : true,
                        ],
                        data?.student,
                    );
                } catch (error) {
                    console.log(error);
                }
            }
        },
    });

    useEffect(() => {
        if (studentsWithMarks) {
            form.setValue("registration", studentsWithMarks?.registration);
        }

        if (
            studentsWithMarks?.Course?.name === "COMPUTER TYPING" &&
            studentsWithMarks?.marks?.typingMarks
        ) {
            form.setValue("registration", studentsWithMarks?.registration);
            form.setValue(
                "englishTyping",
                studentsWithMarks?.marks?.typingMarks?.englishTyping,
            );
            form.setValue(
                "hindiTyping",
                studentsWithMarks?.marks?.typingMarks?.hindiTyping,
            );
        }
    }, [studentsWithMarks, form]);

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[80vh] h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Issue Certificate</DialogTitle>
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

                            {/* Practical */}
                            {studentsWithMarks?.marks?.marks?.practical && (
                                <TableRow>
                                    <TableCell>Practical</TableCell>
                                    <TableCell>
                                        {
                                            studentsWithMarks?.marks?.marks
                                                ?.practical
                                        }
                                    </TableCell>
                                </TableRow>
                            )}

                            {/* Project */}
                            {studentsWithMarks?.marks?.marks?.project && (
                                <TableRow>
                                    <TableCell>Project</TableCell>
                                    <TableCell>
                                        {
                                            studentsWithMarks?.marks?.marks
                                                ?.project
                                        }
                                    </TableCell>
                                </TableRow>
                            )}

                            {studentsWithMarks?.marks?.marks?.viva && (
                                <TableRow>
                                    <TableCell>Viva</TableCell>
                                    <TableCell>
                                        {studentsWithMarks?.marks?.marks?.viva}
                                    </TableCell>
                                </TableRow>
                            )}

                            {studentsWithMarks?.marks?.marks?.written && (
                                <TableRow>
                                    <TableCell>Written</TableCell>
                                    <TableCell>
                                        {
                                            studentsWithMarks?.marks?.marks
                                                ?.written
                                        }
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
                                                    studentsWithMarks
                                                        ?.certificate?.issue
                                                }
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    {studentsWithMarks?.Course?.name !== "COMPUTER TYPING" && (
                        <Button
                            type="submit"
                            variant={
                                studentsWithMarks?.certificate?.issue
                                    ? "destructive"
                                    : "primary"
                            }
                            className="w-full"
                            disabled={isPending}
                            onClick={() =>
                                mutate({
                                    date,
                                    issue: !studentsWithMarks?.certificate
                                        ?.issue,
                                    registration:
                                        studentsWithMarks?.registration!,
                                })
                            }
                        >
                            {isPending ? (
                                <Loader className="animate-spin" />
                            ) : studentsWithMarks?.certificate.issue ? (
                                "CANCEL"
                            ) : (
                                "ISSUE"
                            )}
                        </Button>
                    )}
                    {studentsWithMarks?.Course?.name === "COMPUTER TYPING" && (
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit((values) =>
                                    mutate({
                                        date,
                                        issue: !studentsWithMarks?.certificate
                                            ?.issue,
                                        ...values,
                                    }),
                                )}
                                className="flex flex-col gap-3"
                            >
                                {/* English Typing */}
                                <FormField
                                    control={form.control}
                                    name="englishTyping"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                English Typing
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={
                                                        isPending ||
                                                        studentsWithMarks
                                                            ?.certificate?.issue
                                                    }
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            Number(
                                                                e.target.value,
                                                            ),
                                                        )
                                                    }
                                                    placeholder="English Typing"
                                                    type="number"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Hindi Typing */}
                                <FormField
                                    control={form.control}
                                    name="hindiTyping"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Hindi Typing</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            Number(
                                                                e.target.value,
                                                            ),
                                                        )
                                                    }
                                                    disabled={
                                                        isPending ||
                                                        studentsWithMarks
                                                            ?.certificate?.issue
                                                    }
                                                    placeholder="Hindi Typing"
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
                                        studentsWithMarks?.certificate?.issue
                                            ? "destructive"
                                            : "primary"
                                    }
                                    disabled={isPending}
                                >
                                    {isPending ? (
                                        <Loader className="animate-spin" />
                                    ) : studentsWithMarks?.certificate.issue ? (
                                        "CANCEL"
                                    ) : (
                                        "ISSUE"
                                    )}
                                </Button>
                            </form>
                        </Form>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
