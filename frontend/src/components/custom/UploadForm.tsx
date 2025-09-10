import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { addPhotos } from "@/services/gallery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
    Form,
    FormItem,
    FormLabel,
    FormControl,
} from "@/components/ui/form";

type UploadFormProps = {
    category: string;
    onSuccess: () => void;
};

type FormValues = {
    title: string;
    files: File[];
};

export default function UploadForm({ category, onSuccess }: UploadFormProps) {
    const [loading, setLoading] = useState(false);
    const form = useForm<FormValues>({
        defaultValues: {
            title: "",
            files: [],
        },
    });

    const { setValue, watch } = form;
    const files = watch("files");

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "image/jpeg": [], "image/png": [] },
        maxFiles: 10,
        onDrop: (acceptedFiles) => {
            setValue("files", acceptedFiles, { shouldValidate: true });
        },
        onDropRejected: (fileRejections) => {
            if (fileRejections.some(fr => fr.errors.some(e => e.code === "too-many-files"))) {
                toast.error("You can upload a maximum of 10 photos at once");
            }
            if (fileRejections.some(fr => fr.errors.some(e => e.code === "file-invalid-type"))) {
                toast.error("Invalid file type only JPEG and PNG are allowed");
            }
        },
    });

    const onSubmit = async (data: FormValues) => {
        if (!data.files || data.files.length === 0) {
            toast.error("Please select at least one file.");
            return;
        }

        setLoading(true);

        try {
            await addPhotos(data.title, category, data.files);
            toast.success("Photos uploaded successfully");
            onSuccess();
            form.reset();
        } catch (err: unknown) {
            toast.error("Upload failed. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 w-full max-w-md bg-homeside"
            >
                <FormItem>
                    <FormLabel>Category</FormLabel>
                    <p className="font-aboutfont">{category}</p>
                </FormItem>

                <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                        <Controller
                            name="title"
                            control={form.control}
                            render={({ field }) => (
                                <Input placeholder="Provide photo title..." {...field} />
                            )}
                        />
                    </FormControl>
                </FormItem>

                <FormItem>
                    <FormLabel>Files (max 10)</FormLabel>
                    <FormControl>
                        <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                            ${isDragActive ? "border-footerbg/20 bg-footerbg/10" : "border-footerbg/40 bg-aboutpages"}`}
                        >
                            <input {...getInputProps()} />
                            {files && files.length > 0 ? (
                                <div className="grid grid-cols-2 gap-2 text-left">
                                    {files.map((file, idx) => (
                                        <p key={idx} className="truncate text-sm">
                                            {file.name}
                                        </p>
                                    ))}
                                </div>
                            ) : (
                                <p>Drag your files here or click to select</p>
                            )}
                        </div>
                    </FormControl>
                </FormItem>

                <Button type="submit" disabled={loading} className="cursor-pointer">
                    {loading ? "Uploading..." : "Upload"}
                </Button>
            </form>
        </Form>
    );
}
