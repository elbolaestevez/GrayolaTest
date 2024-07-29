"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/proyectos");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const user = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data } = await supabase.auth.signUp(user);

  const { error: errorRole } = await supabase.from("users").insert({
    role: "client",
    user_id: data.user?.id,
    email: data.user?.email,
  });

  if (error || errorRole) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/login");
}
