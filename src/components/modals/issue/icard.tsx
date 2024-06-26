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
import { IssueType, StudentWithAllDetails } from "@/lib/TYPES";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

export const IssueICardModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "issueICard";
    const { student, searchParams } = data;
    const [date, setDate] = useState(student?.certificate?.date || new Date());
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
                            ? "verified_icard"
                            : "pending_icard",
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

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[80vh] h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Issue ICard</DialogTitle>
                </DialogHeader>
                <ScrollArea className="overflow-y-auto h-full w-full">
                    <Image
                        src={student?.img as string}
                        width={200}
                        height={200}
                        className="w-[150px] h-[150px] object-cover rounded-full"
                        alt="profile"
                    />
                    <Table className="px-1">
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
                                                disabled={student?.icard?.issue}
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
                            student?.icard?.issue ? "destructive" : "primary"
                        }
                        className="w-full"
                        disabled={isPending}
                        onClick={() =>
                            mutate({
                                date,
                                issue: !student?.icard?.issue,
                                registration: student?.registration!,
                            })
                        }
                    >
                        {isPending ? (
                            <Loader className="animate-spin" />
                        ) : student?.icard?.issue ? (
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
