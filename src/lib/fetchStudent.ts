import { Student } from "@prisma/client";
import axios from "axios";

export const fetchStuddent = async (registration: string) => {
    const { data } = await axios.get<{
        message: string;
        student: Student & {
            branchName: string;
        };
    }>(`/api/student/${registration}`);

    return data;
};
