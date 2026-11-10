import { useState, type ChangeEvent, type FormEvent } from "react";
import type { CampusEvent, Category, EventFormData } from "../../types/campus-event";

import { validateEvent, type EventFormErrors } from "../../utils/validate-event";

interface EventFormProps {
  page: "add" | "update";
  selected?: CampusEvent;
  categories: Category[];
  onSubmit: (event: Omit<CampusEvent, "id">) => void;
  onCancel: () => void;
}

export default function EventForm({
  page,
  selected,
  categories,
  onSubmit,
  onCancel,
}: EventFormProps) {
  const [data, setData] = useState<EventFormData>({
    title: selected?.title ?? "",
    category: selected?.category ?? "",
    date: selected?.date ?? "",
    time: selected?.time ?? "",
    location: selected?.location ?? "",
    capacity: selected?.capacity ? String(selected.capacity) : "30",
    description: selected?.description ?? "",
    image: selected?.image,
  });

  const [errors, setErrors] = useState<EventFormErrors>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);

    if (Object.keys(found).length === 0) {
      onSubmit({
        title: data.title.trim(),
        category: data.category as Category,
        date: data.date,
        time: data.time,
        location: data.location.trim(),
        capacity: Number(data.capacity),
        description: data.description.trim(),
        image: data.image,
      });
    }
  }

  return (
    <section aria-labelledby="form-baslik">
      <h2 id="form-baslik">{page === "add" ? "Yeni etkinlik ekle" : "Etkinliği güncelle"}</h2>
      <p className="bilgi">Yıldızlı alanlar zorunludur. Kontenjan 1–1000 arasında olmalıdır.</p>
      
      <form className="form" onSubmit={handleSubmit} noValidate>
        <p className="alan">
          <label htmlFor="event-title">Etkinlik adı *</label>
          <input
            id="event-title"
            name="title"
            value={data.title}
            onChange={handleChange}
            aria-invalid={errors.title ? true : undefined}
          />
          {errors.title && <span className="hata-metni" role="alert">{errors.title}</span>}
        </p>

        <p className="alan">
          <label htmlFor="event-category">Kategori *</label>
          <select
            id="event-category"
            name="category"
            value={data.category}
            onChange={handleChange}
            aria-invalid={errors.category ? true : undefined}
          >
            <option value="" disabled>Kategori seçin</option>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          {errors.category && <span className="hata-metni" role="alert">{errors.category}</span>}
        </p>

        <p className="alan">
          <label htmlFor="event-date">Tarih *</label>
          <input
            id="event-date"
            name="date"
            type="date"
            value={data.date}
            onChange={handleChange}
            aria-invalid={errors.date ? true : undefined}
          />
          {errors.date && <span className="hata-metni" role="alert">{errors.date}</span>}
        </p>

        <p className="alan">
          <label htmlFor="event-time">Saat *</label>
          <input
            id="event-time"
            name="time"
            type="time"
            value={data.time}
            onChange={handleChange}
            aria-invalid={errors.time ? true : undefined}
          />
          {errors.time && <span className="hata-metni" role="alert">{errors.time}</span>}
        </p>

        <p className="alan">
          <label htmlFor="event-location">Yer *</label>
          <input
            id="event-location"
            name="location"
            value={data.location}
            onChange={handleChange}
            aria-invalid={errors.location ? true : undefined}
          />
          {errors.location && <span className="hata-metni" role="alert">{errors.location}</span>}
        </p>

        <p className="alan">
          <label htmlFor="event-capacity">Kontenjan *</label>
          <input
            id="event-capacity"
            name="capacity"
            type="number"
            min="1"
            max="1000"
            step="1"
            value={data.capacity}
            onChange={handleChange}
            aria-invalid={errors.capacity ? true : undefined}
          />
          {errors.capacity && <span className="hata-metni" role="alert">{errors.capacity}</span>}
        </p>

        <p className="alan">
          <label htmlFor="event-description">Açıklama *</label>
          <textarea
            id="event-description"
            name="description"
            rows={4}
            value={data.description}
            onChange={handleChange}
            aria-invalid={errors.description ? true : undefined}
          />
          {errors.description && <span className="hata-metni" role="alert">{errors.description}</span>}
        </p>

        <div className="form-butonlar">
          <button className="buton" type="submit">
            {page === "add" ? "Etkinliği ekle" : "Değişiklikleri kaydet"}
          </button>
          <button className="buton buton-ikincil" type="button" onClick={onCancel}>
            İptal
          </button>
        </div>
      </form>
    </section>
  );
}