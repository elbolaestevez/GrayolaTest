"use server";
import { createClient } from "@/utils/supabase/server";

export async function getRole(file: any, userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from("uploads")
    .upload(`file_${Date.now()}`, file);

  if (error) throw error;
  return data;
}
export async function listFiles() {
  const supabase = createClient();

  const { data, error } = await supabase.storage.from("objects").list();
  if (error) throw error;

  console.log("data", data);

  return { data };
}
