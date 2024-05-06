import jsPDF from "jspdf";

export const downloadHandler = (
    canvas: HTMLCanvasElement,
    name: string,
    orientation: "p" | "l" = "p",
) => {
    const doc = new jsPDF({ orientation: orientation });
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    doc.addImage(canvas, "", 0, 0, width, height);
    doc.save(name);
};
