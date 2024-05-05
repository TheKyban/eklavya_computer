import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export const LoadingCells = ({
    rows = 10,
    cols = 5,
}: {
    rows?: number;
    cols?: number;
}) => {
    return Array(rows)
        .fill("")
        .map((v, idx) => (
            <TableRow key={idx}>
                {Array(cols)
                    .fill("")
                    .map((x, i) => (
                        <TableCell key={i} className="py-6">
                            <Skeleton className="h-5 w-full" />
                        </TableCell>
                    ))}
                {/* <TableCell>
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
                </TableCell> */}
            </TableRow>
        ));
};
