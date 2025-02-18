import { Seat } from "@/components/Seat.tsx";
import { useEffect, useState } from "react";

type State = {
  loading: boolean;
  error: string | null;
  seating: SeatingType | null;
};

type TicketType = {
  id: string;
  name: string;
  price: number;
};

type SeatType = {
  seatId: string;
  place: number;
  ticketTypeId: string;
};

type SeatRowType = {
  seatRow: number;
  seats: SeatType[];
};

type SeatingType = {
  ticketTypes: TicketType[];
  seatRows: SeatRowType[];
};

export type SeatDataType = {
  ticketType: TicketType;
  seatType: SeatType;
};

const Seating = ({ eventId }: { eventId: string | null }) => {
  const [data, setData] = useState<State>({
    loading: true,
    error: null,
    seating: null,
  });

  console.log(data);

  useEffect(() => {
    if (eventId) {
      fetch(
        `https://nfctron-frontend-seating-case-study-2024.vercel.app/event-tickets?eventId=${eventId}`
      )
        .then<SeatingType>((response) => response.json())
        .then((tickets) => {
          setData({
            loading: false,
            error: null,
            seating: tickets,
          });
        })
        .catch((error) =>
          setData({
            loading: false,
            error: error.message,
            seating: null,
          })
        );
    }
  }, [eventId]);

  if (!eventId && data.loading) {
    return (
      <div
        className="bg-white rounded-md grow grid p-3 self-stretch shadow-sm"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(40px, 1fr))",
          gridAutoRows: "40px",
        }}
      >
        {/*	seating map */}
      </div>
    );
  }

  if (data.error) {
    return <p>Error: {data.error}</p>;
  }

  if (!data.seating) {
    return <div>Seating loading...</div>;
  }
  const { seatRows, ticketTypes } = data.seating;
  const rowsLength = data.seating?.seatRows.map((row) => row.seats.length);
  const maxRowLength = Math.max(...rowsLength);

  return (
    <div
      className="bg-white rounded-md grow flex flex-col p-3 self-stretch shadow-sm gap-x-2"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(40px, 1fr))",
        gridAutoRows: "40px",
      }}
    >
      {/*	seating map */}
      {Array.from({ length: seatRows.length }, (_, rowIndex) => {
        rowIndex += 1;
        return (
          <span key={`row-${rowIndex}`}>
            <span className={"text-black"}>Row {rowIndex}:</span>
            <span>
              {Array.from({ length: maxRowLength }, (_, placeNumber) => {
                placeNumber += 1;
                const ticketData = seatRows[rowIndex - 1].seats.find(
                  (seat) => seat.place === placeNumber
                );
                return (
                  <Seat
                    available={!!ticketData}
                    seatData={
                      ticketData
                        ? {
                            ticketType: ticketTypes.find(
                              (type) => type.id === ticketData.ticketTypeId
                            )!,
                            seatType: ticketData,
                          }
                        : {
                            ticketType: { id: "", name: "", price: 0 },
                            seatType: {
                              seatId: "",
                              place: 0,
                              ticketTypeId: "",
                            },
                          }
                    }
                    key={`row-${rowIndex}-seat-${placeNumber}`}
                    place={placeNumber}
                  />
                );
              })}
            </span>
          </span>
        );
      })}
    </div>
  );
};

export default Seating;
