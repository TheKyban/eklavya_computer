import { MOHAR_IMAGE, TYPING_CERTIFICATE_IMAGE } from "@/lib/ASSETS";
import { TO_CAPITALIZE } from "@/lib/STYLES";
import { StudentWithAllDetails } from "@/lib/TYPES";
import { formatInTimeZone } from "date-fns-tz";

export const TypingCertificateTemplate = ({
    student,
    image,
    qrCodeURl,
}: {
    qrCodeURl: string;
    image: boolean;
    student: StudentWithAllDetails;
}) => {
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
                    src={TYPING_CERTIFICATE_IMAGE}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                    alt="cert"
                />
            )}

            {/* Student details */}

            <span
                style={{
                    position: "absolute",
                    top: 120,
                    left: 1000,
                    color: "white",
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
                    color: "white",
                }}
            >
                {student?.registration}
            </span>
            <span style={{ position: "absolute", top: 298, left: 350 }}>
                {TO_CAPITALIZE(student?.name)}
            </span>
            <span style={{ position: "absolute", top: 343, left: 360 }}>
                {TO_CAPITALIZE(student?.fatherName)}
            </span>
            <span style={{ position: "absolute", top: 388, left: 380 }}>
                {student?.registration}
            </span>
            <span style={{ position: "absolute", top: 433, left: 370 }}>
                {student?.Course?.name}
            </span>
            <span style={{ position: "absolute", top: 433, right: 130 }}>
                {student?.Course?.duration}
            </span>
            <span style={{ position: "absolute", top: 483, left: 330 }}>
                {student?.Branch?.branch}
            </span>
            <span style={{ position: "absolute", top: 528, left: 330 }}>
                {student?.branch}
            </span>

            {/* Performance */}
            <span style={{ position: "absolute", top: 620, right: 490 }}>
                {student?.marks?.typingMarks?.englishTyping}
            </span>
            <span style={{ position: "absolute", top: 665, right: 500 }}>
                {student?.marks?.typingMarks?.hindiTyping}
            </span>

            <span
                style={{
                    position: "absolute",
                    top: 695,
                    left: 240,
                    fontWeight: "bolder",
                    fontSize: 18,
                }}
            >
                {formatInTimeZone(
                    student.certificate?.date!,
                    "Asia/Kolkata",
                    "dd/MM/yyyy",
                )}
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
                    top: 730,
                    right: 430,
                }}
            />

            {/* eslint-disable-next-line  */}
            <img
                src={MOHAR_IMAGE}
                alt=""
                style={{
                    width: 120,
                    height: 120,
                    objectFit: "contain",
                    position: "absolute",
                    top: 700,
                    right: 160,
                }}
            />
        </div>
    );
};
