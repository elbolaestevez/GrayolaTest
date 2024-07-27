import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent } from "react";

export function InputFile({
  handleGetUpload,
}: {
  handleGetUpload: (uploadData: FormData) => void;
}) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      handleGetUpload(formData);
    }
  };
  return (
    <div className="grid w-full mt-8 max-w-sm items-center gap-1.5">
      <Label className="text-center" htmlFor="picture">
        Agregar archivo
      </Label>
      <Input
        className="mt-2 pl-[74px]"
        id="picture"
        type="file"
        onChange={handleFileChange}
      />
    </div>
  );
}
