"use client";
import { ProjectProps } from "@/types/project";
import { DialogFooter, DialogHeader, DialogClose, Button } from "../ui/index";
import { getDesignersEmails } from "@/db/designer";
import { useEffect, useState } from "react";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";

interface AssignProjectProps {
  project: ProjectProps;
}
interface User {
  id: number;
  user_id: string;
  role: string;
  email: string;
}

export const AssignForm: React.FC<AssignProjectProps> = ({ project }) => {
  const [designers, setDesigners] = useState<User[]>([]);

  useEffect(() => {
    const fetchDesigners = async () => {
      const designersData = await getDesignersEmails(project.id);
      if (designersData) {
        console.log("designers", designersData);
        setDesigners(designersData as User[]);
      } else {
        setDesigners([]);
      }
    };

    fetchDesigners();
  }, [project]);

  return (
    <>
      <DialogHeader>Asignar proyecto</DialogHeader>
      <DialogTitle>hola</DialogTitle>
      <DialogFooter>
        <DialogClose asChild aria-label="Close">
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <DialogClose asChild aria-label="Close">
          <Button>Guardar</Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};
