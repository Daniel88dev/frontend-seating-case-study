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
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { toast } from "sonner";

type Props = {
  onLogin: (email: string, firstName: string, lastName: string) => void;
};

type UserType = {
  email: string;
  firstName: string;
  lastName: string;
};

type ResponseType = {
  user: UserType;
  message: string;
};
//login information to prevent entering them manually
const PASSWORD = "Nfctron2025";
const EMAIL = "frontend@nfctron.com";

const Login = ({ onLogin }: Props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  //form login function
  const onLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    //validating inputs
    if (!email) {
      setError("Email is required");
      setIsLoading(false);
      return;
    }

    if (!password) {
      setError("Password is required");
      setIsLoading(false);
      return;
    }
    //api call
    const response = await fetch(
      "https://nfctron-frontend-seating-case-study-2024.vercel.app/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      }
    );
    //handling not succesfull login attempt
    if (!response.ok) {
      setError("Invalid email or password");
      toast.error("Invalid email or password", { style: { color: "red" } });
      setIsLoading(false);
      return;
    }
    //obtaining data from response
    const { user, message }: ResponseType = await response.json();

    console.log(message);
    //calling parent function to store recieved login information and closing dialog
    onLogin(user.email, user.firstName, user.lastName);
    toast("Login Successful!");
    setError(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className={"bg-white text-black"}>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={onLoginSubmit}>
          <Label htmlFor={"email"}>E-Mail:</Label>
          <Input
            id={"email"}
            name={"email"}
            type={"email"}
            defaultValue={EMAIL}
          />
          <Label htmlFor={"password"}>Password:</Label>
          <Input
            id={"password"}
            name={"password"}
            type={"password"}
            defaultValue={PASSWORD}
          />
          {error && <p className={"text-red-500"}>{error}</p>}
          <DialogFooter className={"mt-4"}>
            <Button
              variant="secondary"
              className={"hover:bg-black"}
              type={"submit"}
              disabled={isLoading}
            >
              Login
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
