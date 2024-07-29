import { ProjectProps } from "@/types/project";
import { DialogFooter, DialogHeader, DialogClose, Button } from "../ui/index";

interface AssignProjectProps {
  project: ProjectProps;
}

export const AssignForm: React.FC<AssignProjectProps> = ({ project }) => {
  return (
    <>
      <DialogHeader>Asignar proyecto</DialogHeader>
      <DialogFooter>
        <DialogClose asChild aria-label="Close">
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <DialogClose asChild aria-label="Close">
          <Button>Guardar</Button>
        </DialogClose>
      </DialogFooter>
      ;
    </>
  );
};
