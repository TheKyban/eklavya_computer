import {
    Album,
    BookUser,
    Contact,
    GraduationCap,
    LucideIcon,
    Table,
    Home,
    Users,
    LibraryBig,
    Computer,
    Database,
    Download,
    Files,
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

export const navbarLinks: linkType[] = [
    {
        title: "Home",
        link: "/",
        icon: Home,
    },
    { title: "Student Zone", links: StudentzoneLinks, icon: GraduationCap },
    { title: "Franchise", links: Franchise, icon: Users },
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
        title: "Affiliation",
        link: "/affiliation",
        icon: LibraryBig,
    },
    {
        title: "About us",
        link: "/about",
        icon: Album,
    },
    {
        title: "Contact us",
        link: "#contact",
        icon: BookUser,
    },
];

const DownloadLinks: linkType[] = [
    {
        title: "Prospectus",
        link: "",
        icon: BookUser,
        download: "prospectus",
    },
    {
        title: "Admission Form",
        link: "",
        icon: Album,
        download: "admissionForm",
    },
    {
        title: "Franchisee Form",
        link: "",
        icon: Contact,
        download: "franchiseeForm",
    },
    {
        title: "Sample Ceritificate",
        link: "",
        icon: GraduationCap,
        download: "sample_certificate",
    },
    {
        title: "Sample Marksheet",
        link: "",
        icon: Table,
        download: "sample_marksheet",
    },
];

const SyllabusLinks: linkType[] = [
    {
        title: "DCA",
        link: "#",
        icon: Computer,
    },
    {
        title: "ADCA",
        link: "#",
        icon: Database,
    },
];
