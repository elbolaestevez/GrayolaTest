"use server";
import { getUserFromCookies } from "@/utils/cookies";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getAllDesigners() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "designer");

  if (error) {
    console.error("Error fetching designers:", error);
    return;
  }

  return data;
}

export async function getProjectsByDesigner(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("designer")
    .select("project_id")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching designer entries:", error);
  } else {
    const project_ids = data.map((entry) => entry.project_id);
    const { data: projectsData, error: projectsError } = await supabase
      .from("project")
      .select("*")
      .in("id", project_ids);

    if (projectsError) {
      console.error("Error fetching projects2:", projectsError);
    } else {
      console.log("Projects:", projectsData);
    }
    return projectsData;
  }
}

export async function getDesignersEmailsByProject(projectId: string) {
  const supabase = createClient();

  const { data: designers, error } = await supabase
    .from("designer")
    .select("user_id")
    .eq("project_id", projectId);

  if (error) {
    console.error("Error fetching designers:", error);
    return;
  }
  const designer_ids = designers.map((entry) => entry.user_id);

  const { data: designerEmail, error: designersError } = await supabase
    .from("users")
    .select("*")
    .in("user_id", designer_ids);

  if (designersError) {
    console.error("Error fetching designers emails:", designersError);
  }

  return designerEmail;
}

export async function assignDesigners(projectId: string, newUserIds: string[]) {
  const supabase = createClient();
  const { error: deleteError } = await supabase
    .from("designer")
    .delete()
    .match({ project_id: projectId });

  if (deleteError) {
    console.error("Error deleting existing designers:", deleteError);
    return { error: deleteError };
  }

  const designerEntries = newUserIds.map((userId) => ({
    project_id: projectId,
    user_id: userId,
  }));

  const { data, error } = await supabase
    .from("designer")
    .insert(designerEntries);

  if (error) {
    console.error("Error inserting designers:", error);
    return { error };
  }
  await revalidatePath("/proyectos");

  return { data };
}
