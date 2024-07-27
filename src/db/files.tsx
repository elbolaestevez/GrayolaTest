"use server";
import { createClient } from "@/utils/supabase/server";
import { getUserFromCookies } from "@/utils/cookies";

export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File;
  console.log("file", file);
  const supabase = createClient();
  const { role, userId } = getUserFromCookies();
  console.log("role", role, userId);

  const { data, error } = await supabase.storage
    .from("uploads")
    .upload(userId + "/" + Date.now(), file);

  if (error) throw error;
  return data;
}
export async function listFiles() {
  const supabase = createClient();
  const { role, userId } = getUserFromCookies();

  const { data, error } = await supabase.storage
    .from("uploads")
    .list(userId + "/");

  if (error) throw error;

  return { data };
}
