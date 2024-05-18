"use client";
import { format } from "date-fns";
import { HTMLAttributes, useEffect, useState } from "react";

interface Prop extends HTMLAttributes<HTMLParagraphElement> {}

export const TimeComponent = ({ className, ...props }: Prop) => {
    const [time, setTime] = useState(
        format(new Date(), "EEEE, dd MMMM yyyy | HH:mm:ss"),
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(format(new Date(), "EEEE, dd MMMM yyyy | HH:mm:ss"));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <p suppressHydrationWarning className={className} {...props}>
            {time}
        </p>
    );
};
