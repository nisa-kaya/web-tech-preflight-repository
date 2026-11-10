import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";

export default function HomePage() {
  const { events } = useEvents();

  const upcoming = [...events]
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
    .slice(0, 2);

  return (
    <>
      <h2 className="bolum-baslik">Yaklaşan 2 Etkinlik</h2>
      <section className="etkinlik-listesi" aria-label="Yaklaşan etkinlikler">
        <EventList events={upcoming} />
      </section>
      <p>
        <Link to="/events" className="buton">
          Tüm etkinlikleri gör
        </Link>
      </p>
    </>
  );
}