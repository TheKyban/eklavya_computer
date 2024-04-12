import { ChangeEvent } from "react";
import { UseFormReturn } from "react-hook-form";
import { franchiseEditSchema, franchiseSchema, studentSchema } from "./schema";
import { z } from "zod";
import { IMAGE_SIZE } from "./constants";
import axios from "axios";

export const ImageHandler = async (
    e: ChangeEvent<HTMLInputElement>,
    Form:
        | UseFormReturn<z.infer<typeof franchiseEditSchema>>
        | UseFormReturn<z.infer<typeof franchiseSchema>>
        | UseFormReturn<z.infer<typeof studentSchema>>,
    setIsUploading: (value: boolean) => void
) => {
    const file = e.target.files?.[0];
    const form = Form as UseFormReturn<
        z.infer<
            | typeof franchiseSchema
            | typeof franchiseEditSchema
            | typeof studentSchema
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
