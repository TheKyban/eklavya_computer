import jsPDF from "jspdf";

export const PDF_DOWNLOAD_HANDLER = (
    canvas: HTMLCanvasElement,
    name: string,
    orientation: "p" | "l" = "p",
    width?: number,
    height?: number,
) => {
    const doc = new jsPDF({
        orientation: orientation,
        format: "A4",
        unit: "px",
    });

    doc.addImage(
        canvas,
        "",
        0,
        0,
        width || doc.internal.pageSize.getWidth(),
        height || doc.internal.pageSize.getHeight(),
    );
    doc.save(name);
};
