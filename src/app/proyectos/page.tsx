import React from "react";
import { listFiles } from "@/db/files";

const Proyectos = async () => {
  const { data } = await listFiles();
  console.log("dataa", data);
  return <div>Proyectos</div>;
};

export default Proyectos;
