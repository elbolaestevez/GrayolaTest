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
  Badge,
  MenubarItem,
} from "@/components/ui/index";
import { InputFile } from "../common/inputFile";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { uploadImage, deleteFileFromStorage } from "@/db/files";
import { createProyect, updateProjectById } from "@/db/proyects";
import { RxCross2 } from "react-icons/rx";
import { useToast } from "../ui/use-toast";
import { ProjectProps } from "@/types/project";

interface CreateProjectProps {
  isCreateMode: boolean;
  project?: ProjectProps;
  filesWithUrls?: (
    | {
        url: null;
        name?: undefined;
      }
    | {
        url: string;
        name: string;
      }
  )[];
}
type FilesWithUrlsType = (
  | {
      url: null;
      name?: undefined;
    }
  | {
      url: string;
      name: string;
    }
)[];

export const ProjectForm: React.FC<CreateProjectProps> = ({
  isCreateMode,
  project,
  filesWithUrls,
}) => {
  const [uploads, setUploads] = useState<FormData[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filesDb, setFilesDb] = useState<FilesWithUrlsType>([]);

  const { toast } = useToast();

  useEffect(() => {
    setTitle(project?.title || "");
    setDescription(project?.description || "");
    setFilesDb(filesWithUrls || []);
  }, [project, filesWithUrls]);

  const isEnabledCreate =
    uploads.length > 0 &&
    title.trim().length > 0 &&
    description.trim().length > 0;

  const isEnabledEdit =
    title.trim().length > 0 && description.trim().length > 0;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      if (selectedFiles.length >= 3) {
        toast({
          description: "Ya superaste el limite de archivos",
        });
        return;
      }
      setSelectedFiles((currentFiles) => [...currentFiles, file]);
      setUploads((currentFiles) => [...currentFiles, formData]);
    }
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  const handleCLose = () => {
    setTitle("");
    setDescription("");
    setUploads([]);
    setSelectedFiles([]);
  };

  const handleCreateProyect = async () => {
    const project = await createProyect(title, description);
    uploads.forEach((upload) => {
      uploadImage(project?.id, upload);
    });
    toast({
      description: "Has creado el proyecto",
    });

    handleCLose();
  };

  const handleEditProyect = async () => {
    if (project?.id) {
      await updateProjectById(project.id, title, description);
      toast({
        description: "Has editado el proyecto",
      });
    }
  };

  const handleRemoveFile = (fileName: string | undefined) => {
    console.log("asdasd", filesDb, fileName);
    if (filesDb && filesDb.length > 0 && fileName) {
      setFilesDb(filesDb.filter((file) => file.name !== fileName));
      handleRemoveFileFromDb(fileName);
    } else if (fileName) {
      setSelectedFiles(selectedFiles.filter((file) => file.name !== fileName));
    }
  };

  const handleRemoveFileFromDb = async (fileName: string) => {
    const filePath = `${project?.user_id}/${project?.id}/${fileName}`;
    const isDeleted = await deleteFileFromStorage(filePath);
    if (isDeleted) {
      toast({
        description: "Archivo eliminado",
      });
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          {isCreateMode ? (
            <Button variant="outline">Crear Proyecto</Button>
          ) : (
            <p className="text-sm cursor-pointer px-2">Editar</p>
          )}
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
            <InputFile
              handleFileChange={handleFileChange}
              inputFileRef={inputFileRef}
            />
            <div className="mt-2 flex flex-col gap-1">
              {filesDb && filesDb.length > 0
                ? filesDb.map((file, i) => (
                    <div key={i + 10} className="flex items-center gap-0.5">
                      <Badge>{file.name}</Badge>
                      <RxCross2 onClick={() => handleRemoveFile(file.name)} />
                    </div>
                  ))
                : selectedFiles.map((file, i) => (
                    <div key={i} className="flex items-center gap-0.5">
                      <Badge>{file.name}</Badge>
                      <RxCross2 onClick={() => handleRemoveFile(file.name)} />
                    </div>
                  ))}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild aria-label="Close">
              <Button
                onClick={() => {
                  handleCLose();
                }}
                variant="outline"
              >
                Cancelar
              </Button>
            </DialogClose>
            <DialogClose asChild aria-label="Close">
              <Button
                onClick={isCreateMode ? handleCreateProyect : handleEditProyect}
                disabled={isCreateMode ? !isEnabledCreate : !isEnabledEdit}
              >
                {isCreateMode ? "Guardar" : "Guardar Edicion"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
