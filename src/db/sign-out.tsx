"use server";
import { createClient } from "@/utils/supabase/server";

export async function singOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("Error logging out", error);
    return error;
  }

  return;
}
