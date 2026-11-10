import { useState,  type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const found = email.includes("@") ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  }

  return (
    <section aria-labelledby="sifre-unuttum-baslik">
      <h2 id="sifre-unuttum-baslik" className="bolum-baslik">Şifremi Unuttum</h2>
      <p className="bilgi">Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <p className="alan">
          <label htmlFor="forgot-email">E-posta</label>
          <input
            id="forgot-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={error ? true : undefined}
          />
          {error && <span className="hata-metni" role="alert">{error}</span>}
        </p>

        <div className="form-butonlar">
          <button className="buton" type="submit">
            Bağlantı gönder
          </button>
        </div>
      </form>

      {sent && (
        <div className="mesaj mesaj-basari" role="status">
          <p>Bağlantı {email} adresine gönderildi (demo).</p>
        </div>
      )}

      <div style={{ marginTop: "1rem" }}>
        <Link to="/login">← Girişe dön</Link>
      </div>
    </section>
  );
}