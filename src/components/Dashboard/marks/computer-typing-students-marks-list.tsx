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
import { useStudentMarkEntered } from "@/hooks/useFetch";
import { per_page } from "@/lib/CONSTANTS";
import { poppins } from "@/lib/FONTS";
import { Pen, TextCursorInput, Trash } from "lucide-react";

const ComputerTypingEnteredMarks = ({
    page,
    registration,
}: {
    registration: string | null;
    page: string | null;
}) => {
    const { onOpen } = useModal();
    const { data, isLoading } = useStudentMarkEntered(
        page || "1",
        registration || "",
        true,
    );

    return (
        <div className="px-5 py-4 flex flex-col gap-4">
            <div className="flex justify-between">
                <h1 className="flex items-center gap-3 lg:text-xl uppercase font-semibold text-teal-700">
                    <TextCursorInput className="text-red-600 w-5 h-5" />
                    Computer Typing
                </h1>
                <Search
                    className="w-32 md:w-44 text-xs lg:text-sm"
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
                        {isLoading && <LoadingCells rows={6} cols={4} />}
                        {!isLoading &&
                            data?.studentsWithMarks?.map((student) => (
                                /**
                                 * TABLE ROW
                                 */
                                <TableRow
                                    key={
                                        student?.marks
                                            ?.studentRegistrationNumber
                                    }
                                    className={poppins.className}
                                >
                                    <TableCell className="font-medium">
                                        {
                                            student?.marks
                                                ?.studentRegistrationNumber
                                        }
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {
                                            student?.marks?.typingMarks
                                                ?.englishTyping
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            student?.marks?.typingMarks
                                                ?.hindiTyping
                                        }
                                    </TableCell>
                                    <TableCell className="text-right flex justify-end gap-2">
                                        {/* EDIT BTN */}
                                        <Button
                                            variant={"outline"}
                                            size={"sm"}
                                            onClick={() => {
                                                onOpen(
                                                    "editComputerTypingMarks",
                                                    {
                                                        computerTypingMarks: {
                                                            registration:
                                                                student?.marks
                                                                    ?.studentRegistrationNumber,
                                                            ...student?.marks
                                                                ?.typingMarks!,
                                                        },
                                                        searchParams: {
                                                            page: page
                                                                ? page
                                                                : "1",
                                                            registration:
                                                                registration
                                                                    ? registration
                                                                    : "none",
                                                        },
                                                    },
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
                                                        computerTypingMarks: {
                                                            registration:
                                                                student?.marks
                                                                    ?.studentRegistrationNumber,
                                                            ...student?.marks
                                                                ?.typingMarks!,
                                                        },
                                                        searchParams: {
                                                            page: page
                                                                ? page
                                                                : "1",
                                                            registration:
                                                                registration
                                                                    ? registration
                                                                    : "none",
                                                        },
                                                    },
                                                )
                                            }
                                            className="px-2 py-0"
                                        >
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                {data && data?.total > per_page && (
                    <Pagination
                        total={data?.total || 0}
                        isLoading={isLoading}
                    />
                )}
            </div>
        </div>
    );
};

export default ComputerTypingEnteredMarks;
