"use client";
import {
  Menubar,
  MenubarTrigger,
  MenubarContent,
  MenubarMenu,
} from "@/components/ui/index";
import { CiMenuKebab } from "react-icons/ci";
import { CreateProject } from "../create-proyect";
import { ProjectProps } from "@/types/project";

interface EditMenuProps {
  project: ProjectProps;
  filesWithUrls: (
    | {
        url: null;
      }
    | {
        url: string;
      }
  )[];
}

export const EditMenu = ({ project, filesWithUrls }: EditMenuProps) => {
  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <CiMenuKebab />
          </MenubarTrigger>

          <MenubarContent className="p-2 px-4">
            <CreateProject
              project={project}
              isCreateMode={false}
              filesWithUrls={filesWithUrls}
            />
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};
