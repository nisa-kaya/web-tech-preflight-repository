import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  emptyText?: string; 
}

export default function EventList({ events, emptyText }: EventListProps) {
  if (events.length === 0) {
    return <p className="sonuc">{emptyText || "Etkinlik bulunamadı."}</p>;
  }

  return (
    <>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </>
  );
}