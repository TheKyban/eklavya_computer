"use client";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export const TimeComponent = () => {
    const [time, setTime] = useState(
        format(new Date(), "EEEE, dd MMMM yyyy | HH:mm:ss"),
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(format(new Date(), "EEEE, dd MMMM yyyy | HH:mm:ss"));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <span suppressHydrationWarning>{time}</span>;
};
