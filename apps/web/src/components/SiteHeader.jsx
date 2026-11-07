import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { useI18n, LANGS, INFO } from '@/i18n';

const sections = [
  ['menu', 'menu'],
  ['about', 'nosotros'],
  ['gallery', 'galeria'],
  ['promos', 'promociones'],
  ['reviews', 'resenas'],
  ['faq', 'faq'],
  ['contact', 'contacto'],
];

export default function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (id) => {
    setOpen(false);
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scroll, 120);
    } else {
      scroll();
    }
  };

  const navItems = sections.map(([key, id]) => ({ label: t.nav[key], id }));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-background/95 backdrop-blur border-b border-border' : 'bg-gradient-to-b from-background/90 to-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link to="/" className="group flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-display text-xl tracking-[0.18em] text-[hsl(var(--secondary))] sm:text-2xl">IL FORNO</span>
          <span className="font-display text-xl italic tracking-[0.3em] text-foreground sm:text-2xl">NERO</span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className="text-[0.78rem] uppercase tracking-[0.18em] text-foreground/75 transition-colors hover:text-[hsl(var(--secondary))]"
            >
              {item.label}
            </button>
          ))}
          <Link to="/delivery" className="text-[0.78rem] uppercase tracking-[0.18em] text-foreground/75 transition-colors hover:text-[hsl(var(--secondary))]">
            {t.nav.delivery}
          </Link>
          <Link to="/noticias" className="text-[0.78rem] uppercase tracking-[0.18em] text-foreground/75 transition-colors hover:text-[hsl(var(--secondary))]">
            {t.nav.blog}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1 sm:flex">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                aria-label={l.name}
                className={`px-1.5 py-1 text-[0.7rem] tracking-[0.14em] transition-colors ${
                  lang === l.code ? 'text-[hsl(var(--secondary))] underline underline-offset-4' : 'text-foreground/45 hover:text-foreground'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <a
            href={INFO.phoneHref}
            className="hidden items-center gap-2 border border-[hsl(var(--secondary))]/50 px-3 py-2 text-[0.72rem] uppercase tracking-[0.16em] text-[hsl(var(--secondary))] transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary-foreground))] lg:flex"
          >
            <Phone className="h-3.5 w-3.5" strokeWidth={1.6} /> {INFO.phone}
          </a>
          <button
            onClick={() => goTo('reservas')}
            className="hidden bg-[hsl(var(--primary))] px-4 py-2.5 text-[0.72rem] uppercase tracking-[0.16em] text-[hsl(var(--primary-foreground))] transition-transform hover:brightness-110 active:scale-[0.98] sm:block"
          >
            {t.common.book}
          </button>
          <button
            className="p-2 text-foreground xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background/98 px-5 py-6 xl:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => goTo(item.id)} className="text-left font-display text-2xl text-foreground">
                {item.label}
              </button>
            ))}
            <Link to="/delivery" onClick={() => setOpen(false)} className="font-display text-2xl text-foreground">{t.nav.delivery}</Link>
            <Link to="/noticias" onClick={() => setOpen(false)} className="font-display text-2xl text-foreground">{t.nav.blog}</Link>
            <div className="mt-2 flex gap-3">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`border px-3 py-1.5 text-xs tracking-[0.14em] ${lang === l.code ? 'border-[hsl(var(--secondary))] text-[hsl(var(--secondary))]' : 'border-border text-foreground/60'}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <a href={INFO.phoneHref} className="mt-2 flex items-center gap-2 text-sm text-[hsl(var(--secondary))]">
              <Phone className="h-4 w-4" strokeWidth={1.6} /> {INFO.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
