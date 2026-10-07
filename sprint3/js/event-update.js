import { events } from "./data.js";

const mainElement = document.querySelector("#guncelle-main");
const form = document.querySelector("#etkinlik-formu");

// Adres çubuğundaki id'yi oku
const id = new URLSearchParams(location.search).get("id");
// Etkinliği bul
const event = events.find(e => e.id === id);

if (!event) {
  // ID yoksa veya bulunamazsa form gizlenir, uyarı kutusu gösterilir
  if (form) form.style.display = "none";

  const uyariDiv = document.createElement("div");
  uyariDiv.style.cssText = "background: #f8d7da; color: #721c24; padding: 1.5rem; border-radius: 8px; border: 1px solid #f5c6cb; margin-top: 1rem;";
  uyariDiv.innerHTML = `
    <p><strong>Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</strong></p>
    <a href="etkinlikler.html" class="btn" style="display: inline-block; margin-top: 1rem;">Etkinliklere git</a>
  `;
  if (mainElement) mainElement.appendChild(uyariDiv);
} else {
  // Bulunduysa form gösterilir ve alanlar doldurulur
  if (form) form.style.display = "flex";

  const adInput = document.querySelector("#ad");
  const kategoriSelect = document.querySelector("#kategori");
  const tarihInput = document.querySelector("#tarih");
  const yerInput = document.querySelector("#yer");
  const kontenjanInput = document.querySelector("#kontenjan");

  if (adInput) adInput.value = event.title || "";
  if (kategoriSelect) kategoriSelect.value = event.category || "";
  if (tarihInput) tarihInput.value = event.date ? event.date.split("T")[0] : "";
  if (yerInput) yerInput.value = event.location || "";
  if (kontenjanInput) kontenjanInput.value = event.quota || "";
}