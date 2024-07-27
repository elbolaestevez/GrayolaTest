import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { listFiles } from "@/db/files";

interface ProjectProps {
  id: string;
  description: string;
  title: string;
  user_id: string;
}

interface ProyectCardProps {
  project: ProjectProps;
}

export async function ProjectCard({ project }: ProyectCardProps) {
  const { filesWithUrls } = await listFiles(project.id, project.user_id);
  const { title, description } = project;
  console.log(filesWithUrls);
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter className="flex justify-between">
        <Button></Button>
      </CardFooter>
    </Card>
  );
}
