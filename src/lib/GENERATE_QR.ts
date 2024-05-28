import { Student } from "@prisma/client";
import qrcode from "qrcode";

export default async function GENERATE_QR(student: Student) {
    const QR_Buffer = await qrcode.toBuffer(
        `name: ${student.name}; registration: ${student.registration}; fatherName: ${student.fatherName}; course: ${student.course}`,
        {
            width: 80,
            margin: 0,
            color: {
                light: "#fff7ed",
            },
        },
    );

    const base64Data = Buffer.from(QR_Buffer).toString("base64");
    return "data:" + "image/png;base64," + base64Data;
}
