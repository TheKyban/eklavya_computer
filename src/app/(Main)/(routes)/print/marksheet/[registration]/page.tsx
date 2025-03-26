import GENERATE_QR from "@/lib/GENERATE_QR";
import "./style.css";
import { Prisma } from "../../../../../../../prisma/prisma";
import { MOHAR_IMAGE } from "@/lib/ASSETS";
import { format } from "date-fns";
import STUDENT_STATS from "@/lib/STUDENT_STATS";
import { TO_CAPITALIZE } from "@/lib/STYLES";
import { redirect } from "next/navigation";
import { Noto_Serif } from "next/font/google";

const notoSerif = Noto_Serif({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

export default async function MarksheetPrinter({
    params,
}: {
    params: Promise<{ registration: string }>;
}) {
    const { registration } = await params;
    const student = await Prisma.student.findFirst({
        where: {
            registration,
        },
        include: {
            Course: true,
            Branch: {
                select: {
                    branch: true,
                },
            },
            marks: true,
        },
    });

    if (!student) {
        return redirect("/");
    }
    const studentStats = new STUDENT_STATS(
        [
            student?.marks?.marks?.practical!,
            student?.marks?.marks?.project!,
            student?.marks?.marks?.viva!,
            student?.marks?.marks?.written!,
        ],
        400,
    );
    const qrCodeURl = await GENERATE_QR(student!);
    return (
        <div id="a4-page" className={notoSerif.className}>
            {/* Serial number */}
            <span className="absolute top-[171px] left-[121px] font-semibold text-sm">
                {`EUPL/${student?.serialNumber}`}
            </span>

            {/* registration number */}
            <span className="absolute top-[170px] left-[593px] text-sm font-bold">
                {student?.registration}
            </span>

            {/* Student Image */}

            {/* eslint-disable-next-line */}
            <img
                src={student?.img}
                className="absolute top-[275px] left-[642px] w-20 h-20"
            />

            <span className="absolute top-[268px] left-[247px] font-bold text-base">
                {TO_CAPITALIZE(student?.name)}
            </span>
            <span className="absolute top-[296px] left-[247px] font-bold text-base">
                {TO_CAPITALIZE(student?.motherName)}
            </span>
            <span className="absolute top-[323px] left-[247px] font-bold text-base">
                {TO_CAPITALIZE(student?.fatherName)}
            </span>
            <span className="absolute top-[353px] left-[247px] font-bold text-base">
                {student?.Course?.name} ( {student?.Course?.fullName} )
            </span>
            <span className="absolute top-[380px] left-[247px] font-bold text-base">
                {student?.Course?.duration}
            </span>
            <span className="absolute top-[411px] left-[247px] font-bold text-sm">
                {student?.Branch.branch}
            </span>
            <span className="absolute top-[439px] left-[247px] font-bold text-sm">
                {student?.branch}
            </span>

            {/* MODULES */}
            <pre className="absolute top-[496px] left-[60px] font-extrabold text-base tracking-tight leading-[18px] max-w-[85%] whitespace-pre-line">
                {`${student?.Course?.modules}`}
            </pre>

            {/* Full Marks */}
            <span className="absolute top-[681px] left-[298px] font-bold text-base">
                100
            </span>
            <span className="absolute top-[712px] left-[298px] font-bold text-base">
                100
            </span>
            <span className="absolute top-[744px] left-[298px] font-bold text-base">
                100
            </span>
            <span className="absolute top-[776px] left-[298px] font-bold text-base">
                100
            </span>

            {/* Pass Marks */}
            <span className="absolute top-[681px] left-[431px] font-bold text-base">
                40
            </span>
            <span className="absolute top-[712px] left-[431px] font-bold text-base">
                40
            </span>
            <span className="absolute top-[744px] left-[431px] font-bold text-base">
                40
            </span>
            <span className="absolute top-[776px] left-[431px] font-bold text-base">
                40
            </span>

            {/* Marks */}
            <span className="absolute top-[681px] left-[611px] font-bold text-base">
                {student?.marks?.marks?.written}
            </span>
            <span className="absolute top-[712px] left-[611px] font-bold text-base">
                {student?.marks?.marks?.practical}
            </span>
            <span className="absolute top-[744px] left-[611px] font-bold text-base">
                {student?.marks?.marks?.project}
            </span>
            <span className="absolute top-[776px] left-[611px] font-bold text-base">
                {student?.marks?.marks?.viva}
            </span>

            {/* performance */}
            <span className="absolute top-[825px] left-[295px] font-bold text-base">
                {studentStats?.getPercentage()}%
            </span>
            <span className="absolute top-[825px] left-[600px] font-bold text-base">
                {studentStats?.getPerformance()}
            </span>

            <span className="absolute top-[960px] left-[190px] font-bold text-sm">
                {format(new Date(student.marksheet.date!), "dd/MM/yyyy")}
            </span>

            {/* QR CODE */}
            {/* eslint-disable-next-line  */}
            <img
                src={qrCodeURl}
                alt=""
                className="absolute top-[985px] left-[440px] font-bold text-sm"
            />

            {/* eslint-disable-next-line  */}
            <img
                src={MOHAR_IMAGE}
                alt=""
                className="absolute top-[950px] left-[580px] font-bold text-sm w-28 h-28"
            />
        </div>
    );
}
