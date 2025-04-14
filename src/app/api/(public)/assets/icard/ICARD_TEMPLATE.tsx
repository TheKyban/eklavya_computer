import { I_CARD_IMAGE, MOHAR_IMAGE } from "@/lib/ASSETS";
import { TO_CAPITALIZE } from "@/lib/STYLES";
import { Student } from "@prisma/client";
import { format } from "date-fns-tz";

export const ICardTemplate = ({
    image,
    student,
}: {
    image: boolean;
    student: Student & {
        Course: {
            name: string;
            fullName: string;
            duration: string;
        };
        Branch: {
            branch: string;
        };
    };
}) => {
    const istDob = format(student.dob, "dd/MM/yyyy", {
        timeZone: "Asia/Kolkata",
    });
    return (
        <div
            style={{
                fontSize: 14,
                color: "black",
                background: "white",
                display: "flex",
                height: "100%",
                width: "100%",
                fontFamily: "NotoSerif",
            }}
        >
            {/* I-CARD TEMPLATES */}
            {image && (
                // eslint-disable-next-line
                <img
                    src={I_CARD_IMAGE}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        objectFit: "contain",
                    }}
                    alt="cert"
                />
            )}
            {/* Student Image */}
            {/* eslint-disable-next-line  */}
            <img
                src={student?.img}
                style={{
                    position: "absolute",
                    top: "15.8vh",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "46vw",
                    height: "48vw",
                    borderRadius: 13,
                }}
            />

            <span
                style={{
                    fontSize: 16,
                    fontWeight: "bolder",
                    position: "absolute",
                    top: "48vh",
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            >
                {TO_CAPITALIZE(student?.name)}
            </span>
            <span style={{ position: "absolute", top: "51.5vh", left: "49vw" }}>
                {student?.registration}
            </span>
            <span
                style={{
                    position: "absolute",
                    top: "55.8vh",
                    left: "44.5vw",
                }}
            >
                {TO_CAPITALIZE(student?.fatherName)}
            </span>

            <span
                style={{ position: "absolute", top: "59.9vh", left: "44.5vw" }}
            >
                {/* {format(new Date(student.dob), "dd/MM/yyyy")} */}
                {istDob}
            </span>

            <span style={{ position: "absolute", top: "64.3vh", left: "40vw" }}>
                {student?.Course?.name}
            </span>
            <span style={{ position: "absolute", top: "68.4vh", left: "40vw" }}>
                {student?.Course?.duration}
            </span>
            <span
                style={{
                    position: "absolute",
                    top: "78vh",
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            >
                {student?.Branch?.branch}
            </span>

            {/* eslint-disable-next-line  */}
            <img
                src={MOHAR_IMAGE}
                alt=""
                style={{
                    width: 108,
                    height: 122,
                    objectFit: "contain",
                    position: "absolute",
                    top: "32vh",
                    left: "53%",
                }}
            />
        </div>
    );
};
