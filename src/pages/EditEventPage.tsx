import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import EventForm from "../components/events/EventForm";
import NotFoundPage from "./NotFoundPage";

export default function EditEventPage() {
  const { id } = useParams();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();

  const event = findEventById(events, id ?? "");

  if (!event) {
    return <NotFoundPage />;
  }

  const categories = ["Seminer", "Atölye", "Söyleşi", "Yarışma"] as const;

  return (
    <EventForm
      page="update"
      selected={event}
      categories={[...categories]}
      onSubmit={(data) => {
        updateEvent(event.id, {
          ...data,
          capacity: String(data.capacity), // number'ı tekrar string'e çeviriyoruz
        });
        navigate("/admin");
      }}
      onCancel={() => navigate("/admin")}
    />
  );
}