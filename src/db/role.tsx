"use server";
import { createClient } from "@/utils/supabase/server";

export async function getRole(user: any) {
  const supabase = createClient();

  const { data: rolesData, error } = await supabase
    .from("roles")
    .select("role")
    .eq("user_id", user?.id)
    .single();

  if (error) throw error;
  return rolesData?.role;
}
