"use server";
import { createClient } from "@/utils/supabase/server";

export async function getRole(userId: string | undefined) {
  const supabase = createClient();

  const { data: rolesData, error } = await supabase
    .from("roles")
    .select("role")
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return rolesData?.role;
}
