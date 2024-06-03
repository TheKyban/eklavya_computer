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
import { useState } from "react";
import { DATE_FORMAT } from "@/lib/CONSTANTS";
import { IssueType } from "@/lib/TYPES";

export const IssueCertificateModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "issueCertificate";
    const { studentsWithMarks, searchParams } = data;
    const [date, setDate] = useState(
        studentsWithMarks?.certificate?.date || new Date(),
    );
    const currentYear = new Date().getFullYear() + 1;

    const { addMark, removeMark } = useCustumQuery();
    const { mutate, isPending } = useMutation({
        mutationKey: ["mutateMarksVerification"],
        mutationFn: async ({ registration, issue, date }: IssueType) => {
            const { data } = await axios.put(`/api/management/certificate`, {
                registration,
                issue,
                date,
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

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Issue Certificate</DialogTitle>
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

                        {studentsWithMarks?.marks?.typingMarks
                            ?.englishTyping && (
                            <TableRow>
                                <TableCell>English Typing</TableCell>
                                <TableCell>
                                    {
                                        studentsWithMarks?.marks?.typingMarks
                                            .englishTyping
                                    }
                                </TableCell>
                            </TableRow>
                        )}

                        {studentsWithMarks?.marks?.typingMarks?.hindiTyping && (
                            <TableRow>
                                <TableCell>Hindi Typing</TableCell>
                                <TableCell>
                                    {
                                        studentsWithMarks?.marks?.typingMarks
                                            .hindiTyping
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
                                                studentsWithMarks?.certificate
                                                    ?.issue
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                {studentsWithMarks?.certificate.issue ? (
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
