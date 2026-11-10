import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: { email?: string; password?: string } = {};

    if (!email.includes("@")) {
      found.email = "Geçerli bir e-posta girin.";
    }
    if (password.length < 6) {
      found.password = "Şifre en az 6 karakter olmalı.";
    }

    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <section aria-labelledby="giris-baslik">
      <h2 id="giris-baslik" className="bolum-baslik">Giriş Yap</h2>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <p className="alan">
          <label htmlFor="login-email">E-posta</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined}
          />
          {errors.email && <span className="hata-metni" role="alert">{errors.email}</span>}
        </p>

        <p className="alan">
          <label htmlFor="login-password">Şifre</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={errors.password ? true : undefined}
          />
          {errors.password && <span className="hata-metni" role="alert">{errors.password}</span>}
        </p>

        <div className="form-butonlar">
          <button className="buton" type="submit">
            Giriş yap
          </button>
        </div>
      </form>

      {sent && (
        <div className="mesaj mesaj-basari" role="status">
          <p>Gerçek giriş Sprint 10'da</p>
        </div>
      )}

      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
       <Link to="/forgot-password">Şifremi unuttum</Link>
        <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
      </div>
    </section>
  );
}