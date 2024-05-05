"use client";
import { LoadingCells } from "@/components/loading/loading";
import Search from "@/components/search/search";
import { Checkbox } from "@/components/ui/checkbox";
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
import { toast } from "@/components/ui/use-toast";
import { useCustumQuery } from "@/hooks/use-queries";
import { useUsers, useVerifyCertificate } from "@/hooks/useFetch";
import { poppins } from "@/lib/fonts";
import { role } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Layers2, Layers3, Shield, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface pageProps {}

interface student {
    registration: string;
    name: string;
    course: string;
    written: string;
    project: string;
    viva: string;
    practical: string;
    englishTyping: string;
    hindiTyping: string;
    certificate: boolean;
}

interface userType {
    role: role;
    userId: string;
}

interface updateType {
    registration: string;
    verified: boolean;
    userId: string;
    course: string;
}

type course = "computerTyping" | "other";
type verify = "false" | "true";
const ManageCertificate: FC<pageProps> = ({}) => {
    const params = useSearchParams();
    const registration = params.get("registration");
    const page = params.get("page");

    const { data: session } = useSession();

    const [user, setUser] = useState(session?.user.userId);
    const [course, setCourse] = useState<course>("other");
    const [type, setType] = useState<verify>("false");

    /**
     * FETCHING USERS
     */

    const { data: fetchUsers, isLoading: isUserLoading } = useUsers(
        "all",
        undefined,
        "userId,role"
    );

    /**
     * FETCH STUDENTS
     */
    const { data: fetchStudents, isLoading } = useVerifyCertificate(
        registration || "",
        page || "1",
        user || "",
        course,
        type
    );
    useEffect(() => {
        setUser(session?.user.userId);
    }, [session]);

    const { addMark, removeMark } = useCustumQuery();
    const { mutate } = useMutation({
        mutationKey: ["mutateMarksVerification"],
        mutationFn: async ({
            registration,
            verified,
            course,
            userId,
        }: updateType) => {
            if (!user) {
                return;
            }
            const { data } = await axios.put(`/api/verify/marks`, {
                registration,
                verified,
                course,
                userId,
            });
            return data;
        },

        onSuccess(data, variables) {
            if (data) {
                toast({ description: data?.message });
            }

            // remove data
            removeMark(
                [
                    "students",
                    registration || "none",
                    page || "1",
                    user,
                    course,
                    type,
                ],
                data?.student?.registration
            );

            //Add To other type
            addMark(
                [
                    "students",
                    registration || "none",
                    page || "1",
                    user,
                    course,
                    type === "false" ? "true" : "false",
                ],
                data?.student
            );
        },
    });

    return (
        <div className="w-screen lg:w-full h-full px-5 flex flex-col gap-4">
            <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                    <Layers3 className="text-indigo-400" />
                    <span className="text-zinc-800 text-lg lg:text-2xl font-semibold">
                        Manage Certificate
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
                <div className="flex flex-col gap-2">
                    <div className="flex gap-1 items-center">
                        <Users className="w-5 h-5 text-teal-500" />
                        <span>USER ID</span>
                    </div>
                    <Select
                        defaultValue={user}
                        value={user}
                        onValueChange={(val) => setUser(val)}
                    >
                        <SelectTrigger className="w-36">
                            <SelectValue placeholder="Select User" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Admin</SelectLabel>
                                <SelectItem
                                    value={session?.user.userId as string}
                                >
                                    {session?.user.userId}
                                </SelectItem>

                                {isUserLoading && (
                                    <SelectItem value="loading2">
                                        Loading...
                                    </SelectItem>
                                )}

                                {fetchUsers?.users?.map(
                                    (user: userType) =>
                                        user.role === "ADMIN" && (
                                            <SelectItem
                                                key={user.userId}
                                                value={user.userId}
                                            >
                                                {user.userId}
                                            </SelectItem>
                                        )
                                )}

                                <SelectLabel>Users</SelectLabel>
                                {isUserLoading && (
                                    <SelectItem value="loading1">
                                        Loading...
                                    </SelectItem>
                                )}

                                {fetchUsers?.users?.map(
                                    (user: userType) =>
                                        user.role === "FRANCHISE" && (
                                            <SelectItem
                                                key={user.userId}
                                                value={user.userId}
                                            >
                                                {user.userId}
                                            </SelectItem>
                                        )
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Course */}
                <div className="flex flex-col gap-2">
                    <div className="flex gap-1 items-center">
                        <Layers2 className="text-rose-500 w-5 h-5" />
                        <span>Courses</span>
                    </div>
                    <Select
                        defaultValue={course}
                        value={course}
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
                {/* Type */}
                <div className="flex flex-col gap-2">
                    <div className="flex gap-1 items-center">
                        <Shield className="text-rose-500 w-5 h-5" />
                        <span>Type</span>
                    </div>
                    <Select
                        defaultValue={type}
                        value={type}
                        onValueChange={(val) => setType(val as verify)}
                    >
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>courses</SelectLabel>
                                <SelectItem value="true">VERIFIED</SelectItem>
                                <SelectItem value="false">PENDING</SelectItem>
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
                            <TableHead className="text-center">
                                Verify
                            </TableHead>
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
                                    <Checkbox
                                        className="box-content"
                                        defaultChecked={student.certificate}
                                        onCheckedChange={(value) =>
                                            mutate({
                                                registration:
                                                    student.registration,
                                                course: student.course,
                                                userId: user as string,
                                                verified: value as boolean,
                                            })
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ManageCertificate;
