"use server";
import { createClient } from "@/utils/supabase/server";
import { getUserFromCookies } from "@/utils/cookies";
import { revalidatePath } from "next/cache";

export async function uploadImage(
  projectId: string,
  formData: FormData,
  userId: string
) {
  const file = formData.get("file") as File;
  const supabase = createClient();
  const { role } = getUserFromCookies();
  const filePath = `${userId}/${projectId}/${file.name}`;
  const { data, error } = await supabase.storage
    .from("uploads")
    .upload(filePath, file);

  if (error) {
    console.log("error", error);
    throw error;
  }
  await revalidatePath("/proyectos");
  return data;
}

export async function listFiles(projectId: string, userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("uploads")
    .list(userId + "/" + projectId);

  if (error) throw error;

  const filesWithUrls = await Promise.all(
    data.map(async (file) => {
      const { data: url } = await supabase.storage
        .from("uploads")
        .getPublicUrl(`${userId}/${projectId}/${file.name}`);

      if (!url) {
        console.error("Error obtaining public URL:");
        return { url: null };
      }

      return { url: url.publicUrl, name: file.name };
    })
  );
  return { filesWithUrls };
}

export async function deleteFileFromStorage(filePath: string) {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("uploads")
    .remove([filePath]);

  if (error) {
    console.error("Error al eliminar el archivo:", error.message);
    return false;
  }
  await revalidatePath("/proyectos");

  return true;
}
