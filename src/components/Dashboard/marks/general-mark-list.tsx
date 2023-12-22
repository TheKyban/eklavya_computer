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
import { generalMarksSchema } from "@/lib/schema";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FileSpreadsheet, Pen, Trash, UserCog } from "lucide-react";
import { z } from "zod";

interface queryType {
    total: number;
    studentsWithMarks: z.infer<typeof generalMarksSchema>[];
}

const GeneralEntredMarks = ({}) => {
    const { onOpen } = useModal();
    const { data, isLoading } = useQuery<queryType>({
        queryKey: ["general-students-entered"],
        queryFn: async () => {
            const { data } = await axios("/api/marks/entered");
            return data;
        },
    });

    return (
        <div className="px-5 py-4 flex flex-col gap-4">
            <div className="flex justify-between">
                <h1 className="flex items-center gap-3 lg:text-xl uppercase font-semibold text-teal-700">
                    <FileSpreadsheet className="text-red-600 w-5 h-5" />
                    General Students
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
                            <TableHead>Written</TableHead>
                            <TableHead className="hidden md:table-cell">
                                Viva
                            </TableHead>
                            <TableHead>Practical</TableHead>
                            <TableHead>Projects</TableHead>
                            <TableHead className="text-right">Tools</TableHead>
                        </TableRow>
                    </TableHeader>
                    {/* TABLE BODY */}
                    <TableBody>
                        {/* SHIMMER */}
                        {isLoading && <LoadingCells n={6} m={6} />}
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
                                        {student.written}
                                    </TableCell>
                                    <TableCell>{student.viva}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {student.practical}
                                    </TableCell>
                                    <TableCell>{student.project}</TableCell>
                                    <TableCell className="text-right">
                                        {/* EDIT BTN */}
                                        <Button
                                            variant={"outline"}
                                            size={"sm"}
                                            onClick={() =>
                                                onOpen("editGeneralMarks", {
                                                    generalMarks: student,
                                                })
                                            }
                                            className="px-2 py-0"
                                        >
                                            <Pen className="w-4 h-4" />
                                        </Button>
                                        {/* DELETE BTN */}
                                        <Button
                                            size={"sm"}
                                            variant={"outline"}
                                            onClick={() =>
                                                onOpen("deleteGeneralMarks", {
                                                    generalMarks: student,
                                                })
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

export default GeneralEntredMarks;
