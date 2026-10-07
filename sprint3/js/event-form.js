const form = document.querySelector("#etkinlik-formu");
const formMesaj = document.querySelector("#form-mesaj");


const adInput = document.querySelector("#ad");
const adHata = document.querySelector("#ad-hata");

const kategoriSelect = document.querySelector("#kategori");
const kategoriHata = document.querySelector("#kategori-hata");

const tarihInput = document.querySelector("#tarih");
const tarihHata = document.querySelector("#tarih-hata");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const data = {
      title: fd.get("ad") ? fd.get("ad").trim() : "",
      date: fd.get("tarih"),
      category: fd.get("kategori"),
      description: fd.get("aciklama") ? fd.get("aciklama").trim() : ""
    };

   
    const errors = {};

    
    adHata.textContent = "";
    adInput.removeAttribute("aria-invalid");

    kategoriHata.textContent = "";
    kategoriSelect.removeAttribute("aria-invalid");

    tarihHata.textContent = "";
    tarihInput.removeAttribute("aria-invalid");

    
    if (data.title.length < 3) {
      errors.ad = "En az 3 karakter olmalı.";
      adHata.textContent = errors.ad;
      adInput.setAttribute("aria-invalid", "true"); 
    }

    if (!data.category) {
      errors.kategori = "Kategori seçilmelidir.";
      kategoriHata.textContent = errors.kategori;
      kategoriSelect.setAttribute("aria-invalid", "true");
    }

    if (!data.date) {
      errors.tarih = "Tarih seçilmelidir.";
      tarihHata.textContent = errors.tarih;
      tarihInput.setAttribute("aria-invalid", "true");
    }

    
    if (Object.keys(errors).length > 0) {
      formMesaj.innerHTML = `
        <div style="background: #f8d7da; color: #721c24; padding: 1rem; border-radius: 8px; border: 1px solid #f5c6cb;">
          Formda hatalı alanlar var.
        </div>
      `;
      return;
    }

   
    formMesaj.innerHTML = `
      <div style="background: #d4edda; color: #056222; padding: 1rem; border-radius: 8px; border: 1px solid #c3e6cb;">
        <p><strong>Başarılı! Kaydedilen Veri:</strong></p>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      </div>
    `;

    console.log(data);
  });
}

