import { LoadingCells } from "@/components/loading/loading";
import Pagination from "@/components/pagination/pagination";
import Search from "@/components/search/search";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useModal } from "@/hooks/use-modal-store";
import { poppins } from "@/lib/fonts";
import { typingSpeedMarkSchema } from "@/lib/schema";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Pen, TextCursorInput, Trash } from "lucide-react";
import { z } from "zod";

interface queryType {
    total: number;
    studentsWithMarks: z.infer<typeof typingSpeedMarkSchema>[];
}

const ComputerTypingEnteredMarks = ({
    page,
    registration,
}: {
    registration: string | null;
    page: string | null;
}) => {
    const { onOpen } = useModal();
    const { data, isLoading } = useQuery<queryType>({
        queryKey: [
            "computer-typing-students-entered",
            page ? page : "1",
            registration ? registration : "none",
        ],
        queryFn: async () => {
            const { data } = await axios(
                `/api/marks/entered?computerTyping=true&page=${page}${
                    !!registration ? "&formNumber=" + registration : ""
                }`
            );
            return data;
        },
    });

    return (
        <div className="px-5 py-4 flex flex-col gap-4">
            <div className="flex justify-between">
                <h1 className="flex items-center gap-3 lg:text-xl uppercase font-semibold text-teal-700">
                    <TextCursorInput className="text-red-600 w-5 h-5" />
                    Computer Typing
                </h1>
                <Search
                    className="w-32 md:w-44"
                    placeholder="Registration"
                    queryName="registration"
                />
            </div>

            <div>
                <Table>
                    {/* TABLE HEADER */}
                    <TableHeader>
                        <TableRow>
                            <TableHead>Registration No.</TableHead>
                            <TableHead>English</TableHead>
                            <TableHead>Hindi</TableHead>
                            <TableHead className="text-right">Tools</TableHead>
                        </TableRow>
                    </TableHeader>
                    {/* TABLE BODY */}
                    <TableBody>
                        {/* SHIMMER */}
                        {isLoading && <LoadingCells n={6} m={4} />}
                        {!isLoading &&
                            data?.studentsWithMarks?.map((student) => (
                                /**
                                 * TABLE ROW
                                 */
                                <TableRow
                                    key={student.formNumber}
                                    className={poppins.className}
                                >
                                    <TableCell className="font-medium">
                                        {student.formNumber}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {student.englishTyping}
                                    </TableCell>
                                    <TableCell>{student.hindiTyping}</TableCell>
                                    <TableCell className="text-right">
                                        {/* EDIT BTN */}
                                        <Button
                                            variant={"outline"}
                                            size={"sm"}
                                            onClick={() => {
                                                onOpen(
                                                    "editComputerTypingMarks",
                                                    {
                                                        computerTypingMarks:
                                                            student,
                                                        searchParams: {
                                                            page: page
                                                                ? page
                                                                : "1",
                                                            registration:
                                                                registration
                                                                    ? registration
                                                                    : "none",
                                                        },
                                                    }
                                                );
                                            }}
                                            className="px-2 py-0"
                                        >
                                            <Pen className="w-4 h-4" />
                                        </Button>
                                        {/* DELETE BTN */}
                                        <Button
                                            size={"sm"}
                                            variant={"outline"}
                                            onClick={() =>
                                                onOpen(
                                                    "deleteComputerTypingMarks",
                                                    {
                                                        computerTypingMarks:
                                                            student,
                                                        searchParams: {
                                                            page: page
                                                                ? page
                                                                : "1",
                                                            registration:
                                                                registration
                                                                    ? registration
                                                                    : "none",
                                                        },
                                                    }
                                                )
                                            }
                                            className="ml-2 px-2 py-0"
                                        >
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <Pagination total={data?.total || 0} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default ComputerTypingEnteredMarks;
