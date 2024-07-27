import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, ChangeEvent } from "react";
import { uploadImage } from "@/db/files";

export function InputFile() {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      uploadImage(formData);
    }
  };
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Agregar archivo</Label>
      <Input id="picture" type="file" onChange={handleFileChange} />
    </div>
  );
}
