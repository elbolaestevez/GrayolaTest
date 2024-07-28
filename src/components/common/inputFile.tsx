import { Input, Label, Badge } from "@/components/ui/index";
import { ChangeEvent, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";

export function InputFile({
  handleGetUpload,
}: {
  handleGetUpload: (uploadData: FormData) => void;
}) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      handleGetUpload(formData);
      setSelectedFiles((currentFiles) => [...currentFiles, file]);
    }
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
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
        ref={inputFileRef}
      />
      <div className="mt-2 flex flex-col gap-1">
        {selectedFiles.map((file, i) => (
          <div key={i} className="flex items-center gap-0.5">
            <Badge>{file.name}</Badge>
            <RxCross2 className="" />
          </div>
        ))}
      </div>
    </div>
  );
}
