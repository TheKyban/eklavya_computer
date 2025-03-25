import printJS from "print-js";

export const PRINT_HANDLER = (
    canvas: HTMLCanvasElement,
    configuration?: printJS.Configuration,
) => {
    const toImg = canvas.toDataURL();
    printJS({
        printable: `${toImg}`,
        type: "image",
        imageStyle: "width:100%;height:100%;position:absolute;left:0;top:0;",
        honorMarginPadding: false,
        css: [
            "* { margin: 0; padding: 0; border:none; border-width:0; box-sizing:border-box; }",
        ],
        targetStyles: [
            "* { margin: 0; padding: 0; border: none; border-width:0; box-sizing:border-box;}",
        ],
        ...configuration,
    });
};
