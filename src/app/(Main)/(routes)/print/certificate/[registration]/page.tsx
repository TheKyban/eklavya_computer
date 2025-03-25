import GENERATE_QR from "@/lib/GENERATE_QR";
import "./style.css";
import { Prisma } from "../../../../../../../prisma/prisma";
import { MOHAR_IMAGE } from "@/lib/ASSETS";
import { redirect } from "next/navigation";
import { StudentWithAllDetails } from "@/lib/TYPES";
import { NewCertificate } from "./components/newCert";

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
        // <CertificateCanvas student={student as StudentWithAllDetails} qrCodeURL={qrCodeURl} sealURL={MOHAR_IMAGE} />
        <NewCertificate
            student={student as StudentWithAllDetails}
            qrCodeURl={qrCodeURl}
            sealURL={MOHAR_IMAGE}
        />
    );
}
