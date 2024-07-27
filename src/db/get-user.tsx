"use server";
import { createClient } from "@/utils/supabase/server";

export async function getUser() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error);
    return null; // O maneja el error como prefieras
  }

  return data.user;
}
