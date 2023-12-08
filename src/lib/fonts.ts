import { Inter, Open_Sans, Poppins } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const open_sans = Open_Sans({ subsets: ["latin"] });
export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    display: "auto",
});
