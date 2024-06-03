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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Issue ICard</DialogTitle>
                </DialogHeader>
                <Table>
                    <TableBody>
                        {studentsWithMarks?.registration && (
                            <TableRow>
                                <TableCell>Registration No.</TableCell>
                                <TableCell>
                                    {studentsWithMarks?.registration}
                                </TableCell>
                            </TableRow>
                        )}

                        {studentsWithMarks?.name && (
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{studentsWithMarks?.name}</TableCell>
                            </TableRow>
                        )}

                        {studentsWithMarks?.Course && (
                            <TableRow>
                                <TableCell>Course</TableCell>
                                <TableCell>
                                    {studentsWithMarks?.Course.name}
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
                                                studentsWithMarks?.icard?.issue
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                {studentsWithMarks?.icard.issue ? (
                    <Button
                        variant={"destructive"}
                        onClick={() =>
                            mutate({
                                date,
                                registration: studentsWithMarks?.registration!,
                                issue: false,
                            })
                        }
                        disabled={isPending}
                    >
                        {isPending ? (
                            <Loader className="animate-spin" />
                        ) : (
                            "CANCEL"
                        )}
                    </Button>
                ) : (
                    <Button
                        variant={"primary"}
                        onClick={() =>
                            mutate({
                                date,
                                registration: studentsWithMarks?.registration!,
                                issue: true,
                            })
                        }
                        disabled={isPending}
                    >
                        {isPending ? (
                            <Loader className="animate-spin" />
                        ) : (
                            "ISSUE"
                        )}
                    </Button>
                )}
            </DialogContent>
        </Dialog>
    );
};
