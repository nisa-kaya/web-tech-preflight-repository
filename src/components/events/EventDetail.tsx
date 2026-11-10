import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

export default function EventDetail({ event }: EventDetailProps) {
  return (
    <article id="detay" className="detay">
      <div className="detay-ust">
        {event.image && (
          <figure>
            <img src={event.image} alt={`${event.title} afişi`} width="480" height="270" />
            <figcaption>{event.title} afişi</figcaption>
          </figure>
        )}
        <section className="kunye">
          <h2>Etkinlik Künyesi</h2>
          <dl>
            <dt>Tarih</dt><dd><time dateTime={`${event.date}T${event.time}`}>{formatDate(event.date)}, {event.time}</time></dd>
            <dt>Yer</dt><dd>{event.location}</dd>
            <dt>Kategori</dt><dd>{event.category}</dd>
            <dt>Kontenjan</dt><dd>{event.capacity} kişi</dd>
          </dl>
        </section>
      </div>
      <h2>Açıklama</h2>
      <p>{event.description || "Bu etkinlik için açıklama eklenmemiş."}</p>
      <div className="form-butonlar">
        <Link to="/events" className="buton buton-ikincil">← Listeye dön</Link>
        <Link to={`/admin/${event.id}/edit`} className="buton">Bu etkinliği güncelle</Link>
      </div>
    </article>
  );
}