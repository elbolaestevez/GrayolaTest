export interface ProjectProps {
  id: string;
  description: string;
  title: string;
  user_id: string;
}

export interface ProjectCardProps {
  project: ProjectProps;
}
