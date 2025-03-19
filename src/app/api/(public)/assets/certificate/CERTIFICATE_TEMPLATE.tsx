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
                fontSize: 21,
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
                        height: "100%",
                        width: "100%",
                    }}
                    alt="cert"
                />
            )}

            <span
                style={{
                    position: "absolute",
                    top: 127,
                    left: 870,
                    fontSize: 16,
                }}
            >
                EUPL/{student?.serialNumber}
            </span>
            <span
                style={{
                    position: "absolute",
                    top: 190,
                    left: 887,
                    fontSize: 13,
                }}
            >
                {student?.registration}
            </span>
            <span style={{ position: "absolute", top: 370, left: 400 }}>
                {TO_CAPITALIZE(student?.name)}
            </span>
            <span style={{ position: "absolute", top: 420, left: 350 }}>
                {TO_CAPITALIZE(student?.fatherName)}
            </span>
            <span
                style={{
                    position: "absolute",
                    top: 468,
                    left: 480,
                    fontSize: 18,
                }}
            >
                {student?.Course?.name} ({student?.Course?.fullName})
            </span>
            <span
                style={{
                    position: "absolute",
                    top: 518,
                    left: 410,
                    fontSize: 18,
                }}
            >
                {student?.Branch?.branch}
            </span>

            <span
                style={{
                    position: "absolute",
                    top: 565,
                    left: 210,
                    fontSize: 18,
                }}
            >
                {student?.branch}
            </span>

            <span
                style={{
                    position: "absolute",
                    top: 565,
                    left: 500,
                    fontSize: 16,
                }}
            >
                {student?.Course?.duration}
            </span>
            <span
                style={{
                    position: "absolute",
                    left: 750,
                    top: 565,
                    fontSize: 16,
                }}
            >
                {format(new Date(completeDate), "MMM yyyy")}
            </span>

            <span
                style={{
                    position: "absolute",
                    top: 615,
                    left: 410,
                    fontSize: 20,
                }}
            >
                {studentStats?.getGrade()}
            </span>

            <span
                style={{
                    position: "absolute",
                    top: 678,
                    left: 170,
                    fontSize: 16,
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
                    top: 680,
                    right: 350,
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
                    top: 650,
                    right: 150,
                }}
            />
        </div>
    );
};
