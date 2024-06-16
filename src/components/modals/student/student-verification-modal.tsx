"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Loader } from "lucide-react";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import { useMutation } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { format } from "date-fns";
import { DATE_FORMAT } from "@/lib/CONSTANTS";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCustumQuery } from "@/hooks/use-queries";

export const StudentVerificationModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "studentVerification";
    const { student, searchParams } = data;
    const { removeStudent, addStudent } = useCustumQuery();

    const { mutate, isPending } = useMutation({
        mutationFn: async ({ registration }: { registration: string }) => {
            const { data } = await axios.put(
                `/api/management/student-verification`,
                {
                    registration,
                },
            );
            return data;
        },

        onSuccess(data, variables) {
            if (data) {
                toast({ description: data?.message });
            }

            try {
                onClose();
                // remove Student from the list
                removeStudent(
                    [
                        "student_verification",
                        searchParams?.page || "1",
                        searchParams?.userId,
                        searchParams?.registration
                            ? searchParams?.registration
                            : "",
                        searchParams?.type === "true" ? true : false,
                    ],
                    data.student.registration,
                );

                //Add To other list
                addStudent(
                    [
                        "student_verification",
                        searchParams?.page || "1",
                        searchParams?.userId,
                        searchParams?.registration
                            ? searchParams?.registration
                            : "",
                        searchParams?.type === "false" ? true : false,
                    ],
                    data.student,
                );
            } catch (error) {
                console.log("Error in student switch");
                console.log(error);
            }
        },
    });

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[80vh] h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Student Verification</DialogTitle>
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
                        </TableBody>
                    </Table>

                    <Button
                        type="submit"
                        variant={
                            student?.isVerified ? "destructive" : "primary"
                        }
                        className="w-full"
                        disabled={isPending}
                        onClick={() =>
                            mutate({
                                registration: student?.registration!,
                            })
                        }
                    >
                        {isPending ? (
                            <Loader className="animate-spin" />
                        ) : student?.isVerified ? (
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
