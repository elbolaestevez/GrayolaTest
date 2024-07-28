import { Input, Label, Badge } from "@/components/ui/index";
import { ChangeEvent } from "react";

export function InputFile({
  handleFileChange,
  inputFileRef,
}: {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputFileRef: React.RefObject<HTMLInputElement>;
}) {
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
    </div>
  );
}
