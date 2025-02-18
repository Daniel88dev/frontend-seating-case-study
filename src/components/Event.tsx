import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import Loading from "@/components/Loading.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Label } from "@radix-ui/react-dropdown-menu";

type EventType = {
  eventId: string;
  namePub: string;
  description: string;
  currencyIso: string;
  dateFrom: Date;
  dateTo: Date;
  headerImageUrl: string;
  place: string;
};

type State = {
  loading: boolean;
  error: string | null;
  event: EventType | null;
};

type Props = {
  onEventIdSet: (eventId: string) => void;
};

const DATE_OPTION: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZoneName: "short",
};

const Event = ({ onEventIdSet }: Props) => {
  const [data, setData] = useState<State>({
    loading: true,
    error: null,
    event: null,
  });

  useEffect(() => {
    fetch("https://nfctron-frontend-seating-case-study-2024.vercel.app/event")
      .then<EventType>((response) => response.json())
      .then((response) => {
        setData({
          loading: false,
          error: null,
          event: {
            ...response,
            dateFrom: new Date(response.dateFrom),
            dateTo: new Date(response.dateTo),
          },
        });
        onEventIdSet(response.eventId);
      })
      .catch((error) => {
        setData({
          loading: false,
          error: error.message,
          event: null,
        });
      });
  }, []);

  if (data.error) {
    return <p>Error: {data.error}</p>;
  }

  if (data.loading) {
    return <Loading />;
  }

  return (
    <aside className="w-full max-w-sm bg-white rounded-md shadow-sm p-3 flex flex-col gap-2">
      {/* event header image placeholder */}
      <Avatar>
        <AvatarImage
          className={"aspect-auto rounded-md"}
          src={data.event?.headerImageUrl}
        />
        <AvatarFallback className="bg-zinc-100 rounded-md h-32" />
      </Avatar>
      {/* event name */}
      <h1 className="text-xl text-zinc-900 font-semibold">
        {data.event?.namePub}
      </h1>
      {/* event description */}
      <p className="text-sm text-zinc-500">{data.event?.description}</p>
      <ul className="text-sm text-zinc-500">
        <li>
          <Label className="text-zinc-900">Place:</Label>
          <p>{data.event?.place}</p>
        </li>
        <li>
          <Label className="text-zinc-900">Start:</Label>
          <p>{data.event?.dateFrom.toLocaleString("cs-CZ", DATE_OPTION)}</p>
        </li>
        <li>
          <Label className="text-zinc-900">End:</Label>
          <p>{data.event?.dateTo.toLocaleString("cs-CZ", DATE_OPTION)}</p>
        </li>
      </ul>
      {/* add to calendar button */}
      <Button variant="secondary" disabled>
        Add to calendar
      </Button>
    </aside>
  );
};

export default Event;
