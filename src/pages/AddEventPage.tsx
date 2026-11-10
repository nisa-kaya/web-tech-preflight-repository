import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventForm from "../components/events/EventForm";

export default function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  const categories = ["Seminer", "Atölye", "Söyleşi", "Yarışma"] as const;

  return (
    <EventForm
      page="add"
      categories={[...categories]}
      onSubmit={(data) => {
        addEvent({
          ...data,
          capacity: String(data.capacity), // number'ı tekrar string'e çeviriyoruz
        });
        navigate("/admin");
      }}
      onCancel={() => navigate("/admin")}
    />
  );
}