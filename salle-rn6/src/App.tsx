import { useEffect, useRef, useState, useCallback } from "react";

const MAILTO = "mailto:lasallern6@gmail.com?subject=Demande%20de%20location%20-%20La%20Salle%20RN6&body=Bonjour%2C%0A%0AJe%20souhaite%20obtenir%20des%20informations%20pour%20la%20location%20de%20La%20Salle%20RN6.%0A%0AType%20d%27%C3%A9v%C3%A9nement%20%3A%0ADate%20souhait%C3%A9e%20%3A%0ANombre%20de%20personnes%20%3A%0A%0AMerci.";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    el.querySelectorAll(".reveal, .reveal-left").forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ═══════════════════════════════════════════════════════════════════════════
   NAVIGATION — minimal, transparent → white
   ═══════════════════════════════════════════════════════════════════════════ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  const links = [
    { href: "#espaces", label: "Espaces" },
    { href: "#equipements", label: "Equipements" },
    { href: "#mobilier", label: "Mobilier" },
    { href: "#acces", label: "Acces" },
  ];

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-stone/95 backdrop-blur-lg border-b border-stone-300" : ""}`}>
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-14 lg:h-16 px-6 lg:px-10">
        <a href="#" onClick={close} className="flex items-center gap-2.5">
          <LogoMark size={28} />
          <span className={`font-display text-sm font-semibold tracking-[0.08em] transition-colors duration-500 ${scrolled ? "text-ink" : "text-ink"}`}>
            LA SALLE RN6
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[13px] font-medium text-ink-400 hover:text-ink transition-colors tracking-wide">
              {l.label}
            </a>
          ))}
          <a href={MAILTO} className="ml-2 text-[13px] font-semibold text-white bg-ink px-5 py-2 hover:bg-ink-600 transition-colors tracking-wide">
            Contacter
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden w-7 h-7 flex flex-col justify-center items-center gap-[5px]" aria-label="Menu">
          <span className={`block w-5 h-[1.5px] bg-ink transition-all duration-300 ${open ? "rotate-45 translate-y-[3.25px]" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-ink transition-all duration-300 ${open ? "-rotate-45 -translate-y-[3.25px]" : ""}`} />
        </button>
      </div>

      {/* Mobile overlay */}
      <div className={`lg:hidden fixed inset-0 top-14 bg-stone transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="flex flex-col px-8 pt-12 gap-1">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={close} className="text-ink text-2xl font-display font-medium py-4 border-b border-stone-300">
              {l.label}
            </a>
          ))}
          <a href={MAILTO} onClick={close} className="mt-8 text-center text-sm font-semibold bg-ink text-white py-3.5 tracking-wide">
            Nous contacter
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO — typographic, editorial, white canvas
   ═══════════════════════════════════════════════════════════════════════════ */

function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center relative bg-stone overflow-hidden pt-14">
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{
        backgroundImage: "linear-gradient(#1A1A2E 1px, transparent 1px), linear-gradient(90deg, #1A1A2E 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* Gold vertical accent line */}
      <div className="hidden lg:block absolute left-[calc(50%-1px)] top-0 bottom-0 w-px bg-bronze/10" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 w-full py-20 lg:py-0">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-0 items-center">
          {/* Left: typography */}
          <div className="lg:col-span-7 lg:pr-20">
            <p className="text-bronze text-[11px] font-semibold tracking-[0.3em] uppercase mb-6 animate-enter" style={{ animationDelay: "0.1s" }}>
              Salle des fetes & seminaires &mdash; Appoigny, Yonne
            </p>

            <h1 className="animate-rise" style={{ animationDelay: "0.2s" }}>
              <span className="block font-display text-ink text-6xl sm:text-7xl lg:text-8xl xl:text-[6.5rem] font-medium leading-[0.9] tracking-[-0.02em]">
                La Salle
              </span>
              <span className="block font-display text-bronze text-6xl sm:text-7xl lg:text-8xl xl:text-[6.5rem] font-medium italic leading-[0.9] tracking-[-0.02em] mt-1">
                RN6
              </span>
            </h1>

            <div className="w-16 h-px bg-bronze/40 my-8 animate-enter" style={{ animationDelay: "0.5s" }} />

            <p className="text-ink-400 text-lg lg:text-xl leading-relaxed max-w-lg animate-rise" style={{ animationDelay: "0.4s" }}>
              Un espace evenementiel moderne et modulable, refait a neuf, pour
              vos mariages, anniversaires, seminaires et receptions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-rise" style={{ animationDelay: "0.55s" }}>
              <a href={MAILTO} className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-ruby text-white text-sm font-semibold tracking-wide hover:bg-ruby-600 transition-colors">
                <IconMail /> Demander une disponibilite
              </a>
              <a href="#espaces" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-ink/15 text-ink text-sm font-semibold tracking-wide hover:border-ink/40 transition-colors">
                Decouvrir &darr;
              </a>
            </div>
          </div>

          {/* Right: logo medallion */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end animate-enter" style={{ animationDelay: "0.6s" }}>
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-br from-bronze/[0.06] via-transparent to-bronze/[0.04] rounded-full blur-2xl" />
              <LogoFull size={280} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom stat bar */}
      <div className="relative mt-auto border-t border-stone-300 bg-white/60 backdrop-blur-sm animate-rise" style={{ animationDelay: "0.7s" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-stone-300">
            {[
              { num: "125", unit: "m²", label: "Surface principale" },
              { num: "120", unit: "", label: "Personnes assises" },
              { num: "6", unit: "", label: "Espaces distincts" },
              { num: "A6", unit: "", label: "Sortie n°19, 3 min" },
            ].map((s) => (
              <div key={s.label} className="py-5 lg:py-6 px-4 lg:px-8">
                <p className="font-display text-3xl lg:text-4xl font-medium text-ink leading-none">
                  {s.num}<span className="text-bronze text-lg ml-0.5">{s.unit}</span>
                </p>
                <p className="text-ink-400 text-xs mt-1.5 tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EVENT TYPES — horizontal marquee strip
   ═══════════════════════════════════════════════════════════════════════════ */

function EventStrip() {
  const items = ["Mariages", "Anniversaires", "Baptemes", "Cocktails", "Seminaires", "Receptions"];
  return (
    <div className="bg-ink py-4 overflow-hidden">
      <div className="flex items-center gap-8 whitespace-nowrap animate-[scroll_20s_linear_infinite]" style={{
        animation: "none",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "0.5rem 2rem",
        padding: "0 1.5rem",
      }}>
        {items.map((item, i) => (
          <span key={i} className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase flex items-center gap-6">
            {i > 0 && <span className="text-bronze">&#x2022;</span>}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ESPACES — editorial alternating layout
   ═══════════════════════════════════════════════════════════════════════════ */

function EspacesSection() {
  const ref = useReveal();

  const spaces = [
    { title: "Grande salle principale", area: "125 m²", desc: "Capacite confortable de jusqu'a 120 personnes assises. Un volume genereux baigne de lumiere naturelle.", icon: <IconGrid /> },
    { title: "Espace bar", area: "11,77 m²", desc: "Un espace dedie pour vos vins d'honneur, receptions et pauses cafe.", icon: <IconGlass /> },
    { title: "Cuisine traiteur", area: "8,56 m²", desc: "Office equipe pour le maintien au frais et le rechauffage des plats.", icon: <IconChef /> },
    { title: "Reserves", area: "26,34 m²", desc: "Deux espaces de stockage (17,11 m² + 9,23 m²) pour votre materiel.", icon: <IconBox /> },
    { title: "Accessibilite PMR", area: "Conforme", desc: "Rampes d'acces exterieures et sanitaires adaptes.", icon: <IconAccessible /> },
    { title: "Parking", area: "Gratuit", desc: "Grand parking public accessible a proximite immediate.", icon: <IconParking /> },
  ];

  return (
    <section id="espaces" className="py-24 lg:py-32 bg-stone" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header — asymmetric */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 mb-20">
          <div className="lg:col-span-5 reveal">
            <p className="text-bronze text-[11px] font-semibold tracking-[0.25em] uppercase mb-4">Les espaces</p>
            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-medium text-ink leading-[0.95] text-balance">
              Pensee pour <em className="text-bronze not-italic">recevoir</em>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-7 flex items-end reveal d2">
            <p className="text-ink-400 text-base lg:text-lg leading-relaxed mt-6 lg:mt-0">
              Des espaces fonctionnels pour accueillir vos invites et faciliter le travail de vos prestataires.
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-300">
          {spaces.map((s, i) => (
            <div key={s.title} className={`reveal d${Math.min(i + 1, 6)} group bg-white p-8 lg:p-10 hover:bg-stone-100/80 transition-colors duration-500`}>
              <div className="flex items-start justify-between mb-6">
                <div className="text-ink-300 group-hover:text-bronze transition-colors duration-500">
                  {s.icon}
                </div>
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-bronze bg-bronze/8 px-2.5 py-1">
                  {s.area}
                </span>
              </div>
              <h3 className="font-display text-xl font-medium text-ink mb-3">{s.title}</h3>
              <p className="text-ink-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EQUIPEMENTS — icon rows with left accent
   ═══════════════════════════════════════════════════════════════════════════ */

function EquipementsSection() {
  const ref = useReveal();

  const items = [
    { icon: <IconScreen />, title: "Ecran TV 98 pouces", desc: "Grand format pour presentations, seminaires et projections video." },
    { icon: <IconAudio />, title: "Sonorisation pro", desc: "Systeme audio integre avec micros sans fil." },
    { icon: <IconWifi />, title: "Wi-Fi haut debit", desc: "Connexion gratuite dans tout l'etablissement." },
    { icon: <IconClimate />, title: "Climatisation reversible", desc: "Chauffage par pompe a chaleur et climatisation." },
  ];

  return (
    <section id="equipements" className="py-24 lg:py-32 bg-white border-y border-stone-300" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Left: heading */}
          <div className="lg:col-span-4 mb-12 lg:mb-0">
            <div className="reveal lg:sticky lg:top-24">
              <p className="text-bronze text-[11px] font-semibold tracking-[0.25em] uppercase mb-4">Equipements</p>
              <h2 className="font-display text-4xl lg:text-5xl font-medium text-ink leading-[0.95] text-balance">
                Deja <em className="text-bronze not-italic">sur place</em>
              </h2>
              <p className="text-ink-400 text-base leading-relaxed mt-5 max-w-sm">
                Pour simplifier l'organisation de vos evenements.
              </p>
            </div>
          </div>

          {/* Right: items */}
          <div className="lg:col-span-7 lg:col-start-6 space-y-0 divide-y divide-stone-300">
            {items.map((item, i) => (
              <div key={item.title} className={`reveal d${Math.min(i + 1, 6)} group flex items-start gap-6 py-8 first:pt-0 last:pb-0`}>
                <div className="w-12 h-12 flex items-center justify-center bg-stone-100 text-ink-300 group-hover:bg-ink group-hover:text-bronze transition-all duration-500 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium text-ink mb-1">{item.title}</h3>
                  <p className="text-ink-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MOBILIER — two columns on tinted ground
   ═══════════════════════════════════════════════════════════════════════════ */

function MobilierSection() {
  const ref = useReveal();

  return (
    <section id="mobilier" className="py-24 lg:py-32 bg-ink relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)",
        backgroundSize: "32px 32px",
      }} />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="reveal mb-16">
          <p className="text-bronze text-[11px] font-semibold tracking-[0.25em] uppercase mb-4">Mobilier inclus</p>
          <h2 className="font-display text-4xl lg:text-5xl font-medium text-white leading-[0.95] text-balance">
            Tout est <em className="text-bronze not-italic">fourni</em>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-px">
          <div className="reveal d1 bg-white/[0.05] border border-white/[0.08] p-8 lg:p-12">
            <h3 className="font-display text-2xl font-medium text-white mb-8">Mobilier</h3>
            <div className="space-y-5">
              {["144 chaises", "20 tables pliantes (180 cm)", "2 tables rondes", "6 mange-debout"].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="w-5 h-px bg-bronze" />
                  <span className="text-white/75 text-[15px]">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal d2 bg-white/[0.05] border border-white/[0.08] p-8 lg:p-12">
            <h3 className="font-display text-2xl font-medium text-white mb-8">Vaisselle & cuisine</h3>
            <div className="space-y-5">
              {["Assiettes, verres et couverts", "Lave-vaisselle a disposition", "Machine a glacons"].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="w-5 h-px bg-bronze" />
                  <span className="text-white/75 text-[15px]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ACCES — map placeholder + details
   ═══════════════════════════════════════════════════════════════════════════ */

function AccesSection() {
  const ref = useReveal();

  return (
    <section id="acces" className="py-24 lg:py-32 bg-stone" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Left */}
          <div className="lg:col-span-5 mb-12 lg:mb-0">
            <div className="reveal">
              <p className="text-bronze text-[11px] font-semibold tracking-[0.25em] uppercase mb-4">Localisation</p>
              <h2 className="font-display text-4xl lg:text-5xl font-medium text-ink leading-[0.95] text-balance">
                Aux portes <em className="text-bronze not-italic">d'Auxerre</em>
              </h2>
              <p className="text-ink-400 text-base leading-relaxed mt-5">
                Facilement accessible depuis l'autoroute A6 et le centre d'Auxerre.
              </p>
            </div>

            {/* Map placeholder */}
            <div className="reveal d2 mt-10 bg-white border border-stone-300 aspect-[4/3] flex flex-col items-center justify-center text-center p-8">
              <IconMapPin className="text-bronze mb-3" />
              <p className="font-display text-ink text-lg font-medium mb-1">71 C route d'Auxerre</p>
              <p className="text-ink-400 text-sm mb-6">89380 Appoigny</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=71%20C%20route%20d%27Auxerre%2C%2089380%20Appoigny"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-white text-sm font-semibold hover:bg-ink-600 transition-colors"
              >
                Google Maps <IconExternal />
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-6 lg:col-start-7 space-y-6">
            <div className="reveal d1 bg-white border border-stone-300 p-8">
              <h3 className="font-display text-xl font-medium text-ink mb-6">Adresse & acces</h3>
              {[
                "71 C route d'Auxerre, 89380 Appoigny",
                "A 2,5 km de la sortie n°19 (Auxerre Nord) de l'A6, soit 3 a 5 min via la D606.",
                "Grand parking public a proximite immediate.",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3 mb-4 last:mb-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-bronze mt-2 flex-shrink-0" />
                  <span className="text-ink-500 text-[15px] leading-relaxed">{t}</span>
                </div>
              ))}
            </div>

            <div className="reveal d2 bg-white border border-stone-300 p-8">
              <h3 className="font-display text-xl font-medium text-ink mb-6">Types d'evenements</h3>
              <div className="grid grid-cols-2 gap-3">
                {["Mariages", "Anniversaires", "Baptemes", "Cocktails", "Seminaires", "Receptions"].map((t) => (
                  <div key={t} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-bronze flex-shrink-0" />
                    <span className="text-ink-500 text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal d3 bg-white border border-stone-300 p-8">
              <h3 className="font-display text-xl font-medium text-ink mb-4">Photos</h3>
              <p className="text-ink-400 text-sm leading-relaxed">
                Decouvrez prochainement la salle et ses espaces en images. Les premieres photos seront ajoutees tres bientot.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CTA / CONTACT — crimson bold
   ═══════════════════════════════════════════════════════════════════════════ */

function ContactSection() {
  const ref = useReveal();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText("lasallern6@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <section className="bg-ruby relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(135deg, rgba(0,0,0,0.08) 0%, transparent 50%, rgba(0,0,0,0.04) 100%)",
      }} />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <p className="reveal text-white/60 text-[11px] font-semibold tracking-[0.25em] uppercase mb-6">Reservations & renseignements</p>
            <h2 className="reveal d1 font-display text-4xl lg:text-5xl xl:text-6xl font-medium text-white leading-[0.95] text-balance">
              Une date en tete ?
            </h2>
            <p className="reveal d2 text-white/70 text-base lg:text-lg leading-relaxed mt-6 max-w-lg">
              Contactez-nous pour toute demande de tarif, de disponibilite ou d'information sur la location.
            </p>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 mt-10 lg:mt-0">
            <div className="reveal d3 flex flex-col gap-4">
              <a href={MAILTO} className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-ruby text-sm font-bold tracking-wide hover:bg-stone transition-colors">
                <IconMail /> Ecrire un e-mail
              </a>
              <button onClick={handleCopy} className="inline-flex items-center justify-center gap-2 text-white/70 text-sm hover:text-white transition-colors">
                lasallern6@gmail.com
                <span className="text-[10px] tracking-wider uppercase border border-white/30 px-2 py-0.5">
                  {copied ? "Copie !" : "Copier"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER — minimal
   ═══════════════════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="bg-ink py-8">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <LogoMark size={22} />
          <span className="text-white/30 text-xs">&copy; 2026 La Salle RN6 &mdash; Appoigny, Yonne.</span>
        </div>
        <a href="mailto:lasallern6@gmail.com" className="text-white/30 text-xs hover:text-bronze transition-colors">
          lasallern6@gmail.com
        </a>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LOGO COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="18" fill="none" stroke="#B8963E" strokeWidth="1.5" />
      <g transform="translate(20, 18)">
        <rect x="-6" y="-10" width="12" height="18" rx="1.5" fill="#1A1A2E" />
        <rect x="-6" y="-10" width="12" height="6" rx="1.5" fill="#C41E3A" />
        <rect x="-6" y="-5.5" width="12" height="1.5" fill="#C41E3A" />
        <text x="0" y="6" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="white" fontFamily="sans-serif">N6</text>
      </g>
    </svg>
  );
}

function LogoFull({ size = 240 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gRing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B8963E" />
          <stop offset="40%" stopColor="#DECE8E" />
          <stop offset="70%" stopColor="#C5AB5C" />
          <stop offset="100%" stopColor="#B8963E" />
        </linearGradient>
        <path id="tArc" d="M 35,100 A 65,65 0 0,1 165,100" />
        <path id="bArc" d="M 48,112 A 56,56 0 0,0 152,112" />
      </defs>
      <circle cx="100" cy="100" r="94" fill="none" stroke="url(#gRing)" strokeWidth="6" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="#B8963E" strokeWidth="0.5" opacity="0.4" />
      <circle cx="100" cy="100" r="85" fill="#FAFAF8" />
      <text fill="#1A1A2E" fontSize="9.5" fontWeight="600" letterSpacing="1.8" fontFamily="'Bodoni Moda', Georgia, serif">
        <textPath href="#tArc" startOffset="50%" textAnchor="middle">SALLE DES FETES ET SEMINAIRES</textPath>
      </text>
      <circle cx="22" cy="100" r="2.5" fill="#B8963E" />
      <circle cx="178" cy="100" r="2.5" fill="#B8963E" />
      <g transform="translate(100, 56)">
        <rect x="-14" y="-24" width="28" height="44" rx="4" fill="#1A1A2E" />
        <rect x="-14" y="-24" width="28" height="14" rx="4" fill="#C41E3A" />
        <rect x="-14" y="-14" width="28" height="4" fill="#C41E3A" />
        <text x="0" y="12" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white" fontFamily="'Figtree', sans-serif">N6</text>
      </g>
      <text x="100" y="96" textAnchor="middle" fontSize="21" fontWeight="700" fill="#1A1A2E" fontFamily="'Bodoni Moda', Georgia, serif" letterSpacing="3">LA SALLE</text>
      <text x="100" y="115" textAnchor="middle" fontSize="17" fontWeight="700" fill="#1A1A2E" fontFamily="'Bodoni Moda', Georgia, serif" letterSpacing="4">RN6</text>
      <text fill="#1A1A2E" fontSize="9" fontWeight="600" letterSpacing="2.5" fontFamily="'Bodoni Moda', Georgia, serif">
        <textPath href="#bArc" startOffset="50%" textAnchor="middle">APPOIGNY &#183; YONNE</textPath>
      </text>
      <circle cx="58" cy="140" r="2" fill="#B8963E" />
      <circle cx="142" cy="140" r="2" fill="#B8963E" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ICONS — inline SVG
   ═══════════════════════════════════════════════════════════════════════════ */

function IconMail() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
}
function IconMapPin({ className = "" }: { className?: string }) {
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>;
}
function IconExternal() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>;
}
function IconGrid() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 12h18"/><path d="M12 3v18"/></svg>;
}
function IconGlass() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 22h8"/><path d="M12 11v11"/><path d="m19 3-7 8-7-8Z"/></svg>;
}
function IconChef() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" y1="17" x2="18" y2="17"/></svg>;
}
function IconBox() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>;
}
function IconAccessible() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><path d="M4.24 14.5a5 5 0 0 0 6.88 6"/><path d="M13.76 17.5a5 5 0 0 0-6.88-6"/></svg>;
}
function IconParking() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>;
}
function IconScreen() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>;
}
function IconAudio() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>;
}
function IconWifi() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/></svg>;
}
function IconClimate() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>;
}

/* ═══════════════════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════════════════ */

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <EventStrip />
      <EspacesSection />
      <EquipementsSection />
      <MobilierSection />
      <AccesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
