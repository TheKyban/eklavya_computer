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
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
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
import { IssueType, StudentWithMarksCourse } from "@/lib/TYPES";

export const IssueMarksheetModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "issueMarksheet";
    const { studentsWithMarks, searchParams } = data;
    const [date, setDate] = useState(
        studentsWithMarks?.certificate?.date || new Date(),
    );
    const currentYear = new Date().getFullYear() + 1;

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationKey: ["mutateMarksheetVerification"],
        mutationFn: async ({ registration, date, issue }: IssueType) => {
            const { data } = await axios.put(`/api/management/marksheet`, {
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

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Issue Marksheet</DialogTitle>
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

                        {studentsWithMarks?.marks?.marks?.written && (
                            <TableRow>
                                <TableCell>Written</TableCell>
                                <TableCell>
                                    {studentsWithMarks?.marks?.marks?.written}
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

                        {studentsWithMarks?.marks?.marks?.practical && (
                            <TableRow>
                                <TableCell>Practical</TableCell>
                                <TableCell>
                                    {studentsWithMarks?.marks?.marks?.practical}
                                </TableCell>
                            </TableRow>
                        )}

                        {studentsWithMarks?.marks?.marks?.project && (
                            <TableRow>
                                <TableCell>Project</TableCell>
                                <TableCell>
                                    {studentsWithMarks?.marks?.marks?.project}
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

                {studentsWithMarks?.marksheet.issue ? (
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
