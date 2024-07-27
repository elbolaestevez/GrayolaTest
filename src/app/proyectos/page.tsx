import React from "react";
import { listFiles } from "@/db/files";
import { ListFiles } from "@/components/list-files";

const Proyectos = async () => {
  const { data } = await listFiles();
  console.log("data", data);

  return (
    <div>
      <ListFiles></ListFiles>
    </div>
  );
};

export default Proyectos;
