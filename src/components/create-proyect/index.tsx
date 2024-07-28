"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  Input,
  Label,
  DialogClose,
} from "@/components/ui/index";
import { InputFile } from "../common/inputFile";
import { useState } from "react";
import { uploadImage } from "@/db/files";
import { createProyect } from "@/db/proyects";

export const CreateProject = ({ isCreateMode }: { isCreateMode: boolean }) => {
  const [uploads, setUploads] = useState<FormData[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const isEnabled =
    uploads.length > 0 &&
    title.trim().length > 0 &&
    description.trim().length > 0;

  const handleGetUpload = (uploadData: FormData) => {
    setUploads((currentUploads) => [...currentUploads, uploadData]);
  };

  const handleCLose = () => {
    setTitle("");
    setDescription("");
    setUploads([]);
  };

  const handleCreateProyect = async () => {
    if (isEnabled) {
      const project = await createProyect(title, description);
      uploads.forEach((upload) => {
        uploadImage(project?.id, upload);
      });
      handleCLose();
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-[120px]" variant="outline">
            {isCreateMode ? "Crear Proyecto" : "Editar proyecto"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isCreateMode ? "Crear Proyecto" : "Editar proyecto"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                className="col-span-3"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                description
              </Label>
              <Input
                id="description"
                value={description}
                className="col-span-3"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <InputFile handleGetUpload={handleGetUpload} />
          </div>
          <DialogFooter>
            <DialogClose aria-label="Close">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  handleCLose();
                }}
              >
                Cancelar
              </Button>
            </DialogClose>

            <Button onClick={handleCreateProyect} disabled={!isEnabled}>
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
