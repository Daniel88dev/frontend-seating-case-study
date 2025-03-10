import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import "./App.css";
import Event from "@/components/Event.tsx";
import { useState } from "react";
import Seating from "@/components/Seating.tsx";
import Footer from "@/components/Footer.tsx";
import Login from "@/components/Login.tsx";

export type LoginState = {
  isLoggedIn: boolean;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
};

function App() {
  const [login, setLogin] = useState<LoginState>({
    isLoggedIn: false,
    email: null,
    firstName: null,
    lastName: null,
  });
  const isLoggedIn = login.isLoggedIn;
  const [eventId, setEventId] = useState<string | null>(null);

  const onEventIdSet = (eventId: string) => {
    setEventId(eventId);
  };

  //login function
  const onLogin = (email: string, firstName: string, lastName: string) => {
    setLogin({
      isLoggedIn: true,
      email: email,
      firstName: firstName,
      lastName: lastName,
    });
  };

  return (
    <div className="flex flex-col grow">
      {/* header (wrapper) */}
      <nav className="sticky top-0 left-0 right-0 bg-white border-b border-zinc-200 flex justify-center">
        {/* inner content */}
        <div className="max-w-screen-lg p-4 grow flex items-center justify-between gap-3">
          {/* application/author image/logo placeholder */}
          <div className="max-w-[250px] w-full flex">
            <div className="bg-zinc-100 rounded-md size-12" />
          </div>
          {/* app/author title/name placeholder */}
          <div className="bg-zinc-100 rounded-md h-8 w-[200px]" />
          {/* user menu */}
          <div className="max-w-[250px] w-full flex justify-end">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src={`https://source.boringavatars.com/marble/120/$<user-email>?colors=25106C,7F46DB`}
                        />
                        <AvatarFallback className={"text-zinc-800"}>
                          {login.firstName ? login.firstName[0] : "J"}
                          {login.lastName ? login.lastName[0] : "D"}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col text-left">
                        <span className="text-sm font-medium text-zinc-800">
                          {login.firstName} {login.lastName}
                        </span>
                        <span className="text-xs text-zinc-500">
                          {login.email ? login.email : "john.doe@nfctron.com"}
                        </span>
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[250px]">
                  <DropdownMenuLabel>John Doe</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem disabled>Logout</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Login onLogin={onLogin} />
            )}
          </div>
        </div>
      </nav>

      {/* main body (wrapper) */}
      <main className="grow flex flex-col justify-center">
        {/* inner content */}
        <div className="max-w-screen-lg m-auto p-4 flex items-start grow gap-3 w-full flex-col-reverse sm:flex-row">
          {/* seating card */}
          <Seating eventId={eventId} />

          {/* event info */}
          <Event onEventIdSet={onEventIdSet} />
        </div>
      </main>

      {/* bottom cart affix (wrapper) */}
      <Footer eventId={eventId!} userData={login} />
    </div>
  );
}

export default App;
