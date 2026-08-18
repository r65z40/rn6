import { useEffect, useRef, useState, useCallback } from "react";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const animatedEls = el.querySelectorAll(
      ".animate-on-scroll, .animate-on-scroll-left"
    );
    animatedEls.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return ref;
}

function SectionLabel({
  text,
  light = false,
}: {
  text: string;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span
        className={`text-[11px] font-semibold tracking-[0.2em] uppercase ${
          light ? "text-gold-300" : "text-gold"
        }`}
      >
        {text}
      </span>
      <div
        className={`flex-1 h-px ${light ? "bg-gold-300/20" : "bg-gold/30"}`}
      />
    </div>
  );
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { href: "#salle", label: "La salle" },
    { href: "#equipements", label: "Equipements" },
    { href: "#mobilier", label: "Mobilier" },
    { href: "#acces", label: "Acces" },
    { href: "#photos", label: "Photos" },
  ];

  const handleNavClick = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a
            href="#accueil"
            className="flex items-center gap-3 group"
            onClick={handleNavClick}
          >
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div
                className={`absolute inset-0 rounded-full border-2 transition-colors duration-500 ${
                  scrolled ? "border-gold" : "border-gold-300"
                }`}
              />
              <span
                className={`font-serif font-bold text-sm transition-colors duration-500 ${
                  scrolled ? "text-navy" : "text-white"
                }`}
              >
                N6
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className={`text-[13px] font-semibold tracking-wide transition-colors duration-500 ${
                  scrolled ? "text-navy" : "text-white"
                }`}
              >
                LA SALLE RN6
              </span>
              <span
                className={`text-[10px] tracking-[0.15em] uppercase transition-colors duration-500 ${
                  scrolled ? "text-navy-400" : "text-cream-200"
                }`}
              >
                Appoigny
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 hover:text-gold ${
                  scrolled ? "text-navy-500" : "text-cream-200"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:lasallern6@gmail.com?subject=Demande%20de%20location%20-%20La%20Salle%20RN6&body=Bonjour%2C%0A%0AJe%20souhaite%20obtenir%20des%20informations%20pour%20la%20location%20de%20La%20Salle%20RN6.%0A%0AType%20d%27%C3%A9v%C3%A9nement%20%3A%0ADate%20souhait%C3%A9e%20%3A%0ANombre%20de%20personnes%20%3A%0A%0AMerci."
              className="ml-4 px-5 py-2 text-[13px] font-semibold tracking-wide bg-crimson text-white rounded-sm hover:bg-crimson-600 transition-colors duration-300"
            >
              Nous contacter
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Menu"
          >
            <span
              className={`block w-5 h-px transition-all duration-300 ${
                mobileOpen
                  ? "rotate-45 translate-y-[3.5px] bg-navy"
                  : scrolled
                  ? "bg-navy"
                  : "bg-white"
              }`}
            />
            <span
              className={`block w-5 h-px transition-all duration-300 ${
                mobileOpen
                  ? "-rotate-45 -translate-y-[3.5px] bg-navy"
                  : scrolled
                  ? "bg-navy"
                  : "bg-white"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`h-px transition-opacity duration-500 ${
          scrolled ? "opacity-100 bg-gold/20" : "opacity-0"
        }`}
      />

      <div
        className={`lg:hidden fixed inset-0 top-16 bg-white transition-all duration-400 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col px-8 py-10 gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="text-navy text-lg font-serif font-medium py-3 border-b border-gold/10 hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:lasallern6@gmail.com?subject=Demande%20de%20location%20-%20La%20Salle%20RN6&body=Bonjour%2C%0A%0AJe%20souhaite%20obtenir%20des%20informations%20pour%20la%20location%20de%20La%20Salle%20RN6.%0A%0AType%20d%27%C3%A9v%C3%A9nement%20%3A%0ADate%20souhait%C3%A9e%20%3A%0ANombre%20de%20personnes%20%3A%0A%0AMerci."
            onClick={handleNavClick}
            className="mt-6 px-6 py-3 text-center text-sm font-semibold tracking-wide bg-crimson text-white rounded-sm"
          >
            Nous contacter
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center overflow-hidden navy-gradient"
    >
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 select-none pointer-events-none hidden lg:block">
        <span className="text-[20vw] font-serif font-bold text-white/[0.02] leading-none">
          RN6
        </span>
      </div>

      <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none">
        <div className="absolute top-8 left-8 w-16 h-px bg-gold/30" />
        <div className="absolute top-8 left-8 w-px h-16 bg-gold/30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-16 lg:pt-0 w-full">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-8 animate-fade-in">
              <div className="w-10 h-px bg-gold" />
              <span className="text-gold text-[11px] font-semibold tracking-[0.25em] uppercase">
                Salle des fetes & seminaires
              </span>
            </div>

            <h1 className="font-serif text-cream text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[0.95] mb-8 animate-fade-up">
              La Salle
              <br />
              <span className="text-gold">RN6</span>
            </h1>

            <p className="text-cream-200/80 text-lg lg:text-xl leading-relaxed max-w-xl mb-10 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              Un lieu pour vos moments importants. A Appoigny, aux portes
              d'Auxerre, decouvrez un espace evenementiel moderne, modulable
              et refait a neuf.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <a
                href="mailto:lasallern6@gmail.com?subject=Demande%20de%20location%20-%20La%20Salle%20RN6&body=Bonjour%2C%0A%0AJe%20souhaite%20obtenir%20des%20informations%20pour%20la%20location%20de%20La%20Salle%20RN6.%0A%0AType%20d%27%C3%A9v%C3%A9nement%20%3A%0ADate%20souhait%C3%A9e%20%3A%0ANombre%20de%20personnes%20%3A%0A%0AMerci."
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-crimson text-white text-sm font-semibold tracking-wide rounded-sm hover:bg-crimson-600 transition-all duration-300 hover:shadow-lg hover:shadow-crimson/20"
              >
                <MailIcon />
                Demander une disponibilite
              </a>
              <a
                href="#salle"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-gold/40 text-gold text-sm font-semibold tracking-wide rounded-sm hover:bg-gold/10 transition-all duration-300"
              >
                Decouvrir la salle
                <ArrowDownIcon />
              </a>
            </div>
          </div>

          <div
            className="lg:col-span-2 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-sm p-8 lg:p-10 space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="text-gold" />
                </div>
                <div>
                  <p className="text-cream text-sm font-semibold mb-1">
                    Localisation
                  </p>
                  <p className="text-cream-200/60 text-sm leading-relaxed">
                    71 C route d'Auxerre
                    <br />
                    89380 Appoigny
                  </p>
                </div>
              </div>

              <div className="h-px bg-white/10" />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <UsersIcon className="text-gold" />
                </div>
                <div>
                  <p className="text-cream text-sm font-semibold mb-1">
                    Capacite
                  </p>
                  <p className="text-cream-200/60 text-sm">
                    Jusqu'a 120 personnes assises
                  </p>
                </div>
              </div>

              <div className="h-px bg-white/10" />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <CalendarIcon className="text-gold" />
                </div>
                <div>
                  <p className="text-cream text-sm font-semibold mb-1">
                    Evenements
                  </p>
                  <p className="text-cream-200/60 text-sm leading-relaxed">
                    Mariages, anniversaires, baptemes,
                    <br />
                    cocktails, seminaires, receptions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "1s" }}>
        <span className="text-cream-200/40 text-[10px] tracking-[0.2em] uppercase">
          Defiler
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent" />
      </div>
    </section>
  );
}

function VenueSection() {
  const ref = useScrollReveal();

  const spaces = [
    {
      icon: <GridIcon />,
      title: "Grande salle principale",
      detail: "125 m²",
      desc: "Capacite confortable de jusqu'a 120 personnes assises.",
    },
    {
      icon: <GlassIcon />,
      title: "Espace bar dedie",
      detail: "11,77 m²",
      desc: "Ideal pour les vins d'honneur, receptions et pauses cafe.",
    },
    {
      icon: <ChefIcon />,
      title: "Cuisine / office traiteur",
      detail: "8,56 m²",
      desc: "Equipee pour le maintien au frais et le rechauffage des plats.",
    },
    {
      icon: <BoxIcon />,
      title: "Espaces de stockage",
      detail: "26,34 m²",
      desc: "Repartis en deux reserves de 17,11 m² et 9,23 m².",
    },
    {
      icon: <AccessibleIcon />,
      title: "Accessibilite PMR",
      detail: "Conforme",
      desc: "Rampes d'acces exterieures et sanitaires adaptes separes.",
    },
    {
      icon: <ParkingIcon />,
      title: "Stationnement",
      detail: "Gratuit",
      desc: "Grand parking public immediatement accessible.",
    },
  ];

  return (
    <section id="salle" className="py-24 lg:py-32 bg-cream" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="animate-on-scroll">
          <SectionLabel text="La salle" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 mb-20">
          <div className="animate-on-scroll">
            <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-navy leading-[1.1] text-balance">
              Une salle pensee
              <br />
              <span className="text-gold italic">pour recevoir</span>
            </h2>
          </div>
          <div className="animate-on-scroll stagger-1 flex items-end">
            <p className="text-navy-400 text-base lg:text-lg leading-relaxed">
              Des espaces fonctionnels pour accueillir vos invites, organiser
              votre reception et faciliter le travail de vos prestataires.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {spaces.map((space, i) => (
            <div
              key={space.title}
              className={`animate-on-scroll stagger-${Math.min(i + 1, 5)} group relative bg-white border border-gold/10 p-7 rounded-sm hover:border-gold/30 transition-all duration-500 hover:shadow-lg hover:shadow-gold/5`}
            >
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-gold/40 via-gold/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-sm bg-navy/[0.04] flex items-center justify-center text-navy-500">
                  {space.icon}
                </div>
                <span className="text-[11px] font-semibold tracking-wider text-gold uppercase">
                  {space.detail}
                </span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-navy mb-2">
                {space.title}
              </h3>
              <p className="text-navy-400 text-sm leading-relaxed">
                {space.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EquipementsSection() {
  const ref = useScrollReveal();

  const equipements = [
    {
      icon: <ScreenIcon />,
      title: "Ecran TV 98 pouces",
      desc: "Grand format pour presentations, seminaires et videos.",
    },
    {
      icon: <AudioIcon />,
      title: "Audio professionnel",
      desc: "Sonorisation integree avec micros sans fil.",
    },
    {
      icon: <WifiIcon />,
      title: "Wi-Fi haut debit",
      desc: "Connexion gratuite dans tout l'etablissement.",
    },
    {
      icon: <ThermometerIcon />,
      title: "Climatisation & chauffage",
      desc: "Climatisation reversible et pompe a chaleur.",
    },
  ];

  return (
    <section id="equipements" className="py-24 lg:py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="animate-on-scroll">
          <SectionLabel text="Equipements" />
        </div>

        <div className="animate-on-scroll mb-16">
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-navy leading-[1.1] max-w-2xl text-balance">
            Des equipements{" "}
            <span className="text-gold italic">deja sur place</span>
          </h2>
          <p className="text-navy-400 text-base lg:text-lg leading-relaxed mt-5 max-w-xl">
            Pour simplifier l'organisation de vos evenements prives comme
            professionnels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {equipements.map((eq, i) => (
            <div
              key={eq.title}
              className={`animate-on-scroll stagger-${Math.min(i + 1, 5)} group flex items-start gap-6 p-6 lg:p-8 bg-cream/60 border border-transparent hover:border-gold/20 rounded-sm transition-all duration-500`}
            >
              <div className="w-14 h-14 rounded-sm bg-navy flex items-center justify-center flex-shrink-0 text-gold group-hover:bg-navy-600 transition-colors duration-300">
                {eq.icon}
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-navy mb-2">
                  {eq.title}
                </h3>
                <p className="text-navy-400 text-sm leading-relaxed">
                  {eq.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobilierSection() {
  const ref = useScrollReveal();

  return (
    <section
      id="mobilier"
      className="py-24 lg:py-32 navy-gradient relative overflow-hidden"
      ref={ref}
    >
      <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none">
        <div className="absolute top-12 right-12 w-24 h-px bg-gold/20" />
        <div className="absolute top-12 right-12 w-px h-24 bg-gold/20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="animate-on-scroll">
          <SectionLabel text="Mobilier & equipements inclus" light />
        </div>

        <div className="animate-on-scroll mb-16">
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-cream leading-[1.1] max-w-3xl text-balance">
            Tout est{" "}
            <span className="text-gold italic">deja sur place</span>
          </h2>
          <p className="text-cream-200/60 text-base lg:text-lg leading-relaxed mt-5 max-w-xl">
            Le mobilier et plusieurs equipements sont disponibles pour faciliter
            l'organisation de votre evenement.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="animate-on-scroll stagger-1 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-sm p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-8 h-8 rounded-sm bg-gold/15 flex items-center justify-center">
                <ChairIcon className="text-gold" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-cream">
                Mobilier
              </h3>
            </div>
            <ul className="space-y-4">
              {[
                "144 chaises",
                "20 tables pliantes de 180 cm",
                "2 tables rondes",
                "6 mange-debout",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckIcon className="text-gold flex-shrink-0" />
                  <span className="text-cream-200/80 text-[15px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-on-scroll stagger-2 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-sm p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-8 h-8 rounded-sm bg-gold/15 flex items-center justify-center">
                <UtensilsIcon className="text-gold" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-cream">
                Vaisselle & cuisine
              </h3>
            </div>
            <ul className="space-y-4">
              {[
                "Vaisselle : assiettes, verres et couverts",
                "Lave-vaisselle a disposition",
                "Machine a glacons",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckIcon className="text-gold flex-shrink-0" />
                  <span className="text-cream-200/80 text-[15px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function AccesSection() {
  const ref = useScrollReveal();

  return (
    <section id="acces" className="py-24 lg:py-32 bg-cream" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="animate-on-scroll">
          <SectionLabel text="Acces" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <div className="animate-on-scroll mb-10">
              <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-navy leading-[1.1] text-balance">
                Facile d'acces,
                <br />
                <span className="text-gold italic">proche d'Auxerre</span>
              </h2>
              <p className="text-navy-400 text-base lg:text-lg leading-relaxed mt-5">
                Une localisation pratique pour vos invites venant d'Auxerre, de
                l'Yonne ou par l'autoroute A6.
              </p>
            </div>

            <div className="animate-on-scroll stagger-1 relative bg-navy/[0.04] border border-gold/10 rounded-sm overflow-hidden aspect-[16/10]">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <MapPinIcon className="text-gold mb-3 w-6 h-6" />
                <p className="font-serif text-navy text-lg font-semibold mb-2">
                  71 C route d'Auxerre
                </p>
                <p className="text-navy-400 text-sm mb-5">
                  89380 Appoigny, Yonne
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=71%20C%20route%20d%27Auxerre%2C%2089380%20Appoigny"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-cream text-sm font-semibold rounded-sm hover:bg-navy-600 transition-colors"
                >
                  Voir sur Google Maps
                  <ExternalLinkIcon />
                </a>
              </div>
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(#1B2A4A 1px, transparent 1px), linear-gradient(90deg, #1B2A4A 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="animate-on-scroll stagger-1 bg-white border border-gold/10 rounded-sm p-7">
              <h3 className="font-serif text-xl font-semibold text-navy mb-5">
                Adresse & acces
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckIcon className="text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-navy-500 text-[15px] leading-relaxed">
                    71 C route d'Auxerre, 89380 Appoigny
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon className="text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-navy-500 text-[15px] leading-relaxed">
                    A environ 2,5 a 3 km de la sortie n&deg;19 Auxerre Nord
                    de l'A6, soit environ 3 a 5 minutes via la D606.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon className="text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-navy-500 text-[15px] leading-relaxed">
                    Grand parking public accessible a proximite immediate.
                  </span>
                </li>
              </ul>
            </div>

            <div className="animate-on-scroll stagger-2 bg-white border border-gold/10 rounded-sm p-7">
              <h3 className="font-serif text-xl font-semibold text-navy mb-5">
                Pour quels evenements ?
              </h3>
              <ul className="space-y-4">
                {[
                  "Mariages, anniversaires et baptemes",
                  "Cocktails et receptions",
                  "Seminaires et evenements professionnels",
                  "Espace moderne et modulable, refait a neuf",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon className="text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-navy-500 text-[15px] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhotosSection() {
  const ref = useScrollReveal();

  return (
    <section id="photos" className="py-24 lg:py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="animate-on-scroll">
          <SectionLabel text="Photos" />
        </div>

        <div className="animate-on-scroll mb-12">
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-navy leading-[1.1] text-balance">
            Photos de{" "}
            <span className="text-gold italic">La Salle RN6</span>
          </h2>
          <p className="text-navy-400 text-base lg:text-lg leading-relaxed mt-5 max-w-xl">
            Decouvrez prochainement la salle, ses espaces et ses equipements en
            images.
          </p>
        </div>

        <div className="animate-on-scroll stagger-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`relative bg-cream border border-gold/10 rounded-sm overflow-hidden ${
                i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[4/3]"
              }`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <CameraIcon className="text-gold/40 mb-2" />
                {i === 0 && (
                  <p className="text-navy-300 text-sm font-medium">
                    Photos disponibles prochainement
                  </p>
                )}
              </div>
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, #1B2A4A 0.5px, transparent 0)",
                  backgroundSize: "20px 20px",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const ref = useScrollReveal();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText("lasallern6@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <section
      className="py-24 lg:py-32 navy-gradient relative overflow-hidden"
      ref={ref}
    >
      <div className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none">
        <div className="absolute bottom-12 left-12 w-20 h-px bg-gold/20" />
        <div className="absolute bottom-12 left-12 w-px h-20 bg-gold/20" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <div className="animate-on-scroll">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-gold/40" />
            <span className="text-gold text-[11px] font-semibold tracking-[0.25em] uppercase">
              Reservations & renseignements
            </span>
            <div className="w-12 h-px bg-gold/40" />
          </div>
        </div>

        <h2 className="animate-on-scroll font-serif text-4xl lg:text-5xl xl:text-6xl font-semibold text-cream leading-[1.1] mb-6 text-balance">
          Une date en tete ?
          <br />
          <span className="text-gold italic">Contactez-nous.</span>
        </h2>

        <p className="animate-on-scroll stagger-1 text-cream-200/60 text-base lg:text-lg leading-relaxed max-w-lg mx-auto mb-10">
          Pour toute demande de tarif, de disponibilite ou d'information sur
          la location, contactez-nous directement par e-mail.
        </p>

        <div className="animate-on-scroll stagger-2 flex flex-col items-center gap-5">
          <a
            href="mailto:lasallern6@gmail.com?subject=Demande%20de%20location%20-%20La%20Salle%20RN6&body=Bonjour%2C%0A%0AJe%20souhaite%20obtenir%20des%20informations%20pour%20la%20location%20de%20La%20Salle%20RN6.%0A%0AType%20d%27%C3%A9v%C3%A9nement%20%3A%0ADate%20souhait%C3%A9e%20%3A%0ANombre%20de%20personnes%20%3A%0A%0AMerci."
            className="inline-flex items-center gap-2 px-8 py-4 bg-crimson text-white text-sm font-semibold tracking-wide rounded-sm hover:bg-crimson-600 transition-all duration-300 hover:shadow-lg hover:shadow-crimson/20"
          >
            <MailIcon />
            Demander une disponibilite
          </a>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 text-cream-200/50 text-sm hover:text-gold transition-colors duration-300"
          >
            <span className="font-medium">lasallern6@gmail.com</span>
            <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 border border-current rounded-sm">
              {copied ? "Copie !" : "Copier"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy-800 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full border border-gold/30 flex items-center justify-center">
              <span className="font-serif text-[10px] font-bold text-cream">
                N6
              </span>
            </div>
            <span className="text-cream-200/40 text-xs">
              &copy; 2026 La Salle RN6 &mdash; Appoigny, Yonne.
            </span>
          </div>
          <a
            href="mailto:lasallern6@gmail.com"
            className="text-cream-200/40 text-xs hover:text-gold transition-colors"
          >
            lasallern6@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MapPinIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function UsersIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CalendarIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4" /><path d="M16 2v4" />
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 12h18" /><path d="M12 3v18" />
    </svg>
  );
}

function GlassIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 22h8" /><path d="M12 11v11" />
      <path d="m19 3-7 8-7-8Z" />
    </svg>
  );
}

function ChefIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
      <line x1="6" y1="17" x2="18" y2="17" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
    </svg>
  );
}

function AccessibleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="4" r="1" />
      <path d="m18 19 1-7-6 1" />
      <path d="m5 8 3-3 5.5 3-2.36 3.5" />
      <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
      <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
    </svg>
  );
}

function ParkingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </svg>
  );
}

function ScreenIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" /><path d="M12 17v4" />
    </svg>
  );
}

function AudioIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h.01" />
      <path d="M2 8.82a15 15 0 0 1 20 0" />
      <path d="M5 12.859a10 10 0 0 1 14 0" />
      <path d="M8.5 16.429a5 5 0 0 1 7 0" />
    </svg>
  );
}

function ThermometerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ChairIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
      <path d="M3 16h18" />
      <path d="M5 11h14a2 2 0 0 1 2 2v3H3v-3a2 2 0 0 1 2-2Z" />
      <path d="M5 16v5" /><path d="M19 16v5" />
    </svg>
  );
}

function UtensilsIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}

function CameraIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <VenueSection />
      <EquipementsSection />
      <MobilierSection />
      <AccesSection />
      <PhotosSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
