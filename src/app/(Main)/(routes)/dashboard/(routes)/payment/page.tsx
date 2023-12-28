import Image from "next/image";
import { FC } from "react";

interface pageProps {}

const Payment: FC<pageProps> = ({}) => {
    return (
        <div className="flex h-[calc(100vh-80px)] items-center justify-center">
            <div className="relative h-[500px] w-80">
                <Image
                    src={"/payment.jpg"}
                    fill
                    alt="upi qr code"
                    className="rounded-2xl drop-shadow-lg"
                />
            </div>
        </div>
    );
};

export default Payment;
