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
import CartComponent from "@/components/CartComponent.tsx";

function App() {
  const isLoggedIn = false;
  const [eventId, setEventId] = useState<string | null>(null);

  const onEventIdSet = (eventId: string) => {
    setEventId(eventId);
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
                          src={`https://source.boringavatars.com/marble/120/<user-email>?colors=25106C,7F46DB`}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col text-left">
                        <span className="text-sm font-medium">John Doe</span>
                        <span className="text-xs text-zinc-500">
                          john.doe@nfctron.com
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
              <Button disabled variant="secondary">
                Login or register
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* main body (wrapper) */}
      <main className="grow flex flex-col justify-center">
        {/* inner content */}
        <div className="max-w-screen-lg m-auto p-4 flex items-start grow gap-3 w-full">
          {/* seating card */}
          <Seating eventId={eventId} />

          {/* event info */}
          <Event onEventIdSet={onEventIdSet} />
        </div>
      </main>

      {/* bottom cart affix (wrapper) */}
      <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-center">
        {/* inner content */}
        <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
          {/* total in cart state */}
          <div className="flex flex-col">
            <span>Total for [?] tickets</span>
            <span className="text-2xl font-semibold">[?] CZK</span>
          </div>

          {/* checkout button */}
          <CartComponent />
        </div>
      </nav>
    </div>
  );
}

export default App;
