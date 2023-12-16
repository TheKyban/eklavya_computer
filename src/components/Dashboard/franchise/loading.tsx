import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export const LoadingCells = () => {
    return Array(10)
        .fill("")
        .map((v, idx) => (
            <TableRow key={idx}>
                <TableCell className="py-6">
                    <Skeleton className="h-5 w-full" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-5 w-full" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-5 w-full" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-5 w-full" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-5 w-full" />
                </TableCell>
            </TableRow>
        ));
};
