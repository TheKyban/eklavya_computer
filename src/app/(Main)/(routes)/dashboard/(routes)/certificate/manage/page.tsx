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
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { poppins } from "@/lib/fonts";
import { role } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Layers2, Layers3, Shield, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface pageProps {}

interface student {
    formNumber: string;
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
    formNumber: string;
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

    const { data: fetchUsers, isLoading: isUserLoading } = useQuery({
        queryKey: ["userIds"],
        queryFn: async () => {
            const url = `/api/user?page=1&name=aditya&select=userId,role`;
            const { data } = await axios.get(url);
            return data;
        },
    });

    /**
     * FETCH STUDENTS
     */
    const { data: fetchStudents, isLoading } = useQuery({
        queryKey: [
            "students",
            registration ? registration : "none",
            page ? page : "1",
            user,
            course,
            type,
        ],
        queryFn: async () => {
            const { data } = await axios(
                `/api/verify/marks?userId=${user}&${
                    course === "computerTyping" ? "computerTyping=true&" : "&"
                }verified=${type}&page=${page ? page : "1"}${
                    !!registration ? "&formNumber=" + registration : ""
                }`
            );
            return data;
        },
    });
    useEffect(() => {
        setUser(session?.user.userId);
    }, [session]);

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationKey: ["mutateMarksVerification"],
        mutationFn: async ({
            formNumber,
            verified,
            course,
            userId,
        }: updateType) => {
            if (!user) {
                return;
            }
            const { data } = await axios.put(`/api/verify/marks`, {
                formNumber,
                verified,
                course,
                userId,
            });
            console.log(data);
            return data;
        },

        onSuccess(data, variables) {
            if (data) {
                toast({ description: data?.message });
            }

            // remove data
            queryClient.setQueryData(
                [
                    "students",
                    registration ? registration : "none",
                    page ? page : "1",
                    user,
                    course,
                    type,
                ],
                (oldData: { total: number; studentsWithMarks: student[] }) => {
                    console.log("from query", oldData);
                    const studentsWithMarks = oldData.studentsWithMarks.filter(
                        (student) =>
                            student.formNumber !== data.student.formNumber
                    );

                    return {
                        total: oldData.total - 1,
                        studentsWithMarks,
                    };
                }
            );

            //Add To other type
            queryClient.setQueryData(
                [
                    "students",
                    registration ? registration : "none",
                    page ? page : "1",
                    user,
                    course,
                    type === "false" ? "true" : "false",
                ],
                (oldData: { total: number; studentsWithMarks: student[] }) => {
                    console.log(oldData);
                    return {
                        total: oldData.total + 1,
                        studentsWithMarks: [
                            data.student,
                            ...oldData.studentsWithMarks,
                        ],
                    };
                }
            );
        },
    });

    return (
        <div className="px-5 flex flex-col gap-4">
            <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                    <Layers3 className="text-indigo-400" />
                    <span className="text-zinc-800 text-2xl font-semibold">
                        Manage Certificate
                    </span>
                </div>
                <Search
                    className="w-32 md:w-44"
                    placeholder="Registration"
                    queryName="registration"
                />
            </div>

            <div className="flex flex-wrap gap-5">
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
                                <SelectItem value="other">Others</SelectItem>
                                <SelectItem value="computerTyping">
                                    Computer Typing
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
                                <SelectItem value="true">Verified</SelectItem>
                                <SelectItem value="false">Pending</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div>
                <Table>
                    {/* TABLE HEADER */}
                    <TableHeader>
                        <TableRow>
                            {fetchStudents?.studentsWithMarks?.[0]
                                ?.formNumber && (
                                <TableHead>Registration No.</TableHead>
                            )}
                            {fetchStudents?.studentsWithMarks?.[0]?.name && (
                                <TableHead>Name</TableHead>
                            )}
                            {fetchStudents?.studentsWithMarks?.[0]?.course && (
                                <TableHead>Course</TableHead>
                            )}
                            {fetchStudents?.studentsWithMarks?.[0]?.written && (
                                <TableHead>Written</TableHead>
                            )}
                            {fetchStudents?.studentsWithMarks?.[0]?.viva && (
                                <TableHead className="hidden md:table-cell">
                                    Viva
                                </TableHead>
                            )}
                            {fetchStudents?.studentsWithMarks?.[0]
                                ?.practical && <TableHead>Practical</TableHead>}
                            {fetchStudents?.studentsWithMarks?.[0]?.project && (
                                <TableHead>Projects</TableHead>
                            )}
                            {fetchStudents?.studentsWithMarks?.[0]
                                ?.englishTyping && (
                                <TableHead>English</TableHead>
                            )}
                            {fetchStudents?.studentsWithMarks?.[0]
                                ?.hindiTyping && <TableHead>Hindi</TableHead>}
                            <TableHead className="text-center">
                                Verify
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    {/* TABLE BODY */}
                    <TableBody>
                        {/* SHIMMER */}
                        {isLoading && <LoadingCells n={6} m={6} />}
                        {!isLoading &&
                            fetchStudents?.studentsWithMarks?.map(
                                (student: student) => (
                                    /**
                                     * TABLE ROW
                                     */
                                    <TableRow
                                        key={student.formNumber}
                                        className={poppins.className}
                                    >
                                        {student?.formNumber && (
                                            <TableCell className="font-medium">
                                                {student.formNumber}
                                            </TableCell>
                                        )}

                                        {student?.name && (
                                            <TableCell className="font-medium">
                                                {student.name}
                                            </TableCell>
                                        )}

                                        {student?.course && (
                                            <TableCell className="font-medium">
                                                {student.course}
                                            </TableCell>
                                        )}

                                        {student?.written && (
                                            <TableCell className="font-medium">
                                                {student.written}
                                            </TableCell>
                                        )}

                                        {student?.viva && (
                                            <TableCell>
                                                {student.viva}
                                            </TableCell>
                                        )}

                                        {student?.practical && (
                                            <TableCell className="hidden md:table-cell">
                                                {student.practical}
                                            </TableCell>
                                        )}

                                        {student?.project && (
                                            <TableCell>
                                                {student.project}
                                            </TableCell>
                                        )}

                                        {student?.englishTyping && (
                                            <TableCell>
                                                {student.englishTyping}
                                            </TableCell>
                                        )}
                                        {student?.hindiTyping && (
                                            <TableCell>
                                                {student.hindiTyping}
                                            </TableCell>
                                        )}
                                        <TableCell className="text-center">
                                            <Checkbox
                                                className="box-content"
                                                defaultChecked={
                                                    student.certificate
                                                }
                                                onCheckedChange={(value) =>
                                                    mutate({
                                                        formNumber:
                                                            student.formNumber,
                                                        course: student.course,
                                                        userId: user as string,
                                                        verified:
                                                            value as boolean,
                                                    })
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ManageCertificate;