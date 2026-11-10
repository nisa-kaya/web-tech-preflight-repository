import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { formatDate } from "../utils/format-date";

export default function AdminPage() {
  const { events, deleteEvent } = useEvents();

  function handleDelete(id: string, title: string) {
    if (window.confirm(`"${title}" silinsin mi?`)) {
      deleteEvent(id);
    }
  }

  return (
    <section aria-labelledby="admin-baslik">
      <div className="admin-baslik-alan">
        <h2 id="admin-baslik" className="bolum-baslik">Etkinlik Yönetimi</h2>
        <Link to="/admin/new" className="buton">
          + Yeni etkinlik
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="sonuc">Henüz etkinlik yok.</p>
      ) : (
        <table className="tablo">
          <thead>
            <tr>
              <th>Etkinlik</th>
              <th>Tarih</th>
              <th>Kategori</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td data-baslik="Etkinlik">{event.title}</td>
                <td data-baslik="Tarih">
                  <time dateTime={`${event.date}T${event.time}`}>
                    {formatDate(event.date)}
                  </time>
                </td>
                <td data-baslik="Kategori">{event.category}</td>
                <td data-baslik="İşlemler" className="islemler">
                  <Link to={`/admin/${event.id}/edit`} className="buton">
                    Düzenle
                  </Link>
                  <button
                    type="button"
                    className="buton buton-sil"
                    onClick={() => handleDelete(event.id, event.title)}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}