import { MARKSHEET_IMAGE } from "@/lib/ASSETS";
import { TO_CAPITALIZE } from "@/lib/STYLES";
import { StudentWithMarksCourseBranchName } from "@/lib/TYPES";
import STUDENT_STATS from "@/lib/STUDENT_STATS";
import { format } from "date-fns";

export const MarksheetTemplate = ({
    student,
    image,
    qrCodeURl,
}: {
    qrCodeURl: string;
    image: boolean;
    student: StudentWithMarksCourseBranchName;
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
                    top: 170,
                    left: 130,
                }}
            >
                {`EUPL/${student?.serialNumber}`}
            </span>

            {/* registration number */}
            <span
                style={{
                    position: "absolute",
                    top: 170,
                    left: 600,
                }}
            >
                {student?.registration}
            </span>

            <span style={{ position: "absolute", top: 270, left: 280 }}>
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
                    fontSize: 14,
                    // border: "1px solid red",
                    height: 130,
                    width: 700,
                    lineHeight: 1.3,
                    whiteSpace: "pre-line",
                }}
            >
                {`${student?.Course?.modules}`}
            </pre>

            {/* Marks */}
            <span
                style={{
                    position: "absolute",
                    top: 687,
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
                    top: 720,
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
                    top: 752,
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
                    top: 783,
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
                    top: 830,
                    left: 300,
                }}
            >
                {studentStats?.getPercentage()}%
            </span>
            <span
                style={{
                    position: "absolute",
                    top: 830,
                    left: 600,
                }}
            >
                {studentStats?.getPerformance()}
            </span>

            <span
                style={{
                    position: "absolute",
                    top: 965,
                    left: 180,
                    fontWeight: "bolder",
                    fontSize: 16,
                }}
            >
                {format(new Date(student.updatedAt), "dd/MM/yyyy")}
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
                    top: 1005,
                    right: 300,
                }}
            />
        </div>
    );
};
