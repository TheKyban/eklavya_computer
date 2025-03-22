import GENERATE_QR from "@/lib/GENERATE_QR";
import "./style.css";
import { Prisma } from "../../../../../../../prisma/prisma";
import { MOHAR_IMAGE } from "@/lib/ASSETS";
import { format } from "date-fns";
import STUDENT_STATS from "@/lib/STUDENT_STATS";
import { TO_CAPITALIZE } from "@/lib/STYLES";
import { redirect } from "next/navigation";
import { Duration } from "@/lib/CONSTANTS";

export default async function CertificatePrinter({
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

    const completeDate = (new Date(student.dor).getTime() +
        1000 *
            Duration[
                student.Course.duration as keyof typeof Duration
            ]) as number;

    const qrCodeURl = await GENERATE_QR(student);

    return (
        <div className="certificate-container">
            <span className="absolute top-[106px] left-[820px] text-xs font-semibold">
                EUPL/{student?.serialNumber}
            </span>
            <span className="absolute top-[152px] left-[842px] text-xs font-semibold">
                {student?.registration}
            </span>
            <span className="absolute top-[302px] left-[310px] text-base font-semibold">
                {TO_CAPITALIZE(student?.name)}
            </span>
            <span className="absolute top-[340px] left-[200px] text-base font-semibold">
                {TO_CAPITALIZE(student?.fatherName)}
            </span>
            <span className="absolute top-[378px] left-[390px] text-base font-semibold">
                {student?.Course?.name} ({student?.Course?.fullName})
            </span>
            <span className="absolute top-[418px] left-[280px] text-base font-semibold">
                {student?.Branch?.branch}
            </span>

            <span className="absolute top-[455px] left-[186px] text-base font-semibold">
                {student?.branch}
            </span>

            <span className="absolute top-[455px] left-[465px] text-base font-semibold">
                {student?.Course?.duration}
            </span>
            <span className="absolute top-[455px] left-[690px] text-base font-semibold">
                {format(new Date(completeDate), "MMM yyyy")}
            </span>

            <span className="absolute top-[496px] left-[350px] text-base font-semibold">
                {studentStats?.getGrade()}
            </span>

            <span className="absolute top-[550px] left-[160px] text-sm font-semibold">
                {format(new Date(student.certificate?.date!), "dd/MM/yyyy")}
            </span>
            {/* QR CODE */}
            {/* eslint-disable-next-line  */}
            <img
                src={qrCodeURl}
                alt=""
                className="absolute top-[570px] left-[550px] text-sm font-semibold w-20 h-20"
            />
            {/* eslint-disable-next-line  */}
            <img
                src={MOHAR_IMAGE}
                alt=""
                className="absolute top-[550px] left-[770px] w-24 h-24"
            />
        </div>
    );
}
