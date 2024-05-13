import { FileSpreadsheet } from "lucide-react";
import { ReactNode } from "react";

export default function MarksRootPage({
    entry,
    children,
}: {
    children: ReactNode;
    entry: ReactNode;
}) {
    return (
        <div className="flex gap-8 flex-wrap flex-col lg:flex-row items-start justify-center py-3 px-3">
            <div>{entry}</div>
            <div>{children}</div>
        </div>
    );
}
