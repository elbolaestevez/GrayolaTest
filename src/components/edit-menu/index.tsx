"use client";
import {
  Menubar,
  MenubarTrigger,
  MenubarContent,
  MenubarMenu,
  MenubarItem,
  MenubarSeparator,
  DialogContent,
  DialogTrigger,
  Dialog,
} from "@/components/ui/index";
import { CiMenuKebab } from "react-icons/ci";
import { ProjectForm } from "../project-form";
import { ProjectProps } from "@/types/project";
import { deleteProjectById } from "@/db/proyects";
import { useToast } from "../ui/use-toast";
import { AssignForm } from "../assign-form";

interface EditMenuProps {
  project: ProjectProps;
  filesWithUrls: (
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

export const EditMenu = ({ project, filesWithUrls }: EditMenuProps) => {
  const { toast } = useToast();

  const handleDeleteProject = async () => {
    await deleteProjectById(project.id);
    toast({
      description: "Has eliminado el proyecto",
    });
  };

  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <CiMenuKebab />
          </MenubarTrigger>

          <MenubarContent className="p-2 px-4">
            <ProjectForm
              project={project}
              isCreateMode={false}
              filesWithUrls={filesWithUrls}
            />

            <MenubarSeparator />
            <MenubarItem onClick={handleDeleteProject}>Eliminar</MenubarItem>
            <MenubarSeparator></MenubarSeparator>
            <Dialog>
              <DialogTrigger asChild>
                <p className="text-sm cursor-pointer px-2">Asignar</p>
              </DialogTrigger>
              <DialogContent>
                <AssignForm project={project} />
              </DialogContent>
            </Dialog>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};
