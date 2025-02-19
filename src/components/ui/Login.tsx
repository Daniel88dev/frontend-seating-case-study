import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FormEvent, useState } from "react";
import { Input } from "postcss";

type Props = {
  onLogin: (email: string, firstName: string, lastName: string) => void;
};
//login information to prevent entering them manually
const PASSWORD = "Nfctron2025";
const EMAIL = "frontend@nfctron.com";

const Login = ({ onLogin }: Props) => {
  const [open, setOpen] = useState(false);

  const onLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    onLogin(email, "John", "Doe");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Login or register
        </Button>
      </DialogTrigger>
      <DialogContent className={"bg-white text-black"}>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={onLoginSubmit}>
          <label htmlFor={"email"}>E-Mail:</label>
          <input
            id={"email"}
            name={"email"}
            type={"email"}
            defaultValue={EMAIL}
          />
          <label htmlFor={"password"}>Password:</label>
          <input
            id={"password"}
            name={"password"}
            type={"password"}
            defaultValue={PASSWORD}
          />
          <DialogFooter>
            <Button
              variant="secondary"
              className={"hover:bg-black"}
              type={"submit"}
            ></Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
