"use client";
import { useToast } from "@/components/ui/use-toast";
import { login, signup } from "@/db/user";
import { Button, Input, Label } from "@/components/ui";

export default function LoginPage() {
  const { toast } = useToast();

  return (
    <form className="max-w-[50%] mx-auto mt-4  p-4 ">
      <div className="mb-5">
        <Label htmlFor="email">Email:</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="mb-5">
        <Label htmlFor="password">Password:</Label>
        <Input id="password" name="password" type="password" required />
      </div>

      <div className="flex gap-4 mt-2 justify-center">
        <Button
          variant={"secondary"}
          formAction={async (formData) => {
            const data = await login(formData);
            if (data?.message == "Could not log in.") {
              toast({
                description: "No has podido loguearte",
              });
            }
          }}
        >
          Log in
        </Button>
        <Button
          variant={"default"}
          formAction={async (formData) => {
            const data = await signup(formData);
            if (data?.message == "Could not create user.") {
              toast({
                description: "No has podido crear la cuenta",
              });
            } else {
              toast({
                description: "Has creado una cuenta, ahora loguiate",
              });
            }
          }}
        >
          Sign up
        </Button>
      </div>
    </form>
  );
}
