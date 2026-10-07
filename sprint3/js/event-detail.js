import { events } from "./data.js";


const container = document.querySelector("#detay");

if (container) {

  const id = new URLSearchParams(location.search).get("id");


  const event = events.find((e) => e.id === id);


  if (!event) {
    container.innerHTML = `
      <div class="hata-kutusu" style="background: #f8d7da; color: #721c24; padding: 1.5rem; border-radius: 8px; border: 1px solid #f5c6cb;">
        <h2>Hata: Etkinlik Bulunamadı</h2>
        <p>Aradığınız kriterlere uygun bir etkinlik bulunamadı veya bağlantı geçersiz.</p>
        <a href="etkinlikler.html" class="btn" style="display:inline-block; margin-top:1rem;">Listeye dön</a>
      </div>
    `;
  } 
  
 else {
    document.title = event.title;

    const formatliTarih = new Date(event.date).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    container.innerHTML = `
      <div class="detay-container">
        <div class="detay-sol">
          <img src="${event.image || 'placeholder.jpg'}" alt="${event.title}">
        </div>
        <div class="detay-sag">
          <h2>${event.title}</h2>
          <p class="etkinlik-aciklama">${event.description}</p>
          
          <dl class="kunye-kutusu">
            <dt>Tarih</dt>
            <dd>${formatliTarih}</dd>
            <dt>Konum</dt>
            <dd>${event.location}</dd>
            <dt>Kategori</dt>
            <dd>${event.category}</dd>
          </dl>

          <div style="display: flex; gap: 1rem; margin-top: 1rem;">
            <a href="etkinlikler.html" class="btn">Listeye dön</a>
            <a href="etkinlik-guncelle.html?id=${event.id}" class="btn">Bu etkinliği güncelle</a>
          </div>
        </div>
      </div>
    `;
  }}