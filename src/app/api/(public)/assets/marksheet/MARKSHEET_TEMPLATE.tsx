import { MARKSHEET_IMAGE, MOHAR_IMAGE } from "@/lib/ASSETS";
import { TO_CAPITALIZE } from "@/lib/STYLES";
import { StudentWithAllDetails } from "@/lib/TYPES";
import STUDENT_STATS from "@/lib/STUDENT_STATS";
import { formatInTimeZone } from "date-fns-tz";

export const MarksheetTemplate = ({
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
    return (
        <div
            style={{
                fontSize: 16,
                color: "black",
                background: "white",
                width: "100%",
                height: "100%",
                display: "flex",
                fontFamily: "NotoSerif",
                fontWeight: 900,
            }}
        >
            {/* MARKSHEET TEMPLATES */}
            {image && (
                // eslint-disable-next-line
                <img
                    src={MARKSHEET_IMAGE}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                    alt="cert"
                />
            )}
            {/* Serial number */}
            <span
                style={{
                    position: "absolute",
                    top: 173,
                    left: 130,
                }}
            >
                {`EUPL/${student?.serialNumber}`}
            </span>

            {/* registration number */}
            <span
                style={{
                    position: "absolute",
                    top: 173,
                    left: 600,
                }}
            >
                {student?.registration}
            </span>

            {/* Student Image */}

            {/* eslint-disable-next-line */}
            <img
                src={student?.img}
                style={{
                    position: "absolute",
                    top: 273,
                    right: 100,
                    height: 80,
                    width: 80,
                }}
            />

            <span
                style={{
                    position: "absolute",
                    top: 273,
                    left: 280,
                    fontWeight: 900,
                }}
            >
                {TO_CAPITALIZE(student?.name)}
            </span>
            <span style={{ position: "absolute", top: 300, left: 280 }}>
                {TO_CAPITALIZE(student?.motherName)}
            </span>
            <span style={{ position: "absolute", top: 327, left: 280 }}>
                {TO_CAPITALIZE(student?.fatherName)}
            </span>
            <span style={{ position: "absolute", top: 357, left: 280 }}>
                {student?.Course?.name} ( {student?.Course?.fullName} )
            </span>
            <span style={{ position: "absolute", top: 383, left: 280 }}>
                {student?.Course?.duration}
            </span>
            <span style={{ position: "absolute", top: 410, left: 280 }}>
                {student?.Branch.branch}
            </span>
            <span style={{ position: "absolute", top: 440, left: 280 }}>
                {student?.branch}
            </span>

            {/* MODULES */}
            <pre
                style={{
                    position: "absolute",
                    top: 485,
                    left: 60,
                    fontSize: 13,
                    // border: "1px solid red",
                    height: 130,
                    width: 700,
                    lineHeight: 1.3,
                    whiteSpace: "pre-line",
                }}
            >
                {`${student?.Course?.modules}`}
            </pre>

            <>
                {/* Full Marks */}
                <span
                    style={{
                        position: "absolute",
                        top: 692,
                        left: 300,
                        fontSize: 16,
                        fontWeight: 600,
                    }}
                >
                    100
                </span>
                <span
                    style={{
                        position: "absolute",
                        top: 724,
                        left: 300,
                        fontSize: 16,
                        fontWeight: 600,
                    }}
                >
                    100
                </span>
                <span
                    style={{
                        position: "absolute",
                        top: 756,
                        left: 300,
                        fontSize: 16,
                        fontWeight: 600,
                    }}
                >
                    100
                </span>
                <span
                    style={{
                        position: "absolute",
                        top: 788,
                        left: 300,
                        fontSize: 16,
                        fontWeight: 600,
                    }}
                >
                    100
                </span>

                {/* Pass Marks */}
                <span
                    style={{
                        position: "absolute",
                        top: 692,
                        left: 434,
                        fontSize: 16,
                        fontWeight: 600,
                    }}
                >
                    40
                </span>
                <span
                    style={{
                        position: "absolute",
                        top: 724,
                        left: 434,
                        fontSize: 16,
                        fontWeight: 600,
                    }}
                >
                    40
                </span>
                <span
                    style={{
                        position: "absolute",
                        top: 756,
                        left: 434,
                        fontSize: 16,
                        fontWeight: 600,
                    }}
                >
                    40
                </span>
                <span
                    style={{
                        position: "absolute",
                        top: 788,
                        left: 434,
                        fontSize: 16,
                        fontWeight: 600,
                    }}
                >
                    40
                </span>
            </>

            {/* Marks */}
            <span
                style={{
                    position: "absolute",
                    top: 692,
                    right: 170,
                    fontSize: 16,
                    fontWeight: 600,
                }}
            >
                {student?.marks?.marks?.written}
            </span>
            <span
                style={{
                    position: "absolute",
                    top: 724,
                    right: 170,
                    fontSize: 16,
                    fontWeight: 600,
                }}
            >
                {student?.marks?.marks?.practical}
            </span>
            <span
                style={{
                    position: "absolute",
                    top: 758,
                    right: 170,
                    fontSize: 16,
                    fontWeight: 600,
                }}
            >
                {student?.marks?.marks?.project}
            </span>
            <span
                style={{
                    position: "absolute",
                    top: 788,
                    right: 170,
                    fontSize: 16,
                    fontWeight: 600,
                }}
            >
                {student?.marks?.marks?.viva}
            </span>

            {/* performance */}
            <span
                style={{
                    position: "absolute",
                    top: 835,
                    left: 300,
                }}
            >
                {studentStats?.getPercentage()}%
            </span>
            <span
                style={{
                    position: "absolute",
                    top: 835,
                    left: 600,
                }}
            >
                {studentStats?.getPerformance()}
            </span>

            <span
                style={{
                    position: "absolute",
                    top: 968,
                    left: 180,
                    fontWeight: "bolder",
                    fontSize: 16,
                }}
            >
                {formatInTimeZone(
                    student?.marksheet?.date!,
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
                    maxWidth: "60px",
                    maxHeight: "60px",
                    position: "absolute",
                    top: 1015,
                    right: 300,
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
                    top: 960,
                    right: 100,
                }}
            />
        </div>
    );
};
