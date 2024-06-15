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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { DATE_FORMAT } from "@/lib/CONSTANTS";
import { IssueType, StudentWithCourse } from "@/lib/TYPES";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

export const IssueICardModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "issueICard";
    const { studentsWithMarks, searchParams } = data;
    const [date, setDate] = useState(
        studentsWithMarks?.certificate?.date || new Date(),
    );
    const currentYear = new Date().getFullYear() + 1;

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationKey: ["mutateMarksheetVerification"],
        mutationFn: async ({ registration, date, issue }: IssueType) => {
            const { data } = await axios.put(`/api/management/icard`, {
                registration,
                date,
                issue,
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
                            ? "pending_icard"
                            : "verified_icard",
                        searchParams?.page,
                        searchParams?.registration,
                        searchParams?.userId,
                    ],
                    (oldData: {
                        students: StudentWithCourse[];
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
                            ? "verified_icard"
                            : "pending_icard",
                        searchParams?.page,
                        searchParams?.registration,
                        searchParams?.userId,
                    ],
                    (oldData: {
                        students: StudentWithCourse[];
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

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[80vh] h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Issue ICard</DialogTitle>
                </DialogHeader>
                <ScrollArea className="overflow-y-auto h-full w-full">
                    <Image
                        src={studentsWithMarks?.img as string}
                        width={200}
                        height={200}
                        className="w-[150px] h-[150px] object-cover rounded-full"
                        alt="profile"
                    />
                    <Table className="px-1">
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
                                                    studentsWithMarks?.icard
                                                        ?.issue
                                                }
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Button
                        type="submit"
                        variant={
                            studentsWithMarks?.icard?.issue
                                ? "destructive"
                                : "primary"
                        }
                        className="w-full"
                        disabled={isPending}
                        onClick={() =>
                            mutate({
                                date,
                                issue: !studentsWithMarks?.icard?.issue,
                                registration: studentsWithMarks?.registration!,
                            })
                        }
                    >
                        {isPending ? (
                            <Loader className="animate-spin" />
                        ) : studentsWithMarks?.icard?.issue ? (
                            "CANCEL"
                        ) : (
                            "ISSUE"
                        )}
                    </Button>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
