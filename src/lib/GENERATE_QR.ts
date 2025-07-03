import { Student } from "@prisma/client";
import qrcode from "qrcode";

export default async function GENERATE_QR(student: Student) {
    const QR_Buffer = await qrcode.toDataURL(
        `registration: ${student.registration}; name: ${student.name}; fatherName: ${student.fatherName}; course: ${student.course}`,
        {
            width: 80,
            margin: 0,
            color: {
                light: "#fff",
            },
        },
    );

    return QR_Buffer;
}
