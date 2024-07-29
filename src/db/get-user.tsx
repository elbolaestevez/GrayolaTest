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
    const { data: usersData, error: usersError } = await supabase
      .from("users")
      .select("role")
      .eq("user_id", data.user.id)
      .single();

    if (usersError) {
      console.error("Error fetching user role:", usersError);
      return data.user;
    }

    if (usersData) {
      data.user.role = usersData.role;
    }
  }

  return data.user;
}
