"use client";
import { LoadingCells } from "@/components/loading/loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useModal } from "@/hooks/use-modal-store";
import { useCourse } from "@/hooks/useFetch";
import { Edit } from "lucide-react";

export const CourseList = () => {
    const { data, isLoading } = useCourse();
    const { onOpen } = useModal();
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Courses</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>S.No</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Full Name</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Modules</TableHead>
                                <TableHead className="text-center">
                                    Edit
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {isLoading && <LoadingCells cols={5} rows={10} />}
                            {data?.map((course, idx) => (
                                <TableRow key={course.id}>
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell>{course?.name}</TableCell>
                                    <TableCell>{course?.fullName}</TableCell>
                                    <TableCell>{course?.duration}</TableCell>
                                    <TableCell>{course?.modules}</TableCell>
                                    <TableCell className="text-center">
                                        <Button
                                            size={"icon"}
                                            variant={"secondary"}
                                            onClick={() =>
                                                onOpen("editCourse", {
                                                    course,
                                                })
                                            }
                                        >
                                            <Edit className="w-5 h-5" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};
