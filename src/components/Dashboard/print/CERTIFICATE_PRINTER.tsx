"use client";
import { LoadingCells } from "@/components/loading/loading";
import Search from "@/components/search/search";
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useVerifyCertificate } from "@/hooks/useFetch";
import { poppins } from "@/lib/FONTS";
import { Layers2, Layers3, Printer, Users } from "lucide-react";
import Link from "next/link";
import { FC, useState } from "react";
import { UserBranchList } from "../UserBranchList";

interface pageProps {
    page: string;
    registration: string;
    branches: { branch: string; userId: string }[];
}

interface updateType {
    registration: string;
    verified: boolean;
    userId: string;
    course: string;
}

type course = "computerTyping" | "other";
const CertificatePrinter: FC<pageProps> = ({
    branches,
    page,
    registration,
}) => {
    const [user, setUser] = useState(branches?.[0].userId);
    const [course, setCourse] = useState<course>("other");

    /**
     * FETCH STUDENTS
     */
    const { data: fetchStudents, isLoading } = useVerifyCertificate(
        registration || "",
        page || "1",
        user,
        course,
        true,
    );

    return (
        <div className="w-screen lg:w-full h-full px-5 flex flex-col gap-4">
            <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                    <Layers3 className="text-indigo-400" />
                    <span className="text-zinc-800 text-lg lg:text-2xl font-semibold">
                        PRINT CERTIFICATE
                    </span>
                </div>
                <Search
                    className="w-32 md:w-44"
                    placeholder="Registration"
                    queryName="registration"
                />
            </div>

            <div className="w-full flex flex-wrap gap-5">
                {/* Users */}
                <UserBranchList
                    user={user}
                    setUser={(val) => setUser(val)}
                    branches={branches}
                    isLoading={isLoading}
                />

                {/* Course */}
                <div className="flex flex-col gap-2">
                    <div className="flex gap-1 items-center">
                        <Layers2 className="text-rose-500 w-5 h-5" />
                        <span>Courses</span>
                    </div>
                    <Select
                        defaultValue={course}
                        value={course}
                        disabled={isLoading}
                        onValueChange={(val) => setCourse(val as course)}
                    >
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select Course" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>courses</SelectLabel>
                                <SelectItem value="other">OTHERS</SelectItem>
                                <SelectItem value="computerTyping">
                                    TYPING
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Table>
                {/* TABLE HEADER */}
                <TableHeader>
                    <TableRow>
                        {fetchStudents?.studentsWithMarks?.[0]
                            ?.registration && (
                            <TableHead>Registration No.</TableHead>
                        )}
                        {fetchStudents?.studentsWithMarks?.[0]?.name && (
                            <TableHead>Name</TableHead>
                        )}
                        {fetchStudents?.studentsWithMarks?.[0]?.course && (
                            <TableHead>Course</TableHead>
                        )}
                        {fetchStudents?.studentsWithMarks?.[0]?.marks?.marks
                            ?.written && <TableHead>Written</TableHead>}
                        {fetchStudents?.studentsWithMarks?.[0]?.marks?.marks
                            ?.viva && (
                            <TableHead className="hidden md:table-cell">
                                Viva
                            </TableHead>
                        )}
                        {fetchStudents?.studentsWithMarks?.[0]?.marks?.marks
                            ?.practical && <TableHead>Practical</TableHead>}
                        {fetchStudents?.studentsWithMarks?.[0]?.marks?.marks
                            ?.project && <TableHead>Projects</TableHead>}
                        {fetchStudents?.studentsWithMarks?.[0]?.marks
                            ?.typingMarks?.englishTyping && (
                            <TableHead>English</TableHead>
                        )}
                        {fetchStudents?.studentsWithMarks?.[0]?.marks
                            ?.typingMarks?.hindiTyping && (
                            <TableHead>Hindi</TableHead>
                        )}
                        {fetchStudents?.studentsWithMarks?.[0] && (
                            <TableHead className="text-center">Print</TableHead>
                        )}
                    </TableRow>
                </TableHeader>
                {/* TABLE BODY */}
                <TableBody>
                    {/* SHIMMER */}
                    {isLoading && <LoadingCells rows={6} cols={6} />}
                    {!isLoading &&
                        fetchStudents?.studentsWithMarks?.map((student) => (
                            /**
                             * TABLE ROW
                             */
                            <TableRow
                                key={student.registration}
                                className={poppins.className}
                            >
                                {student?.registration && (
                                    <TableCell className="font-medium">
                                        {student?.registration}
                                    </TableCell>
                                )}

                                {student?.name && (
                                    <TableCell className="font-medium">
                                        {student?.name}
                                    </TableCell>
                                )}

                                {student?.course && (
                                    <TableCell className="font-medium">
                                        {student?.Course?.name}
                                    </TableCell>
                                )}

                                {student?.marks?.marks?.written && (
                                    <TableCell className="font-medium">
                                        {student?.marks?.marks?.written}
                                    </TableCell>
                                )}

                                {student?.marks?.marks?.viva && (
                                    <TableCell>
                                        {student?.marks?.marks?.viva}
                                    </TableCell>
                                )}

                                {student?.marks?.marks?.practical && (
                                    <TableCell className="hidden md:table-cell">
                                        {student?.marks?.marks?.practical}
                                    </TableCell>
                                )}

                                {student?.marks?.marks?.project && (
                                    <TableCell>
                                        {student?.marks?.marks?.project}
                                    </TableCell>
                                )}

                                {student?.marks?.typingMarks?.englishTyping && (
                                    <TableCell>
                                        {
                                            student?.marks?.typingMarks
                                                ?.englishTyping
                                        }
                                    </TableCell>
                                )}
                                {student?.marks?.typingMarks?.hindiTyping && (
                                    <TableCell>
                                        {
                                            student?.marks?.typingMarks
                                                ?.hindiTyping
                                        }
                                    </TableCell>
                                )}
                                <TableCell className="text-center">
                                    <Link
                                        href={`/print/${course === "computerTyping" ? "typingCertificate" : "certificate"}/${student?.registration}`}
                                        className="flex items-center justify-center"
                                        target="_blank"
                                    >
                                        <Printer className="w-4 h-4" />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CertificatePrinter;
