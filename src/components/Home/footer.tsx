import { info } from "@/lib/constants";
import { MAX_WIDTH } from "@/lib/styles";

export const Footer = () => {
    const year = new Date(Date.now()).getFullYear();
    return (
        <div
            className={`overflow-hidden flex flex-col m-auto ${MAX_WIDTH} items-center w-full overflow-hidden`}
            id="contact"
        >
            <div className="w-full h-full flex flex-col items-center justify-around ">
                <div className="flex justify-around w-full h-full bg-[#0B0D38] flex-col sm:flex-row gap-6 py-5 ">
                    {info.map((info, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center gap-1 min-w-fit lg:min-w-[300px] w-full text-black"
                        >
                            <info.icon className="w-5 text-indigo-600 h-5" />
                            <span className="text-sm uppercase font-medium text-white">
                                {info.title}
                            </span>
                            <div className="flex flex-col items-center text-white justify-center text-sm">
                                {info.details.map((detail, idx) => (
                                    <span key={idx}>{detail}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <p className="text-center text-xs bg-[#026335] text-white w-full">
                <span>Copyright © 2023-{year} </span>
                <span>Eklavaya Global Computer Pvt. Ltd.</span>
            </p>
        </div>
    );
};
