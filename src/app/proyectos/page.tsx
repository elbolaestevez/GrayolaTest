import React from "react";
import { ProjectCard } from "@/components/common/proyectCard";
import { Header } from "@/components/common/header";
import { getProjectsByUserId, getActiveProjects } from "@/db/proyects";
import { getUser } from "@/db/get-user";
import { getProjectsByDesigner } from "@/db/designer";

const Proyectos = async () => {
  const user = await getUser();
  let projects;
  if (user?.role === "client") {
    projects = await getProjectsByUserId();
  } else if (user?.role === "designer") {
    console.log("entrooooooo");
    projects = await getProjectsByDesigner();
  } else if (user?.role === "admin") {
    projects = await getActiveProjects();
  }

  return (
    <div className="h-full w-[90%] m-auto">
      <div className="pt-2 ">
        <Header />
      </div>
      <div className="flex flex-wrap mt-12">
        {projects?.map((project) => (
          <div key={project.id} className="px-3 mt-2 mb-2">
            <ProjectCard role={user?.role} project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Proyectos;
