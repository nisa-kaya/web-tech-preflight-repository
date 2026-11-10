import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
}

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: RegisterErrors = {};

    if (name.trim().length < 3) {
      found.name = "Ad soyad en az 3 karakter olmalı.";
    }
    if (!email.includes("@")) {
      found.email = "Geçerli bir e-posta girin.";
    }
    if (password.length < 6) {
      found.password = "Şifre en az 6 karakter olmalı.";
    }
    if (password2 !== password) {
      found.password2 = "Şifreler aynı değil.";
    }

    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <section aria-labelledby="kayit-baslik">
      <h2 id="kayit-baslik" className="bolum-baslik">Kayıt Ol</h2>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <p className="alan">
          <label htmlFor="register-name">Ad Soyad</label>
          <input
            id="register-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={errors.name ? true : undefined}
          />
          {errors.name && <span className="hata-metni" role="alert">{errors.name}</span>}
        </p>

        <p className="alan">
          <label htmlFor="register-email">E-posta</label>
          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined}
          />
          {errors.email && <span className="hata-metni" role="alert">{errors.email}</span>}
        </p>

        <p className="alan">
          <label htmlFor="register-password">Şifre</label>
          <input
            id="register-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={errors.password ? true : undefined}
          />
          {errors.password && <span className="hata-metni" role="alert">{errors.password}</span>}
        </p>

        <p className="alan">
          <label htmlFor="register-password2">Şifre (tekrar)</label>
          <input
            id="register-password2"
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            aria-invalid={errors.password2 ? true : undefined}
          />
          {errors.password2 && <span className="hata-metni" role="alert">{errors.password2}</span>}
        </p>

        <div className="form-butonlar">
          <button className="buton" type="submit">
            Kayıt ol
          </button>
        </div>
      </form>

      {sent && (
        <div className="mesaj mesaj-basari" role="status">
          <p>Kayıt olma simülasyonu başarılı (Sprint 10'da gerçek olacak).</p>
        </div>
      )}

      <div style={{ marginTop: "1rem" }}>
        <Link to="/login">Zaten hesabın var mı? Giriş yap</Link>
      </div>
    </section>
  );
}