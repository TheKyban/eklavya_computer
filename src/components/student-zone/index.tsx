import { Student } from "@prisma/client";
import styles from "./page.module.css";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";

export const Certificate = ({ student }: { student: Student }) => {
    if (!student.certificate) {
        return <div>NOT GENERATED</div>;
    }
    return <div>CERTIFICATE HERE</div>;
};
export const MarkSheet = ({ student }: { student: Student }) => {
    if (
        (student?.course === "Computer Typing" &&
            (!student?.englishTyping || !student?.hindiTyping)) ||
        (student?.course !== "Computer Typing" &&
            (!student?.viva ||
                !student?.written ||
                !student?.project ||
                !student?.practical))
    ) {
        return <div>NOT GENERATED</div>;
    }
    return <div>MARKSHEET HERE</div>;
};
export const RegistrationVerify = ({
    registration,
    name,
    fatherName,
    course,
    branch,
    branchCode,
    img,
}: {
    registration: string;
    name: string;
    fatherName: string;
    course: string;
    branch: string;
    branchCode: string;
    img: string;
}) => {
    return (
        <Card
            id={styles.registrationVerify}
            className="m-auto  relative bg-inherit py-4 overflow-auto"
        >
            <CardContent className="min-w-[500px]">
                <Image src={img} height={100} width={100} alt="profile img" />
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-semibold">
                                Registration
                            </TableCell>
                            <TableCell>{registration}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">
                                Name
                            </TableCell>
                            <TableCell className="capitalize">{name}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="font-semibold">
                                Father&apos;s Name
                            </TableCell>
                            <TableCell className="capitalize">
                                {fatherName}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">
                                Course
                            </TableCell>
                            <TableCell>{course}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">
                                Branch Name
                            </TableCell>
                            <TableCell className="capitalize">
                                {branch}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">
                                Branch Code
                            </TableCell>
                            <TableCell>{branchCode}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
