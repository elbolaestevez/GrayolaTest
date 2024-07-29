import { Button } from "@/components/ui/button";
import { getUser } from "@/db/get-user";
import { singOut } from "@/db/user";
import { redirect } from "next/navigation";
import { ProjectForm } from "@/components/project-form/index";

export const Header = async () => {
  const user = await getUser();
  async function logout() {
    "use server";
    await singOut();
    redirect("/login");
  }

  return (
    <div className="flex flex-col justify-between  rounded-3xl p-6 h-[80px] box-border bg-gradient-to-r from-blue-900 via-blue-900 to-blue-400">
      <div className="flex justify-end gap-8">
        <p className="pt-1">{user?.email}</p>
        {user?.role === "client" && <ProjectForm isCreateMode={true} />}
        <form action={logout}>
          <Button type="submit" className="w-[130px]" variant="default">
            Cerrar sesion
          </Button>
        </form>
      </div>
    </div>
  );
};
