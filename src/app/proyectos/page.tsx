import React from "react";
import { ProjectCard } from "@/components/common/proyectCard";
import { Header } from "@/components/common/header";
import { getProjectsByUserId } from "@/db/proyects";

const Proyectos = async () => {
  const projects = await getProjectsByUserId();

  console.log("nuevoo", projects);

  return (
    <div className="h-full w-[90%] m-auto">
      <div className="pt-2 ">
        <Header />
      </div>
      <div className="flex flex-wrap">
        {projects?.map((project) => (
          <div key={project.id} className="px-3 mt-2 mb-2">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Proyectos;
