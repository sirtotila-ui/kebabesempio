import { useState, useEffect, useRef } from "react";

const WHATSAPP_LINK = "https://wa.me/393247724048?text=Ciao%2C%20vorrei%20ordinare!";
const TEL_LINK = "tel:+393247724048";

const MENU_TAB1 = [
  { nome: "Piadina Kebab", prezzo: "da €4.50", desc: "Piadina artigianale fatta al momento con ricca farcitura di kebab, verdure, cipolla e salsa", tag: "bestseller" },
  { nome: "Panino Kebab", prezzo: "da €5.00", desc: "Panino con ricca farcitura di kebab, verdure, cipolla e salsa a scelta", tag: "popular" },
  { nome: "Twin Cheeseburger", prezzo: "da €5.50", desc: "Panino con doppio burger di manzo, doppio formaggio, pomodoro e insalata", tag: "" },
  { nome: "Royal Chicken", prezzo: "da €6.50", desc: "Panino con filetto di pollo impanato, formaggio e una fritta di patate", tag: "" },
  { nome: "Crispy Chicken", prezzo: "da €4.50", desc: "Panino con filetto di pollo croccante, formaggio e insalata, pomodoro", tag: "" },
  { nome: "Doppio Crispy", prezzo: "da €6.50", desc: "Panino con doppio filetto di pollo impanato e insalata", tag: "" },
  { nome: "Chicken Wrap", prezzo: "€5.00", desc: "Piadina con pollo, pomodoro e insalata", tag: "" },
  { nome: "Piadina Falafel", prezzo: "da €4.00", desc: "Piadina con falafel e abbondanti verdure croccanti", tag: "vegan" },
];

const MENU_TAB2 = [
  { nome: "Kebab al Piatto", prezzo: "da €7.00", desc: "Ricca porzione di kebab con carne, verdure e riso. Maxi disponibile", tag: "bestseller" },
  { nome: "Piatto Falafel", prezzo: "da €5.00", desc: "6 pz di falafel con abbondanti verdure e contorno", tag: "vegan" },
  { nome: "Riso Kebab", prezzo: "da €5.00", desc: "Riso saporito con verdure stufate e salse", tag: "" },
  { nome: "Rice Biryani", prezzo: "da €4.50", desc: "Riso con pollo, pomodoro, spezie e insalata", tag: "" },
  { nome: "Seekh Kebab", prezzo: "da €4.00", desc: "Spiedini di carne speziata con verdure, cipolla e salsa", tag: "popular" },
  { nome: "Fritto Misto", prezzo: "da €9.00", desc: "4 alette di pollo, 3 striscette, 4 nuggets, 1 falafel, cheese e patatine", tag: "premium" },
  { nome: "Family Menu", prezzo: "€22.00", desc: "20 alette di pollo + 3 filetti di pollo impanati. Per tutta la famiglia!", tag: "" },
];


const RECENSIONI = [
  { testo: "Locale molto buono gestito da 2 ragazzi molto accoglienti. Il kebab è di qualità e c'è una grande varietà di verdure da scegliere per farcirlo, ma il punto forte è la piadina artigianale fatta sul momento e cotta in un forno a legna. Locale assolutamente da provare se piace il kebab.", nome: "Alessandro Orsini", piattaforma: "Google", stelle: 5 },
  { testo: "Carne kebab davvero ottima! Servizio eccellente e titolare di una gentilezza e disponibilità mai riscontrata! 5 stelle sono davvero poche! SEMPLICEMENTE TOP.", nome: "Luigi Maria Manes", piattaforma: "Google", stelle: 5 },
  { testo: "Kebab super farcito buonissimo. Personale gentile e accogliente. Locale pulito e curato con tavolini interni ed esterni. Il menù offre vasta scelta e i prezzi sono molto economici.", nome: "Silvia Grifoni", piattaforma: "Google", stelle: 5 },
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

/* ─── Scroll-reveal hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView(0.12);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

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

function MenuItem({ item, index }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "20px 0",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: `opacity 0.5s ease ${index * 0.06}s, transform 0.5s ease ${index * 0.06}s`,
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
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
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
          transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
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

const NAV_LINKS = [
  { label: "Chi Siamo", href: "#chi-siamo" },
  { label: "Menù", href: "#menu" },
  { label: "Recensioni", href: "#recensioni" },
  { label: "Ordina", href: "#ordina" },
];

export default function App() {
  const [menuTab, setMenuTab] = useState(0);
  const [tabFade, setTabFade] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);

  const handleTabSwitch = (i) => {
    if (i === menuTab) return;
    setTabFade(false);
    setTimeout(() => {
      setMenuTab(i);
      setTabFade(true);
    }, 150);
  };

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
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #0A0A0A; -webkit-font-smoothing: antialiased; }
        a { text-decoration: none; }

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroImgFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes waPulse {
          0%   { box-shadow: 0 4px 12px rgba(0,0,0,0.3), 0 0 0 0 rgba(37,211,102,0.5); }
          70%  { box-shadow: 0 4px 12px rgba(0,0,0,0.3), 0 0 0 14px rgba(37,211,102,0); }
          100% { box-shadow: 0 4px 12px rgba(0,0,0,0.3), 0 0 0 0 rgba(37,211,102,0); }
        }
        @keyframes badgeGlow {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.7; }
        }

        .card-lift {
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease;
        }
        .card-lift:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.3);
        }
        .review-card {
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease;
        }
        .review-card:hover {
          transform: translateY(-4px);
          border-color: rgba(220,38,38,0.3);
        }
        .nav-link { transition: color 0.3s ease; }
        .nav-link:hover { color: #fff !important; }
        .cta-primary { transition: opacity 0.3s ease, transform 0.3s ease; }
        .cta-primary:hover { opacity: 0.9; transform: translateY(-1px); }
        .cta-secondary { transition: border-color 0.3s ease, transform 0.3s ease; }
        .cta-secondary:hover { border-color: rgba(255,255,255,0.5) !important; transform: translateY(-1px); }

        .nav-desktop { display: flex; }
        .nav-burger { display: none; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-burger { display: flex !important; }
        }
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
            Al-Turk Kebab & Pizzeria
          </a>

          {/* Desktop links */}
          <div className="nav-desktop" style={{ gap: "24px", alignItems: "center" }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: 500 }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary"
              style={{
                background: "#DC2626",
                color: "#fff",
                fontWeight: 700,
                fontSize: "13px",
                padding: "8px 16px",
                borderRadius: "8px",
              }}
            >
              Ordina
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-burger"
            onClick={() => setMobileNav(!mobileNav)}
            aria-label="Menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              width: "40px",
              height: "40px",
            }}
          >
            <span style={{
              display: "block", width: "22px", height: "2px", background: "#fff", borderRadius: "2px",
              transition: "transform 0.3s ease, opacity 0.3s ease",
              transform: mobileNav ? "translateY(7px) rotate(45deg)" : "none",
            }} />
            <span style={{
              display: "block", width: "22px", height: "2px", background: "#fff", borderRadius: "2px",
              transition: "opacity 0.3s ease",
              opacity: mobileNav ? 0 : 1,
            }} />
            <span style={{
              display: "block", width: "22px", height: "2px", background: "#fff", borderRadius: "2px",
              transition: "transform 0.3s ease, opacity 0.3s ease",
              transform: mobileNav ? "translateY(-7px) rotate(-45deg)" : "none",
            }} />
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          style={{
            maxHeight: mobileNav ? "400px" : "0",
            overflow: "hidden",
            transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              paddingBottom: mobileNav ? "20px" : "0",
              transition: "padding 0.3s ease",
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileNav(false)}
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "16px",
                  fontWeight: 600,
                  padding: "14px 16px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.04)",
                  transition: "background 0.2s ease, color 0.2s ease",
                  opacity: mobileNav ? 1 : 0,
                  transform: mobileNav ? "translateY(0)" : "translateY(-8px)",
                  transitionDelay: mobileNav ? `${i * 0.05}s` : "0s",
                  transitionProperty: "opacity, transform, background, color",
                  transitionDuration: "0.3s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileNav(false)}
              style={{
                display: "block",
                textAlign: "center",
                background: "#DC2626",
                color: "#fff",
                fontWeight: 700,
                fontSize: "15px",
                padding: "14px 16px",
                borderRadius: "8px",
                marginTop: "8px",
                minHeight: "48px",
                lineHeight: "20px",
                opacity: mobileNav ? 1 : 0,
                transform: mobileNav ? "translateY(0)" : "translateY(-8px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                transitionDelay: mobileNav ? `${NAV_LINKS.length * 0.05}s` : "0s",
              }}
            >
              Ordina su WhatsApp
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
                animation: "heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both",
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
                animation: "heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both",
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
                animation: "heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s both",
              }}
            >
              Carne marinata a mano. Pane fresco ogni giorno. Verdure tagliate al momento. Zero scorciatoie.
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "48px",
                animation: "heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s both",
              }}
            >
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary"
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
                }}
              >
                Ordina su WhatsApp
              </a>
              <a
                href="#menu"
                className="cta-secondary"
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
                }}
              >
                Guarda il Menù
              </a>
            </div>

            <div
              style={{
                display: "flex",
                gap: "32px",
                flexWrap: "wrap",
                animation: "heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.7s both",
              }}
            >
              {[
                { numero: "4.4", label: "Google" },
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
          <Reveal>
            <div style={{ borderRadius: "12px", overflow: "hidden" }}>
              <img
              src="/images/locale.png"
              alt="Esterno del locale Al-Turk Kebab & Pizzeria"
                style={{
                  width: "100%",
                  height: "360px",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.6s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
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
            </Reveal>

            <Reveal delay={0.1}>
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
            </Reveal>

            <Reveal delay={0.2}>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", lineHeight: 1.7, maxWidth: "560px" }}>
                Siamo partiti nel 2019 con un'ossessione: fare il kebab come va fatto. La carne la mariniamo noi ogni mattina con le nostre spezie. Il pane lo facciamo fresco, non lo scaldiamo dal surgelato. Le verdure le tagliamo al momento, non le tiriamo fuori da una busta.
                <br /><br />
                Ogni kebab che esce dal nostro locale è fatto a mano, dall'inizio alla fine. Se vuoi il solito kebab industriale, non siamo il posto giusto. Se vuoi quello vero, sei a casa.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── MENÙ ─── */}
      <section id="menu" style={{ background: "#0A0A0A" }}>
        <div style={sectionPadding}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ ...headingStyle, fontSize: "clamp(32px, 6vw, 48px)" }}>
                Il Menù
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "40px",
              }}
            >
              {["Panini Forti", "Piatti Forti"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => handleTabSwitch(i)}
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
          </Reveal>

          <div
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              opacity: tabFade ? 1 : 0,
              transform: tabFade ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}
          >
            {(menuTab === 0 ? MENU_TAB1 : MENU_TAB2).map((item, i) => (
              <MenuItem key={item.nome} item={item} index={i} />
            ))}
          </div>

          <Reveal delay={0.15}>
            <div style={{ textAlign: "center", marginTop: "48px" }}>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginBottom: "16px" }}>
                Pizze, calzoni, dolci e molto altro...
              </p>
              <a
                href="/images/menu-completo.png"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: "transparent",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "14px 28px",
                  borderRadius: "8px",
                  minHeight: "48px",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                📋 Vedi Menu Completo
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── RECENSIONI ─── */}
      <section id="recensioni" style={{ background: "#0A0A0A" }}>
        <div style={sectionPadding}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ ...headingStyle, fontSize: "clamp(32px, 6vw, 48px)" }}>
                Cosa Dicono di Noi
              </h2>
            </div>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {RECENSIONI.map((r, i) => (
              <Reveal key={r.nome} delay={i * 0.12}>
                <div
                  className="review-card"
                  style={{
                    background: "#141414",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderLeft: "3px solid #DC2626",
                    borderRadius: "12px",
                    padding: "28px 24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
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
                      &ldquo;{r.testo}&rdquo;
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>{r.nome}</span>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>{r.piattaforma}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ORDINA ─── */}
      <section id="ordina" style={{ background: "#141414" }}>
        <div style={{ ...sectionPadding, display: "flex", justifyContent: "center" }}>
          <Reveal>
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
                  animation: "badgeGlow 2.5s ease-in-out infinite",
                }}
              >
                -10% sul primo ordine online. Scrivi PRIMO10 su WhatsApp.
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-primary"
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
                  }}
                >
                  Ordina su WhatsApp →
                </a>
                <a
                  href={TEL_LINK}
                  className="cta-secondary"
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
                  }}
                >
                  Chiama Ora
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" style={{ background: "#0A0A0A" }}>
        <div style={{ ...sectionPadding, maxWidth: "700px" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ ...headingStyle, fontSize: "clamp(32px, 6vw, 48px)" }}>
                Domande Frequenti
              </h2>
            </div>
          </Reveal>
          {FAQ.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.08}>
              <FaqItem faq={faq} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── DOVE SIAMO ─── */}
      <section id="dove-siamo" style={{ background: "#141414" }}>
        <div style={sectionPadding}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ ...headingStyle, fontSize: "clamp(32px, 6vw, 48px)" }}>
                Dove Siamo
              </h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", marginTop: "16px" }}>
                Vicolo Plazzi 7, 48121 Ravenna RA
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.06)",
                height: "400px",
              }}
            >
              <iframe
                title="Al-Turk Kebab & Pizzeria - Mappa"
                src="https://maps.google.com/maps?q=Vicolo+Plazzi+7,+48121+Ravenna+RA,+Italy&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block", filter: "invert(90%) hue-rotate(180deg) brightness(0.95) contrast(1.1)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
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
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "18px", textTransform: "uppercase", marginBottom: "12px" }}>
              Al-Turk Kebab & Pizzeria
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: 1.6 }}>
              Kebab Artigianale. Fatto Come Si Deve.
            </p>
          </div>

          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", marginBottom: "12px" }}>
              Contatti
            </div>
            <p style={{ fontSize: "14px", lineHeight: 1.8 }}>
              Vicolo Plazzi 7, 48121 Ravenna RA
              <br />
              <a href={TEL_LINK} style={{ color: "rgba(255,255,255,0.6)" }}>324 772 4048</a>
              <br />
              <a href="tel:+390544206406" style={{ color: "rgba(255,255,255,0.6)" }}>0544 206 406</a>
            </p>
          </div>

          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", marginBottom: "12px" }}>
              Orari
            </div>
            <p style={{ fontSize: "14px", lineHeight: 1.8 }}>
              Lun-Dom
              <br />
              11:00 – 2:00
            </p>
          </div>

          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", marginBottom: "12px" }}>
              Seguici
            </div>
            <a
              href="https://instagram.com/istanbulgrill"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}
            >
              Instagram
            </a>
          </div>
        </div>

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
          animation: "waPulse 2.5s ease-in-out infinite",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff">
          <path d="M16.01 2.93A13.07 13.07 0 0 0 2.93 16a12.94 12.94 0 0 0 1.75 6.53L2.84 29.1l6.72-1.76A13.06 13.06 0 1 0 16.01 2.93Zm0 23.93a10.82 10.82 0 0 1-5.52-1.51l-.4-.23-4.12 1.08 1.1-4.02-.26-.41a10.87 10.87 0 1 1 9.2 5.09Zm5.96-8.13c-.33-.16-1.93-.95-2.23-1.06-.3-.11-.52-.16-.74.17-.22.33-.84 1.06-1.03 1.28-.19.22-.38.24-.71.08-.33-.16-1.38-.51-2.63-1.62-.97-.87-1.63-1.94-1.82-2.27-.19-.33-.02-.51.14-.67.15-.15.33-.38.49-.57.17-.19.22-.33.33-.55.11-.22.06-.41-.03-.57-.08-.17-.74-1.77-1.01-2.43-.27-.63-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.33-1.14 1.11-1.14 2.71s1.17 3.15 1.33 3.36c.16.22 2.3 3.51 5.58 4.92.78.34 1.39.54 1.86.69.78.25 1.5.21 2.06.13.63-.09 1.93-.79 2.21-1.55.27-.76.27-1.41.19-1.55-.08-.14-.3-.22-.63-.38Z"/>
        </svg>
      </a>
    </div>
  );
}
