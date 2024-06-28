import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { FC } from "react";

interface pageProps {}

const Payment: FC<pageProps> = ({}) => {
    return (
        <div className="flex h-[calc(100vh-80px)] items-center justify-center gap-10 flex-wrap">
            <Image
                src={"/payment.jpeg"}
                alt="upi qr code"
                width={400}
                height={400}
                className="rounded-2xl drop-shadow-lg"
            />
            <div className="flex flex-col gap-2">
                <h1 className="text-center">Bank Details</h1>
                <Table className="px-1">
                    <TableBody>
                        <TableRow>
                            <TableCell>Account Number</TableCell>
                            <TableCell>00000042912910762</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Account Holder</TableCell>
                            <TableCell>
                                EKLAVAYA UNIVERSAL PRIVATE LIMITED
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Bank Name</TableCell>
                            <TableCell>SBI</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>IFSC CODE</TableCell>
                            <TableCell>SBIN0018042</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Payment;
