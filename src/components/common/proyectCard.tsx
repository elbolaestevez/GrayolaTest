import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Badge,
} from "@/components/ui/index";
import { listFiles } from "@/db/files";
import Link from "next/link";

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
  console.log("filesWithUrls", filesWithUrls);
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter className="flex justify-between">
        {filesWithUrls.length > 0 ? (
          filesWithUrls.map((file, i) => (
            <Link key={i} href={file.url || ""} passHref legacyBehavior>
              <a target="_blank" rel="noopener noreferrer">
                <Badge> {`file ${i + 1}`}</Badge>
              </a>
            </Link>
          ))
        ) : (
          <span>No hay archivos disponibles</span>
        )}
      </CardFooter>
    </Card>
  );
}
