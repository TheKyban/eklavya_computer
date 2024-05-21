import { ChangeEvent } from "react";
import { UseFormReturn } from "react-hook-form";
import {
    USER_EDIT_SCHEMA,
    USER_SCHEMA,
    STUDENT_APPLICATION_SCHEMA,
    STUDENT_SCHEMA,
    USER_APPLICATION_SCHEMA,
} from "@/lib/SCHEMA";
import { z } from "zod";
import { IMAGE_SIZE } from "@/lib/CONSTANTS";
import axios from "axios";

export const IMAGE_HANDLER = async (
    e: ChangeEvent<HTMLInputElement>,
    Form:
        | UseFormReturn<z.infer<typeof USER_EDIT_SCHEMA>>
        | UseFormReturn<z.infer<typeof USER_SCHEMA>>
        | UseFormReturn<z.infer<typeof STUDENT_SCHEMA>>
        | UseFormReturn<z.infer<typeof STUDENT_APPLICATION_SCHEMA>>
        | UseFormReturn<z.infer<typeof USER_APPLICATION_SCHEMA>>,
    setIsUploading: (value: boolean) => void,
) => {
    const file = e.target.files?.[0];
    const form = Form as UseFormReturn<
        z.infer<
            typeof USER_SCHEMA | typeof USER_EDIT_SCHEMA | typeof STUDENT_SCHEMA
        >
    >;
    if (file) {
        if (file.size > IMAGE_SIZE) {
            form.setError("img", {
                message: "Image Should be lesser than 40kb",
            });
            return;
        }

        try {
            setIsUploading(true);
            if (form?.getValues("img")) {
                await axios.delete(`/api/upload?url=${form.getValues("img")}`);
            }

            const formData = new FormData();
            formData.append("file", file);

            const { data } = await axios.post(`/api/upload`, formData);
            form?.setValue("img", data.secure_url);
            form.setError("img", { message: "" });
        } catch (error: any) {
            form.setError("img", { message: error.message });
        } finally {
            setIsUploading(false);
        }
    }
};
