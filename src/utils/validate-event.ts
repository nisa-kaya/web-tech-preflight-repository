import type { EventFormData } from "../types/campus-event";

export interface EventFormErrors {
  title?: string;
  category?: string;
  date?: string;
  time?: string;
  location?: string;
  capacity?: string;
  description?: string;
}

export function validateEvent(data: EventFormData): EventFormErrors {
  const errors: EventFormErrors = {};

  if (data.title.trim().length < 3) {
    errors.title = "En az 3 karakter olmalı.";
  }

  if (data.category === "") {
    errors.category = "Bir kategori seçin.";
  }

  if (!data.date) {
    errors.date = "Tarih seçilmelidir.";
  }

  if (!data.time) {
    errors.time = "Saat seçilmelidir.";
  }

  if (!data.location.trim()) {
    errors.location = "Yer bilgisi boş olamaz.";
  }

  const capacity = Number(data.capacity);
  if (!Number.isInteger(capacity) || capacity < 1 || capacity > 1000) {
    errors.capacity = "1 ile 1000 arası tam sayı olmalı.";
  }

  if (data.description.trim().length < 10) {
    errors.description = "Açıklama en az 10 karakter olmalı.";
  }

  return errors;
}