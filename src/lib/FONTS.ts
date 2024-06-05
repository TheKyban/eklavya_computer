import { Open_Sans, Poppins, Montserrat } from "next/font/google";

export const open_sans = Open_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
});

export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    display: "auto",
});

export const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    display: "auto",
});

export async function loadGoogleFont(font: string) {
    const url = `https://fonts.googleapis.com/css2?family=${font}`;
    const css = await (
        await fetch(url, {
            cache: "force-cache",
        })
    ).text();
    const resource = css.match(
        /src: url\((.+)\) format\('(opentype|truetype)'\)/,
    );
    if (resource) {
        const res = await fetch(resource[1], {
            cache: "force-cache",
        });
        if (res.status == 200) {
            return await res.arrayBuffer();
        }
    }

    throw new Error("failed to load font data");
}
