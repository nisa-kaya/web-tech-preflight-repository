import { useState, useMemo } from "react";
import { useEvents } from "../context/EventsContext";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";
import { filterByCategory, searchEvents } from "../utils/filter-events";
import type { Category } from "../types/campus-event";

export default function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

  const filtered = useMemo(
    () => filterByCategory(searchEvents(events, searchText), category),
    [events, searchText, category],
  );

  return (
    <>
      <EventFilter
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
      />
      <p id="sonuc" className="sonuc" aria-live="polite">
        {`${filtered.length} etkinlik listeleniyor.`}
      </p>
      <section id="etkinlik-listesi" className="etkinlik-listesi" aria-label="Tüm etkinlikler">
        <EventList events={filtered} emptyText="Aramanıza uygun etkinlik bulunamadı." />
      </section>
    </>
  );
}