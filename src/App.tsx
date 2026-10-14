import { useState, useEffect } from "react";
import { events } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import type { Category, CampusEvent } from "./types/campus-event";
import "./App.css";

type PageName = "home" | "events" | "detail" | "add" | "update";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);

  const selected = selectedId ? findEventById(events, selectedId) : undefined;
  const currentTitle = selected ? selected.title : "Kampüs Etkinlikleri";

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${currentTitle}`;
  }, [currentTitle]);

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    setFormErrors({});
    setFormSuccessMessage(null);
    window.scrollTo(0, 0);
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h2>{event.title}</h2>
        <p className="kart-kategori">{event.category}</p>
        <p>
          Tarih:{" "}
          <time dateTime={`${event.date}T${event.time}`}>
            {formatDate(event.date)}, {event.time}
          </time>
        </p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <p>
          <button
            type="button"
            className="kart-link"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer", font: "inherit", color: "inherit" }}
            onClick={() => go("detail", event.id)}
          >
            Detayları gör
          </button>
        </p>
      </article>
    );
  }

  function validateForm(data: any) {
    const errors: Record<string, string> = {};
    if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
    if (!data.category) errors.kategori = "Bir kategori seçin.";
    if (!data.date) errors.tarih = "Tarih seçin.";
    if (!data.time) errors.saat = "Saat seçin.";
    if (!data.location) errors.yer = "Yer bilgisini yazın.";
    if (data.capacity !== null && (data.capacity < 1 || data.capacity > 1000)) {
      errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalı.";
    }
    return errors;
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      id: page === "update" && selected ? selected.id : `event-${events.length + 1}`,
      title: (fd.get("ad") as string).trim(),
      category: fd.get("kategori") as string,
      date: fd.get("tarih") as string,
      time: fd.get("saat") as string,
      location: (fd.get("yer") as string).trim(),
      capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : null,
      description: (fd.get("aciklama") as string).trim()
    };

    const errors = validateForm(data);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setFormSuccessMessage("hata");
      return;
    }

    setFormSuccessMessage(JSON.stringify(data, null, 2));
  }

  return (
    <div className="uygulama-wrapper">
      <header className="site-baslik">
        <h1>
          {page === "home" && "Kampüs Etkinlikleri"}
          {page === "events" && "Tüm Etkinlikler"}
          {page === "detail" && (selected ? selected.title : "Etkinlik Detayı")}
          {page === "add" && "Etkinlik Ekle"}
          {page === "update" && "Etkinlik Güncelle"}
        </h1>
        {page === "home" && <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>}
        {page === "events" && <p>Ekim ayında kampüste düzenlenen etkinlikler.</p>}
      </header>

      <nav className="menu">
        <ul>
          <li>
            <button
              type="button"
              style={{ background: "none", border: "none", cursor: "pointer", font: "inherit" }}
              aria-current={page === "home" ? "page" : undefined}
              onClick={() => go("home")}
            >
              Ana Sayfa
            </button>
          </li>
          <li>
            <button
              type="button"
              style={{ background: "none", border: "none", cursor: "pointer", font: "inherit" }}
              aria-current={page === "events" ? "page" : undefined}
              onClick={() => go("events")}
            >
              Etkinlikler
            </button>
          </li>
          <li>
            <button
              type="button"
              style={{ background: "none", border: "none", cursor: "pointer", font: "inherit" }}
              aria-current={page === "add" ? "page" : undefined}
              onClick={() => go("add")}
            >
              Ekle
            </button>
          </li>
        </ul>
      </nav>

      <main>
        {/* ANA SAYFA */}
        {page === "home" && (
          <>
            <h2 className="bolum-baslik">Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlik-listesi" aria-label="Yaklaşan etkinlikler">
              {upcoming.map(renderCard)}
            </section>
            <p>
              <button
                type="button"
                className="buton"
                onClick={() => go("events")}
              >
                Tüm etkinlikleri gör
              </button>
            </p>
          </>
        )}

        {/* ETKİNLİKLER SAYFASI */}
        {page === "events" && (
          <>
            <div className="filtre" role="search" id="filtre-formu">
              <p className="alan">
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="Örn. atölye, kariyer"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </p>
              <p className="alan">
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </p>
            </div>

            <p id="sonuc" className="sonuc" aria-live="polite">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section id="etkinlik-listesi" className="etkinlik-listesi" aria-label="Tüm etkinlikler">
              {filtered.map(renderCard)}
            </section>
          </>
        )}

        {/* DETAY SAYFASI */}
        {page === "detail" && (
          <article id="detay" className="detay">
            {!selected ? (
              <>
                <div className="mesaj mesaj-hata" role="alert">
                  <p>Hangi etkinliği görmek istediğiniz belirtilmemiş veya etkinlik bulunamadı.</p>
                </div>
                <p>
                  <button
                    type="button"
                    className="buton"
                    onClick={() => go("events")}
                  >
                    &larr; Listeye dön
                  </button>
                </p>
              </>
            ) : (
              <>
                <div className="detay-ust">
                  {selected.image && (
                    <figure>
                      <img src={selected.image} alt={`${selected.title} afişi`} width="480" height="270" />
                      <figcaption>{selected.title} afişi</figcaption>
                    </figure>
                  )}
                  <section className="kunye">
                    <h2>Etkinlik Künyesi</h2>
                    <dl>
                      <dt>Tarih</dt>
                      <dd>
                        <time dateTime={`${selected.date}T${selected.time}`}>
                          {formatDate(selected.date)}, {selected.time}
                        </time>
                      </dd>
                      <dt>Yer</dt>
                      <dd>{selected.location}</dd>
                      <dt>Kategori</dt>
                      <dd>{selected.category}</dd>
                      <dt>Kontenjan</dt>
                      <dd>{selected.capacity} kişi</dd>
                    </dl>
                  </section>
                </div>
                <h2>Açıklama</h2>
                <p>{selected.description}</p>
                <p className="form-butonlar">
                  <button
                    type="button"
                    className="buton"
                    onClick={() => go("events")}
                  >
                    &larr; Listeye dön
                  </button>
                  <button
                    type="button"
                    className="buton"
                    style={{ marginLeft: "10px" }}
                    onClick={() => go("update", selected.id)}
                  >
                    Bu etkinliği güncelle
                  </button>
                </p>
              </>
            )}
          </article>
        )}

        {/* EKLE VE GÜNCELLE FORMLARI */}
        {(page === "add" || page === "update") && (
          <>
            {page === "update" && !selected ? (
              <div className="mesaj mesaj-hata" role="alert">
                <p>
                  Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği
                  güncelle" butonunu kullanın.
                </p>
                <p>
                  <button
                    type="button"
                    className="buton"
                    onClick={() => go("events")}
                  >
                    Etkinliklere git
                  </button>
                </p>
              </div>
            ) : (
              <>
                <p className="bilgi">
                  {page === "add"
                    ? "Yıldızlı (*) alanlar zorunludur. Bu sprintte form veri kaydetmez; sonuç aşağıda gösterilir."
                    : "Alanlar mevcut etkinliğin bilgileriyle dolu gelir. Bu sprintte form veri güncellemez."}
                </p>

                <form
                  id="etkinlik-formu"
                  className="form"
                  data-mode={page === "add" ? "ekle" : "guncelle"}
                  onSubmit={handleFormSubmit}
                  noValidate
                >
                  <p className="alan">
                    <label htmlFor="ad">Etkinlik Adı *</label>
                    <input
                      type="text"
                      id="ad"
                      name="ad"
                      maxLength={80}
                      defaultValue={page === "update" && selected ? selected.title : ""}
                      placeholder="Örn. Kariyer Günleri 2026"
                      required
                      aria-invalid={formErrors.ad ? "true" : "false"}
                    />
                    <span id="ar-hata" className="hata-metni">{formErrors.ad}</span>
                  </p>

                  <p className="alan">
                    <label htmlFor="kategori">Kategori *</label>
                    <select
                      id="kategori"
                      name="kategori"
                      defaultValue={page === "update" && selected ? selected.category : ""}
                      required
                      aria-invalid={formErrors.kategori ? "true" : "false"}
                    >
                      <option value="">Seçiniz</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <span id="kategori-hata" className="hata-metni">{formErrors.kategori}</span>
                  </p>

                  <p className="alan">
                    <label htmlFor="tarih">Tarih *</label>
                    <input
                      type="date"
                      id="tarih"
                      name="tarih"
                      defaultValue={page === "update" && selected ? selected.date : ""}
                      required
                      aria-invalid={formErrors.tarih ? "true" : "false"}
                    />
                    <span id="tarih-hata" className="hata-metni">{formErrors.tarih}</span>
                  </p>

                  <p className="alan">
                    <label htmlFor="saat">Saat *</label>
                    <input
                      type="time"
                      id="saat"
                      name="saat"
                      defaultValue={page === "update" && selected ? selected.time : ""}
                      required
                      aria-invalid={formErrors.saat ? "true" : "false"}
                    />
                    <span id="saat-hata" className="hata-metni">{formErrors.saat}</span>
                  </p>

                  <p className="alan">
                    <label htmlFor="yer">Yer *</label>
                    <input
                      type="text"
                      id="yer"
                      name="yer"
                      maxLength={80}
                      defaultValue={page === "update" && selected ? selected.location : ""}
                      placeholder="Örn. A Blok Konferans Salonu"
                      required
                      aria-invalid={formErrors.yer ? "true" : "false"}
                    />
                    <span id="yer-hata" className="hata-metni">{formErrors.yer}</span>
                  </p>

                  <p className="alan">
                    <label htmlFor="kontenjan">Kontenjan</label>
                    <input
                      type="number"
                      id="kontenjan"
                      name="kontenjan"
                      min="1"
                      max="1000"
                      defaultValue={page === "update" && selected ? selected.capacity : ""}
                      aria-invalid={formErrors.kontenjan ? "true" : "false"}
                    />
                    <span id="kontenjan-hata" className="hata-metni">{formErrors.kontenjan}</span>
                  </p>

                  <p className="alan">
                    <label htmlFor="aciklama">Açıklama</label>
                    <textarea
                      id="aciklama"
                      name="aciklama"
                      rows={5}
                      defaultValue={page === "update" && selected ? selected.description : ""}
                    ></textarea>
                  </p>

                  <p className="form-butonlar">
                    <button type="submit" className="buton">
                      {page === "add" ? "Kaydet" : "Güncelle"}
                    </button>
                  </p>
                </form>

                <div id="form-mesaj" aria-live="polite">
                  {formSuccessMessage === "hata" && (
                    <div className="mesaj mesaj-hata">
                      <p>Formda hatalı alanlar var, lütfen düzeltin.</p>
                    </div>
                  )}
                  {formSuccessMessage && formSuccessMessage !== "hata" && (
                    <div className="mesaj mesaj-basari">
                      <p>
                        {page === "update" ? "Etkinlik güncellendi" : "Etkinlik oluşturuldu"} (bu sprintte kaydedilmez):
                      </p>
                      <pre>{formSuccessMessage}</pre>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </main>

      <footer>
        <p>Ad Soyad &middot; 2416501086 &middot; 2026</p>
      </footer>
    </div>
  );
}

export default App;