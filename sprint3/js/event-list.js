import { events } from "./data.js";

function createCard(event) {
  const formatliTarih = new Date(event.date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return `
    <article class="kart">
      <h3>${event.title}</h3>
      <p><strong>Kategori:</strong> ${event.category}</p>
      <p><strong>Tarih:</strong> ${formatliTarih}</p>
      <p><strong>Yer:</strong> ${event.location}</p>
      <p><strong>Kontenjan:</strong> ${event.quota || "100"} kişi</p>
      <p>${event.description}</p>
      <a href="etkinlik-detay.html?id=${event.id}">Detayları gör</a>
    </article>
  `;
}

const list = document.querySelector("#etkinlik-listesi");
const aramaInput = document.querySelector("#arama");
const kategoriSelect = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");
const filtreFormu = document.querySelector("#filtre-formu");

function render(dizi) {
  if (dizi.length === 0) {
    list.innerHTML = "<p>Aradığınız kriterlere uygun etkinlik bulunamadı.</p>";
  } else {
    list.innerHTML = dizi.map(createCard).join("");
  }
}


function kategorileriDoldur() {
  if (!kategoriSelect) return;
  const kategoriler = [...new Set(events.map(e => e.category))];
  kategoriler.forEach(kat => {
    const option = document.createElement("option");
    option.value = kat;
    option.textContent = kat;
    kategoriSelect.appendChild(option);
  });
}

function filtrele() {
  const aranan = aramaInput ? aramaInput.value.trim().toLocaleLowerCase("tr-TR") : "";
  const secilenKategori = kategoriSelect ? kategoriSelect.value : "";


  const sonuc = events.filter(e => {
    const metinUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(aranan) || 
                       e.description.toLocaleLowerCase("tr-TR").includes(aranan);
    const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;
    return metinUyuyor && kategoriUyuyor;
  });

  render(sonuc);

  
  if (sonucSatiri) {
    if (sonuc.length === 0) {
      sonucSatiri.textContent = "Hiç etkinlik bulunamadı.";
    } else {
      sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
    }
  }
}

if (list) {
 
  if (list.dataset.limit) {
    const yaklasan = [...events]
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, Number(list.dataset.limit));
    render(yaklasan);
    if (sonucSatiri) sonucSatiri.textContent = `${yaklasan.length} etkinlik listeleniyor.`;
  } 
  
  else {
    kategorileriDoldur();
    render(events);
    if (sonucSatiri) sonucSatiri.textContent = `${events.length} etkinlik listeleniyor.`;

   
    if (aramaInput) aramaInput.addEventListener("input", filtrele);
    if (kategoriSelect) kategoriSelect.addEventListener("change", filtrele);

    
    if (filtreFormu) {
      filtreFormu.addEventListener("submit", (e) => e.preventDefault());
    }
  }
}
