import {
    Album,
    BookUser,
    GraduationCap,
    LucideIcon,
    Home,
    Users,
    LibraryBig,
    IndianRupee,
} from "lucide-react";

interface linkType {
    title: string;
    link?: string;
    icon: LucideIcon;
    download?: string;
    links?: linkType[];
}

const StudentzoneLinks: linkType[] = [
    {
        title: "Addmission",
        link: "/addmission",
        icon: GraduationCap,
    },
    {
        title: "Typing Certificate",
        link: "/studentzone/computerTyping",
        icon: GraduationCap,
    },
    {
        title: "Marksheet",
        link: "/studentzone/marksheet",
        icon: GraduationCap,
    },
    {
        title: "Certificate",
        link: "/studentzone/certificate",
        icon: GraduationCap,
    },
    {
        title: "I-Card",
        link: "/studentzone/icard",
        icon: GraduationCap,
    },
];

const Franchise: linkType[] = [
    {
        title: "Franchise Apply",
        link: "/franchiseApply",
        icon: Users,
    },
    {
        title: "Franchise Verifiy",
        link: "/franchise",
        icon: Users,
    },
];

const AboutUs: linkType[] = [
    {
        title: "About EUPL",
        link: "/about",
        icon: Album,
    },
    {
        title: "Incorporation",
        link: "/about/incorporation",
        icon: Album,
    },
    {
        title: "MSME",
        link: "/about/msme",
        icon: Album,
    },
    {
        title: "ISO",
        link: "/about/iso",
        icon: IndianRupee,
    },
];

export const navbarLinks: linkType[] = [
    {
        title: "Home",
        link: "/",
        icon: Home,
    },
    { title: "Student Zone", links: StudentzoneLinks, icon: GraduationCap },
    { title: "Franchise", links: Franchise, icon: Users },
    { title: "About Us", links: AboutUs, icon: Album },
    {
        title: "Course",
        link: "/course",
        icon: LibraryBig,
    },

    {
        title: "University Programs",
        link: "/university",
        icon: GraduationCap,
    },

    {
        title: "Contact us",
        link: "#contact",
        icon: BookUser,
    },
];
