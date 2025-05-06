"use client";
import { Duration } from "@/lib/CONSTANTS";
import { StudentWithAllDetails } from "@/lib/TYPES";
import STUDENT_STATS from "@/lib/STUDENT_STATS";
import { TO_CAPITALIZE } from "@/lib/STYLES";
import { MOHAR_IMAGE } from "@/lib/ASSETS";
import { useRef } from "react";
import { formatInTimeZone } from "date-fns-tz";

export const NewCertificate = ({
    qrCodeURl,
    student,
}: {
    student: StudentWithAllDetails;
    qrCodeURl: string;
    sealURL: string;
}) => {
    const completeDate = (new Date(student.dor).getTime() +
        1000 *
            Duration[
                student.Course.duration as keyof typeof Duration
            ]) as number;

    // GRADE
    const studentStats = new STUDENT_STATS(
        [
            student?.marks?.marks?.practical!,
            student?.marks?.marks?.project!,
            student?.marks?.marks?.viva!,
            student?.marks?.marks?.written!,
        ],
        400,
    );

    const ref = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={ref}
            className="certificate-container tracking-widest text-lg font-semibold"
        >
            <span className="absolute top-[142px] left-[865px] text-sm font-semibold tracking-normal">
                EUPL/{student?.serialNumber}
            </span>
            <span className="absolute top-[200px] left-[865px] text-sm font-semibold tracking-normal">
                {student?.registration}
            </span>
            <span className="absolute top-[370px] left-[350px]">
                {TO_CAPITALIZE(student?.name)}
            </span>
            <span className="absolute top-[414px] left-[230px]">
                {TO_CAPITALIZE(student?.fatherName)}
            </span>
            <span className="absolute top-[460px] left-[430px]">
                {student?.Course?.name} ({student?.Course?.fullName})
            </span>
            <span className="absolute top-[503px] left-[300px]">
                {student?.Branch?.branch}
            </span>

            <span className="absolute top-[546px] left-[190px]">
                {student?.branch}
            </span>

            <span className="absolute top-[546px] left-[495px]">
                {student?.Course?.duration}
            </span>
            <span className="absolute top-[546px] left-[700px]">
                {formatInTimeZone(
                    new Date(completeDate),
                    "Asia/Kolkata",
                    "MMM yyyy",
                )}
                {/* {format(new Date(completeDate), "MMM yyyy")} */}
            </span>

            <span className="absolute top-[594px] left-[420px]">
                {studentStats?.getGrade()}
            </span>

            <span className="absolute top-[655px] left-[190px] text-sm font-semibold">
                {formatInTimeZone(
                    new Date(student.certificate?.date!),
                    "Asia/Kolkata",
                    "dd/MM/yyyy",
                )}
                {/* {format(new Date(student.certificate?.date!), "dd/MM/yyyy")} */}
            </span>
            {/* QR CODE */}
            {/* eslint-disable-next-line  */}
            <img
                src={qrCodeURl}
                alt=""
                className="absolute top-[670px] left-[610px] w-24 h-24"
            />
            {/* eslint-disable-next-line  */}
            <img
                src={MOHAR_IMAGE}
                alt=""
                className="absolute top-[640px] left-[810px] w-32 h-32"
            />
        </div>
    );
};
