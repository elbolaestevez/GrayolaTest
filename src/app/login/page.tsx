import { login, signup } from "./actions";
import { Button, Input, Label } from "@/components/ui";

export default function LoginPage() {
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
        <Button variant={"secondary"} formAction={login}>
          Log in
        </Button>
        <Button variant={"default"} formAction={signup}>
          Sign up
        </Button>
      </div>
    </form>
  );
}
