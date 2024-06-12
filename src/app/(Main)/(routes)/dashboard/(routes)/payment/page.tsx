import Image from "next/image";
import { FC } from "react";

interface pageProps {}

const Payment: FC<pageProps> = ({}) => {
    return (
        <div className="flex h-[calc(100vh-80px)] items-center justify-center">
            <Image
                src={"/payment.jpeg"}
                alt="upi qr code"
                width={400}
                height={400}
                className="rounded-2xl drop-shadow-lg"
            />
        </div>
    );
};

export default Payment;
