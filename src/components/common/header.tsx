import { Button } from "@/components/ui/button";
import { getUser } from "@/db/get-user";
import { singOut } from "@/db/sign-out";
import { redirect } from "next/navigation";
import { CreateProject } from "@/components/create-proyect/index";

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
        <CreateProject isCreateMode={true} />
        <form action={logout}>
          <Button type="submit" className="w-[80px]" variant="default">
            Logout
          </Button>
        </form>
      </div>
    </div>
  );
};
