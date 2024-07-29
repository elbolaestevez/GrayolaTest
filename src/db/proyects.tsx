"use server";
import { getUserFromCookies } from "@/utils/cookies";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createProyect(title: string, description: string) {
  const supabase = createClient();
  const { userId } = getUserFromCookies();

  const { data, error } = await supabase
    .from("project")
    .insert({
      title,
      description,
      user_id: userId,
    })
    .select();

  if (error) {
    throw error;
  }
  await revalidatePath("/proyectos");

  return data[0];
}

export async function getProjectsByUserId(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("project")
    .select("*")
    .eq("user_id", userId)
    .eq("delete", false);

  if (error) {
    console.log("Error fetching projects:", error);
    return null;
  }
  await revalidatePath("/proyectos");

  return data;
}

export async function getActiveProjects() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("project")
    .select("*")
    .eq("delete", false);

  if (error) {
    console.log("Error fetching projects:", error);
    return null;
  }
  await revalidatePath("/proyectos");

  return data;
}

export async function deleteProjectById(projectId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("project")
    .update({ delete: true })
    .match({ id: projectId });

  if (error) {
    console.log("Error deleting project:", error);
    return null;
  }
  await revalidatePath("/proyectos");

  return data;
}

export async function updateProjectById(
  projectId: string,
  title: string,
  description: string
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("project")
    .update({ title, description })
    .match({ id: projectId });

  if (error) {
    console.log("Error updating project:", error);
    throw error;
  }
  await revalidatePath("/proyectos");

  return data;
}
