import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import PDFDocument from "pdfkit";
import { Prisma } from "../../../prisma/prisma";
import { TO_CAPITALIZE } from "@/lib/STYLES";
import { format } from "date-fns";

export default async function Pdf(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "GET") {
            res.statusCode = 404;
            return res.json({ message: "Method not allowed." });
        }
        const { registration } = req.query;

        if (!registration) {
            res.statusCode = 404;
            return res.json({ message: "Registration is required." });
        }

        // FIND STUDENT FROM REGISTRATION
        const student = await Prisma.student.findFirst({
            where: {
                registration: registration as string,
            },
            include: {
                Course: {
                    select: {
                        name: true,
                        duration: true,
                        fullName: true,
                    },
                },
                Branch: {
                    select: {
                        branch: true,
                    },
                },
            },
        });

        // VALIDATE STUDENT
        if (!student) {
            res.statusCode = 404;
            return res.json({
                message: "Student not found",
            });
        }

        if (!student?.isVerified || !student?.icard) {
            res.statusCode = 404;
            return res.json({
                message: !student?.isVerified
                    ? "Not Verified"
                    : "Not Generated",
            });
        }
        const { data } = await axios.get(student?.img, {
            responseType: "arraybuffer",
        });

        const doc = new PDFDocument({
            layout: "portrait",
            size: [300, 480],
        });
        doc.pipe(res);

        doc.image("public/doc/icard.jpg", 0, 0, {
            fit: [300, 480],
        });
        doc.image(data, 80, 73, {
            height: 148,
            width: 140,
        });

        doc.fontSize(14);
        doc.text(TO_CAPITALIZE(student?.name), 0, 230, {
            align: "center",
            width: 300,
        });

        doc.fontSize(12);

        doc.text(student?.registration, 150, 250);
        doc.text(TO_CAPITALIZE(student?.fatherName), 130, 270, {
            width: 200,
        });
        doc.text(format(new Date(student.dob), "dd/MM/yyyy"), 145, 290);
        doc.text(student?.Course.name, 125, 310);
        doc.text(student?.Course?.duration, 135, 330);

        res.writeHead(200, {
            "Content-Type": "application/pdf",
        });
        doc.end();
    } catch (error) {
        console.log(error);
        res.statusCode = 500;
        return res.json({
            error,
            message: "Internal Error",
        });
    }
}
