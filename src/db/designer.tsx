"use server";
import { getUserFromCookies } from "@/utils/cookies";
import { createClient } from "@/utils/supabase/server";

export async function getProjectsByDesigner() {
  const supabase = createClient();
  const { userId } = getUserFromCookies();

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

export async function getDesignersEmails(projectId: string) {
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
    .in("id", designer_ids);

  if (designersError) {
    console.error("Error fetching designers emails:", designersError);
  }

  return designerEmail;
}
