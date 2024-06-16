import { CERTIFICATE_IMAGE, MOHAR_IMAGE } from "@/lib/ASSETS";
import { TO_CAPITALIZE } from "@/lib/STYLES";
import { StudentWithAllDetails } from "@/lib/TYPES";
import { format } from "date-fns";
import STUDENT_STATS from "@/lib/STUDENT_STATS";
import { Duration } from "@/lib/CONSTANTS";

export const CertificateTemplate = ({
    student,
    image,
    qrCodeURl,
}: {
    qrCodeURl: string;
    image: boolean;
    student: StudentWithAllDetails;
}) => {
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
    return (
        <div
            style={{
                fontSize: 23,
                color: "black",
                background: "white",
                display: "flex",
                height: "100%",
                width: "100%",
                fontFamily: "NotoSerif",
            }}
        >
            {/* CERTIFICATE TEMPLATES */}

            {image && (
                // eslint-disable-next-line
                <img
                    src={CERTIFICATE_IMAGE}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                    alt="cert"
                />
            )}

            <span
                style={{
                    position: "absolute",
                    top: 120,
                    left: 1000,
                    fontSize: 20,
                }}
            >
                EUPL/{student?.serialNumber}
            </span>
            <span
                style={{
                    position: "absolute",
                    top: 178,
                    left: 1005,
                    fontSize: 20,
                }}
            >
                {student?.registration}
            </span>
            <span style={{ position: "absolute", top: 353, left: 480 }}>
                {TO_CAPITALIZE(student?.name)}
            </span>
            <span style={{ position: "absolute", top: 400, left: 460 }}>
                {TO_CAPITALIZE(student?.fatherName)}
            </span>
            <span
                style={{
                    position: "absolute",
                    top: 450,
                    left: 500,
                    fontSize: 22,
                }}
            >
                {student?.Course?.name} ({student?.Course?.fullName})
            </span>
            <span style={{ position: "absolute", top: 490, left: 480 }}>
                {student?.Branch?.branch}
            </span>

            <span style={{ position: "absolute", top: 540, left: 230 }}>
                {student?.branch}
            </span>

            <span
                style={{
                    position: "absolute",
                    top: 540,
                    left: 560,
                    fontSize: 22,
                }}
            >
                {student?.Course?.duration}
            </span>
            <span
                style={{
                    position: "absolute",
                    top: 540,
                    left: 860,
                    fontSize: 22,
                }}
            >
                {format(new Date(completeDate), "MMM yyyy")}
            </span>

            <span
                style={{
                    position: "absolute",
                    top: 590,
                    left: 500,
                    fontSize: 22,
                }}
            >
                {studentStats?.getGrade()}
            </span>

            <span
                style={{
                    position: "absolute",
                    top: 650,
                    left: 220,
                    fontSize: 22,
                }}
            >
                {format(new Date(student.certificate?.date!), "dd/MM/yyyy")}
            </span>
            {/* QR CODE */}
            {/* eslint-disable-next-line  */}
            <img
                src={qrCodeURl}
                alt=""
                style={{
                    maxWidth: "80px",
                    maxHeight: "80px",
                    position: "absolute",
                    top: 670,
                    right: 430,
                }}
            />
            {/* eslint-disable-next-line  */}
            <img
                src={MOHAR_IMAGE}
                alt=""
                style={{
                    width: 100,
                    height: 100,
                    objectFit: "contain",
                    position: "absolute",
                    top: 630,
                    right: 180,
                }}
            />
        </div>
    );
};
