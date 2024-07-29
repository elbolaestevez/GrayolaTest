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
