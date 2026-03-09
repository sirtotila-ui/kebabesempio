import { useState } from "react";

const WHATSAPP_LINK = "https://wa.me/393331234567?text=Ciao%2C%20vorrei%20ordinare!";
const TEL_LINK = "tel:+390544123456";

const MENU_TAB1 = [
  { nome: "Kebab Classico", prezzo: "€5.50", desc: "Carne mista marinata, insalata, pomodori, cipolla, salsa yogurt, pane fresco", tag: "bestseller" },
  { nome: "Kebab Piccante", prezzo: "€6.00", desc: "Carne mista marinata, insalata, pomodori, cipolla, salsa piccante, jalapeños", tag: "" },
  { nome: "Kebab XXL", prezzo: "€8.00", desc: "Doppia carne, doppia verdura, tutte le salse, pane maxi", tag: "popular" },
  { nome: "Kebab nel Piatto", prezzo: "€7.50", desc: "Carne marinata servita con riso basmati, insalata mista, hummus, salsa yogurt", tag: "" },
  { nome: "Durum Wrap", prezzo: "€6.50", desc: "Carne marinata in piadina sottile, verdure fresche, salsa a scelta", tag: "nuovo" },
  { nome: "Veggie Kebab", prezzo: "€5.00", desc: "Falafel fatti in casa, hummus, verdure grigliate, salsa tahina, pane fresco", tag: "vegan" },
];

const MENU_TAB2 = [
  { nome: "Piatto Misto Istanbul", prezzo: "€10.00", desc: "Carne kebab, falafel, hummus, riso basmati, insalata, pane, tutte le salse", tag: "premium" },
  { nome: "Lahmacun", prezzo: "€4.50", desc: "Pizza turca sottile con carne macinata speziata, prezzemolo, limone", tag: "" },
  { nome: "Falafel Piatto", prezzo: "€7.00", desc: "6 falafel fatti in casa con hummus, insalata, riso e salsa tahina", tag: "vegan" },
  { nome: "Chicken Burger", prezzo: "€6.00", desc: "Pollo marinato grigliato, insalata, pomodoro, salsa yogurt, pane brioche", tag: "" },
  { nome: "Patatine Loaded", prezzo: "€5.50", desc: "Patatine croccanti con carne kebab, salsa yogurt, salsa piccante, cipolla croccante", tag: "popular" },
  { nome: "Bibite & Ayran", prezzo: "€2.00", desc: "Coca-Cola, Fanta, Sprite, acqua, Ayran fatto in casa", tag: "" },
];

const SPECIALITA = [
  { emoji: "🥩", titolo: "Carne Marinata a Mano", desc: "Ogni giorno mariniamo la carne fresca con le nostre spezie. Zero carne industriale." },
  { emoji: "🫓", titolo: "Pane Fresco", desc: "Il pane lo facciamo noi, caldo, ogni giorno. Mai surgelato, mai riscaldato." },
  { emoji: "🥬", titolo: "Verdure Tagliate al Momento", desc: "Niente buste. Le verdure le tagliamo fresche per ogni ordine." },
  { emoji: "🔥", titolo: "Spiedo a Fiamma", desc: "Cottura allo spiedo verticale a fiamma viva. Il sapore che fa la differenza." },
];

const RECENSIONI = [
  { testo: "Il miglior kebab che abbia mai mangiato in Italia. Si sente che la carne è fresca e marinata bene. Le salse sono fatte in casa, il pane è caldo. Un altro livello rispetto ai soliti kebab.", nome: "Marco R.", piattaforma: "Google", stelle: 5 },
  { testo: "Finalmente un kebab che non è il solito panino triste. Carne saporita, verdure fresche, porzioni generose. Il piatto misto Istanbul è pazzesco. Ci torno ogni settimana.", nome: "Sara L.", piattaforma: "Google", stelle: 5 },
  { testo: "Prezzi onesti per una qualità che non trovi da nessun'altra parte. Il durum wrap è diventato la mia ossessione. Ragazzi gentilissimi e veloci. Consigliatissimo.", nome: "Andrea B.", piattaforma: "TripAdvisor", stelle: 5 },
];

const FAQ = [
  { q: "La carne è fresca?", a: "Sì. Mariniamo la carne ogni mattina con le nostre spezie. Non usiamo carne industriale o preconfezionata." },
  { q: "Fate delivery?", a: "Sì. Delivery gratuita in zona sopra €15. Ordina su WhatsApp o chiama." },
  { q: "Avete opzioni vegetariane?", a: "Sì. Il Veggie Kebab con falafel fatti in casa e il Falafel Piatto. Tutto preparato fresco." },
  { q: "Quanto ci vuole per un ordine?", a: "Asporto pronto in 15 minuti. Delivery dipende dalla distanza ma di solito 20-30 minuti." },
  { q: "Come funziona lo sconto del 10%?", a: "Ordina su WhatsApp e scrivi PRIMO10 nel messaggio. Ti togliamo il 10% dal totale. Vale solo sul primo ordine." },
];

const TAG_COLORS = {
  bestseller: { bg: "#DC2626", color: "#fff" },
  nuovo: { bg: "#F59E0B", color: "#000" },
  vegan: { bg: "#22C55E", color: "#000" },
  popular: { bg: "#DC2626", color: "#fff" },
  premium: { bg: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.4)" },
};

function Tag({ tag }) {
  if (!tag) return null;
  const s = TAG_COLORS[tag] || {};
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "10px",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        padding: "2px 8px",
        borderRadius: "4px",
        background: s.bg,
        color: s.color,
        border: s.border || "none",
        marginLeft: "8px",
        verticalAlign: "middle",
      }}
    >
      {tag}
    </span>
  );
}

function MenuItem({ item }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "20px 0",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ flex: 1, paddingRight: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "16px" }}>{item.nome}</span>
          <Tag tag={item.tag} />
        </div>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", margin: "6px 0 0", lineHeight: 1.5 }}>
          {item.desc}
        </p>
      </div>
      <span style={{ color: "#DC2626", fontWeight: 700, fontSize: "16px", whiteSpace: "nowrap" }}>
        {item.prezzo}
      </span>
    </div>
  );
}

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#fff",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "16px",
          fontWeight: 700,
          textAlign: "left",
        }}
      >
        <span>{faq.q}</span>
        <span
          style={{
            color: "#DC2626",
            fontSize: "22px",
            fontWeight: 400,
            transition: "transform 0.3s ease",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            flexShrink: 0,
            marginLeft: "16px",
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? "200px" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "15px",
            lineHeight: 1.6,
            margin: 0,
            paddingBottom: "20px",
          }}
        >
          {faq.a}
        </p>
      </div>
    </div>
  );
}

function Stars({ count }) {
  return (
    <span style={{ color: "#F59E0B", fontSize: "14px", letterSpacing: "2px" }}>
      {"★".repeat(count)}
    </span>
  );
}

function Placeholder({ text, height = "320px" }) {
  return (
    <div
      style={{
        background: "#1A1A1A",
        border: "1px solid rgba(220,38,38,0.15)",
        borderRadius: "12px",
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        textAlign: "center",
        color: "rgba(255,255,255,0.3)",
        fontSize: "14px",
        lineHeight: 1.5,
      }}
    >
      {text}
    </div>
  );
}

export default function App() {
  const [menuTab, setMenuTab] = useState(0);

  const sectionPadding = { padding: "80px 16px", maxWidth: "1100px", margin: "0 auto" };
  const headingStyle = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    textTransform: "uppercase",
    color: "#fff",
    margin: 0,
  };

  return (
    <div
      style={{
        background: "#0A0A0A",
        color: "rgba(255,255,255,0.6)",
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: 1.6,
        minHeight: "100vh",
        scrollBehavior: "smooth",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #0A0A0A; -webkit-font-smoothing: antialiased; }
        a { text-decoration: none; }
      `}</style>

      {/* ─── NAVBAR ─── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 900,
          background: "rgba(10,10,10,0.8)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(220,38,38,0.3)",
          padding: "0 16px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "64px",
          }}
        >
          <a href="#hero" style={{ color: "#fff", fontWeight: 700, fontSize: "18px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Istanbul Grill
          </a>
          <div style={{ display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
            {[
              { label: "Chi Siamo", href: "#chi-siamo" },
              { label: "Menù", href: "#menu" },
              { label: "Recensioni", href: "#recensioni" },
              { label: "Ordina", href: "#ordina" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "14px",
                  fontWeight: 500,
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#DC2626",
                color: "#fff",
                fontWeight: 700,
                fontSize: "13px",
                padding: "8px 16px",
                borderRadius: "8px",
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Ordina
            </a>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section id="hero" style={{ background: "#0A0A0A" }}>
        <div
          style={{
            ...sectionPadding,
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
            alignItems: "center",
            paddingTop: "64px",
            paddingBottom: "64px",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-block",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "24px",
              }}
            >
              🔥 KEBAB ARTIGIANALE · RAVENNA
            </span>

            <h1
              style={{
                ...headingStyle,
                fontSize: "clamp(40px, 8vw, 72px)",
                lineHeight: 1.05,
                marginBottom: "24px",
              }}
            >
              Non il Solito
              <br />
              <span style={{ color: "#DC2626" }}>Kebab.</span>
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "clamp(16px, 2.5vw, 18px)",
                lineHeight: 1.6,
                maxWidth: "520px",
                marginBottom: "32px",
              }}
            >
              Carne marinata a mano. Pane fresco ogni giorno. Verdure tagliate al momento. Zero scorciatoie.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "48px" }}>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#DC2626",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "14px 28px",
                  borderRadius: "8px",
                  minHeight: "48px",
                  border: "none",
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Ordina su WhatsApp
              </a>
              <a
                href="#menu"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "14px 28px",
                  borderRadius: "8px",
                  minHeight: "48px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  transition: "border-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
              >
                Guarda il Menù
              </a>
            </div>

            <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
              {[
                { numero: "4.8", label: "Google" },
                { numero: "100%", label: "Artigianale" },
                { numero: "2019", label: "Dal" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(24px, 4vw, 32px)" }}>
                    {stat.numero}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img
              src="/images/hero-kebab.png"
              alt="Kebab artigianale Istanbul Grill"
              style={{
                width: "100%",
                maxWidth: "480px",
                height: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))",
              }}
            />
          </div>
        </div>
      </section>

      {/* ─── CHI SIAMO ─── */}
      <section id="chi-siamo" style={{ background: "#141414" }}>
        <div
          style={{
            ...sectionPadding,
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
            alignItems: "center",
          }}
        >
          <Placeholder text="Foto dello spiedo di carne con spezie e fiamme" height="360px" />
          <div>
            <span
              style={{
                display: "inline-block",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#DC2626",
                marginBottom: "16px",
                textTransform: "uppercase",
              }}
            >
              CHI SIAMO
            </span>

            <h2
              style={{
                ...headingStyle,
                fontSize: "clamp(32px, 6vw, 48px)",
                lineHeight: 1.1,
                marginBottom: "24px",
              }}
            >
              Kebab Vero.
              <br />
              <span style={{ color: "#DC2626" }}>Niente Compromessi.</span>
            </h2>

            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", lineHeight: 1.7, maxWidth: "560px" }}>
              Siamo partiti nel 2019 con un'ossessione: fare il kebab come va fatto. La carne la mariniamo noi ogni mattina con le nostre spezie. Il pane lo facciamo fresco, non lo scaldiamo dal surgelato. Le verdure le tagliamo al momento, non le tiriamo fuori da una busta.
              <br /><br />
              Ogni kebab che esce dal nostro locale è fatto a mano, dall'inizio alla fine. Se vuoi il solito kebab industriale, non siamo il posto giusto. Se vuoi quello vero, sei a casa.
            </p>
          </div>
        </div>
      </section>

      {/* ─── MENÙ ─── */}
      <section id="menu" style={{ background: "#0A0A0A" }}>
        <div style={sectionPadding}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2
              style={{
                ...headingStyle,
                fontSize: "clamp(32px, 6vw, 48px)",
              }}
            >
              Il Menù
            </h2>
          </div>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "40px",
            }}
          >
            {["Kebab", "Piatti & Panini"].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setMenuTab(i)}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  padding: "10px 24px",
                  borderRadius: "8px",
                  border: "1px solid",
                  borderColor: menuTab === i ? "#DC2626" : "rgba(255,255,255,0.1)",
                  background: menuTab === i ? "#DC2626" : "transparent",
                  color: "#fff",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Items */}
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            {(menuTab === 0 ? MENU_TAB1 : MENU_TAB2).map((item) => (
              <MenuItem key={item.nome} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── PERCHÉ NOI ─── */}
      <section id="perche-noi" style={{ background: "#141414" }}>
        <div style={sectionPadding}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2
              style={{
                ...headingStyle,
                fontSize: "clamp(32px, 6vw, 48px)",
              }}
            >
              Perché Istanbul Grill
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            {SPECIALITA.map((s) => (
              <div
                key={s.titolo}
                style={{
                  background: "#0A0A0A",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "12px",
                  padding: "32px 24px",
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "16px" }}>{s.emoji}</div>
                <h3 style={{ ...headingStyle, fontSize: "18px", marginBottom: "12px" }}>{s.titolo}</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RECENSIONI ─── */}
      <section id="recensioni" style={{ background: "#0A0A0A" }}>
        <div style={sectionPadding}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2
              style={{
                ...headingStyle,
                fontSize: "clamp(32px, 6vw, 48px)",
              }}
            >
              Cosa Dicono di Noi
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {RECENSIONI.map((r) => (
              <div
                key={r.nome}
                style={{
                  background: "#141414",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderLeft: "3px solid #DC2626",
                  borderRadius: "12px",
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Stars count={r.stelle} />
                  <p
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "14px",
                      lineHeight: 1.7,
                      marginTop: "12px",
                      marginBottom: "20px",
                    }}
                  >
                    "{r.testo}"
                  </p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>{r.nome}</span>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>{r.piattaforma}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ORDINA ─── */}
      <section id="ordina" style={{ background: "#141414" }}>
        <div style={{ ...sectionPadding, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              background: "#141414",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "12px",
              padding: "clamp(32px, 5vw, 48px)",
              maxWidth: "600px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <span
              style={{
                display: "inline-block",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "16px",
              }}
            >
              🛵 ORDINA
            </span>

            <h2 style={{ ...headingStyle, fontSize: "clamp(28px, 5vw, 40px)", marginBottom: "16px" }}>
              Pronto in 15 Minuti
            </h2>

            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", marginBottom: "32px" }}>
              Ordina su WhatsApp o chiama. Asporto e delivery in zona.
            </p>

            <div style={{ textAlign: "left", marginBottom: "32px" }}>
              {[
                "Ordina via WhatsApp o telefono",
                "Pronto in 15 minuti",
                "Delivery in zona gratuita sopra €15",
                "Packaging 100% riciclabile",
              ].map((f) => (
                <div
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "12px",
                    fontSize: "15px",
                  }}
                >
                  <span style={{ color: "#DC2626", fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>

            {/* Offerta */}
            <div
              style={{
                background: "#DC2626",
                color: "#fff",
                fontWeight: 700,
                borderRadius: "8px",
                padding: "8px 16px",
                display: "inline-block",
                fontSize: "14px",
                marginBottom: "24px",
              }}
            >
              -10% sul primo ordine online. Scrivi PRIMO10 su WhatsApp.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#DC2626",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "14px 28px",
                  borderRadius: "8px",
                  minHeight: "48px",
                  border: "none",
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Ordina su WhatsApp →
              </a>
              <a
                href={TEL_LINK}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "14px 28px",
                  borderRadius: "8px",
                  minHeight: "48px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  transition: "border-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
              >
                Chiama Ora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" style={{ background: "#0A0A0A" }}>
        <div style={{ ...sectionPadding, maxWidth: "700px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ ...headingStyle, fontSize: "clamp(32px, 6vw, 48px)" }}>
              Domande Frequenti
            </h2>
          </div>
          {FAQ.map((faq) => (
            <FaqItem key={faq.q} faq={faq} />
          ))}
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          style={{
            ...sectionPadding,
            paddingTop: "48px",
            paddingBottom: "48px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
          }}
        >
          {/* Col 1 */}
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "18px", textTransform: "uppercase", marginBottom: "12px" }}>
              Istanbul Grill
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: 1.6 }}>
              Kebab Artigianale. Fatto Come Si Deve.
            </p>
          </div>

          {/* Col 2 - Contatti */}
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", marginBottom: "12px" }}>
              Contatti
            </div>
            <p style={{ fontSize: "14px", lineHeight: 1.8 }}>
              Via Roma 45, Ravenna
              <br />
              <a href={TEL_LINK} style={{ color: "rgba(255,255,255,0.6)" }}>0544 123456</a>
              <br />
              <a href="mailto:info@istanbulgrill.it" style={{ color: "rgba(255,255,255,0.6)" }}>info@istanbulgrill.it</a>
            </p>
          </div>

          {/* Col 3 - Orari */}
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", marginBottom: "12px" }}>
              Orari
            </div>
            <p style={{ fontSize: "14px", lineHeight: 1.8 }}>
              Lun-Dom
              <br />
              11:30-14:30
              <br />
              18:00-23:00
            </p>
          </div>

          {/* Col 4 - Social */}
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", marginBottom: "12px" }}>
              Seguici
            </div>
            <a
              href="https://instagram.com/istanbulgrill"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", transition: "color 0.3s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Credits */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "20px 16px",
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.15)" }}>
            Sito realizzato da{" "}
            <a
              href="https://ecfmedia.it"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.15)" }}
            >
              ECF Media
            </a>
          </span>
        </div>
      </footer>

      {/* ─── WHATSAPP FISSO ─── */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ordina su WhatsApp"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 1000,
          background: "#25D366",
          borderRadius: "50%",
          width: "56px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          fontSize: "24px",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        💬
      </a>
    </div>
  );
}
