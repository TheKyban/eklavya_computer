import GENERATE_QR from "@/lib/GENERATE_QR";
import "./style.css";
import { Prisma } from "../../../../../../../prisma/prisma";
import { MOHAR_IMAGE } from "@/lib/ASSETS";
import { format } from "date-fns";
import STUDENT_STATS from "@/lib/STUDENT_STATS";
import { TO_CAPITALIZE } from "@/lib/STYLES";
import { redirect } from "next/navigation";
import { Duration } from "@/lib/CONSTANTS";
import CertificateCanvas from "./components/certificate";
import { StudentWithAllDetails } from "@/lib/TYPES";

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

    const qrCodeURl = await GENERATE_QR(student);

    return (
        <CertificateCanvas
            student={student as StudentWithAllDetails}
            qrCodeURL={qrCodeURl}
            sealURL={MOHAR_IMAGE}
        />
    );
}
