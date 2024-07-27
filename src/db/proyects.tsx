"use server";
import { getUserFromCookies } from "@/utils/cookies";
import { createClient } from "@/utils/supabase/server";

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
    console.log("Error fetching user:", error);
    return null;
  }

  return data[0];
}

export async function getProjectsByUserId() {
  const supabase = createClient();
  const { userId } = getUserFromCookies();

  const { data, error } = await supabase
    .from("project")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.log("Error fetching projects:", error);
    return null;
  }

  return data;
}
