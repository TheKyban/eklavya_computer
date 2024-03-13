"use client";
import { Button } from "@/components/ui/button";
import qrcode from "qrcode";
import jsPDF from "jspdf";
import { useEffect, useRef, useState } from "react";

const student = {
    address: {
        state: "Chhattisgarh",
        district: "Bilaspur",
        pincode: "843113",
        street: "rewa road\nnear-indian bank pakri",
    },
    id: "65a05b6d68d5aa579322b234",
    name: "Aditya Kumar",
    img: "https://cyiuhsy2mp34eiga.public.blob.vercel-storage.com/IMG_20230327_194947_2%20(1)_2_11zon-Y6ekQdXMFLPDZhCwyEzBPybHxv3ITA.jpg",
    fatherName: "test name",
    motherName: "test name",
    gender: "MALE",
    qualification: "",
    formNumber: "55555001",
    dob: "2024-01-11T21:18:38.752Z",
    phone: "7479796212",
    email: "aaditya1392@gmail.com",
    dor: "2024-01-11T21:18:38.752Z",
    course: "Advance Excel",
    branch: "55555",
    isVerified: true,
    certificate: true,
    serialNumber: 1,
    written: 22,
    practical: 22,
    project: 25,
    viva: 23,
    englishTyping: null,
    hindiTyping: null,
    branchName: "Anmol education",
};
const MarkSheet = () => {
    const ref = useRef<HTMLCanvasElement>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (ref.current) {
            const canvas = ref.current;
            const ctx = canvas.getContext("2d");
            const image = document.createElement("img");
            image.src = "/samples/sample_mark.jpg";
            image.onload = () => {
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;
                // template
                ctx?.drawImage(image, 0, 0);

                // qr
                qrcode.toDataURL(
                    `${{
                        name: student.name,
                        registration: student.formNumber,
                        father: student.fatherName,
                        mother: student.motherName,
                        course: student.course,
                        branch: student.branch,
                        branchName: student.branchName,
                    }}`,
                    { width: 80, margin: 1 },
                    (er, url) => {
                        const qr = document.createElement("img");
                        qr.src = url;
                        ctx?.drawImage(qr, 530, 50);
                    }
                );

                // texts
                ctx!.font = "bold 14px Arial";
                ctx?.fillText(student.name, 240, 240); // name
                ctx?.fillText(student.motherName, 240, 265); // Mname
                ctx?.fillText(student.fatherName, 240, 287); // fname
                ctx?.fillText(student.course, 240, 310); // course
                ctx?.fillText("6 months", 240, 335); // course
                ctx?.fillText(student.branchName, 240, 360); // course
                ctx?.fillText(student.branch, 240, 385); // course
            };

            setLoading(false);
        }
    }, []);

    const downloadFun = () => {
        const doc = new jsPDF({ orientation: "p" });
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();
        doc.addImage(
            ref?.current as HTMLCanvasElement,
            "",
            0,
            0,
            width,
            height
        );
        doc.output("dataurlnewwindow");
    };

    return (
        <div className="max-w-2xl mx-auto flex flex-col">
            <Button
                variant={"primary"}
                className="my-2 ml-auto"
                disabled={loading}
                onClick={downloadFun}
            >
                PRINT
            </Button>
            <canvas ref={ref} id="myCanvas"></canvas>
        </div>
    );
};

export default MarkSheet;
