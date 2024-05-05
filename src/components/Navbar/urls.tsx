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
    link: string;
    icon: LucideIcon;
    download?: string;
}

export const singleLink: linkType[] = [
    {
        title: "Home",
        link: "/",
        icon: Home,
    },
    {
        title: "Franchise",
        link: "/franchise",
        icon: Users,
    },
    {
        title: "Course",
        link: "/course",
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
    {
        title: "Addmission",
        link: "/addmission",
        icon: GraduationCap,
    },
    {
        title: "Franchise Apply",
        link: "/franchiseApply",
        icon: Users,
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

const StudentzoneLinks: linkType[] = [
    {
        title: "Registration verification",
        link: "/studentzone/registration",
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

export const AccordionLinks: Array<{
    name: string;
    links: linkType[];
    icon: LucideIcon;
}> = [
    { name: "Student Zone", links: StudentzoneLinks, icon: GraduationCap },
    { name: "Download", links: DownloadLinks, icon: Download },
    { name: "Syllabus", links: SyllabusLinks, icon: Files },
];
