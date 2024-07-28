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
import { EditMenu } from "../edit-menu";
import { ProjectCardProps } from "@/types/project";

export async function ProjectCard({ project }: ProjectCardProps) {
  const { filesWithUrls } = await listFiles(project.id, project.user_id);
  const { title, description } = project;
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{title}</CardTitle>
          <EditMenu filesWithUrls={filesWithUrls} project={project} />
        </div>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter className="flex flex-w gap-2">
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
