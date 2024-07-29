"use server";
import { createClient } from "@/utils/supabase/server";

export async function getUser() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }
  if (data.user) {
    const { data: rolesData, error: rolesError } = await supabase
      .from("roles")
      .select("role")
      .eq("user_id", data.user.id)
      .single();

    if (rolesError) {
      console.error("Error fetching user role:", rolesError);
      return data.user;
    }

    if (rolesData) {
      data.user.role = rolesData.role;
    }
  }

  return data.user;
}
