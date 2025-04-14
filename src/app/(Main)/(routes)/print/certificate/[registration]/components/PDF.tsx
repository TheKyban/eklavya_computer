"use client";

import { PRINT_HANDLER } from "@/lib/PRINT_HANDLER";
import { StudentWithAllDetails } from "@/lib/TYPES";
import { useCallback, useEffect, useRef, useState } from "react";

import STUDENT_STATS from "@/lib/STUDENT_STATS";
import { format } from "date-fns";
import { Duration } from "@/lib/CONSTANTS";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface CertificateCanvasProps {
    student: StudentWithAllDetails;
    qrCodeURL: string;
    sealURL: string;
}

export default function CertificateCanvas({
    student,
    qrCodeURL,
    sealURL,
}: CertificateCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const sizes = {
        // width: 1008, // Convert mm to pixels (1mm ≈ 3.78px)
        // height: 816
        width: 266.7 * 3.78, // Convert mm to pixels (1mm ≈ 3.78px)
        height: 215.9 * 3.78,
    };

    const renderCertificate = useCallback(
        (ctx: CanvasRenderingContext2D) => {
            ctx.font = "normal 14px Arial";
            ctx.fillText(`EUPL/${student?.serialNumber}`, 825, 135);
            ctx.fillText(student.registration, 843, 190);

            ctx.font = "normal 16px Arial";
            ctx.fillText(student.name.toUpperCase(), 310, 370);
            ctx.fillText(student.fatherName.toUpperCase(), 200, 415);
            ctx.fillText(
                `${student.Course.name} (${student.Course.fullName})`,
                390,
                458,
            );
            ctx.fillText(student.Branch.branch, 280, 505);
            ctx.fillText(student.branch, 186, 547);
            ctx.fillText(student.Course.duration, 468, 549);
            const completeDate = (new Date(student.dor).getTime() +
                1000 *
                    Duration[
                        student.Course.duration as keyof typeof Duration
                    ]) as number;

            ctx.fillText(format(new Date(completeDate), "MMM yyyy"), 650, 549);

            // GRADE
            const studentStats = new STUDENT_STATS(
                [
                    student?.marks?.marks?.practical!,
                    student?.marks?.marks?.project!,
                    student?.marks?.marks?.viva!,
                    student?.marks?.marks?.written!,
                ],
                400,
            );

            ctx.fillText(studentStats.getGrade(), 415, 595);

            const certificateDate = new Date(
                student?.certificate?.date as Date,
            ).toLocaleDateString("en-GB");
            ctx.fillText(certificateDate, 163, 653);

            const qrCode = new Image();
            qrCode.src = qrCodeURL;
            qrCode.onload = function () {
                ctx.drawImage(qrCode, 550, 675, 80, 80);
            };

            const seal = new Image();
            seal.crossOrigin = "anonymous";
            seal.src = sealURL;
            seal.onload = function () {
                ctx.drawImage(seal, 770, 655, 96, 96);
            };
        },
        [student, qrCodeURL, sealURL],
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = sizes.width; // Convert mm to pixels (1mm ≈ 3.78px)
        canvas.height = sizes.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // const background = new Image();
        // background.crossOrigin = "anonymous";
        // background.src = "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1718006971/ekavaya_assets/tchirwyjsg8sdxgjibsh.jpg";
        // background.src =
        ("https://res.cloudinary.com/ddgjcyk0q/image/upload/v1715183433/ekavaya_assets/z37jjeti3t0lasea40sn.jpg");

        // background.onload = function () {
        // ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        renderCertificate(ctx);
        // };
    }, [sizes?.height, sizes?.width, renderCertificate]);

    function downloadPDF() {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const pdf = new jsPDF({
            orientation: "landscape", // Ensures correct orientation
            unit: "mm",
            format: [266.7, 215.9], // Exact A4 landscape size
        });

        const imgData = canvas.toDataURL("image/png");

        pdf.addImage(imgData, "PNG", 0, 0, 266.7, 215.9); // Exact positioning
        pdf.save("certificate.pdf");
    }
    return (
        <div>
            <canvas ref={canvasRef} />
            <Button
                onClick={() =>
                    PRINT_HANDLER(canvasRef.current as HTMLCanvasElement)
                }
            >
                Print
            </Button>
            <Button onClick={() => downloadPDF()}>Download</Button>
        </div>
    );
}
