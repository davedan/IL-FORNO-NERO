import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail, MapPin, Clock, Leaf, Flame, ChevronDown, Quote, ArrowRight } from 'lucide-react';
import { useI18n, INFO } from '@/i18n';
import { menu } from '@/data/menu';
import { Reveal, Kicker, Heading } from '@/components/Section';
import apiServerClient from '@/lib/apiServerClient';

const IMG = {
  hero: 'https://images.hostinger.com/154aafbd-81dc-4787-8c93-b2a32bb6cbee.png',
  interior: 'https://images.hostinger.com/569fd2f0-8dad-46a2-915a-aa536605226b.png',
  margherita: 'https://images.hostinger.com/161cae1b-fb49-46dc-9743-508f76b01f69.png',
  nero: 'https://images.hostinger.com/7531b623-2fe3-42e0-a495-1d596c21232b.png',
  diavola: 'https://images.hostinger.com/5267ed01-5467-474b-b569-159afc6742c6.png',
  dough: 'https://images.hostinger.com/1c3e9407-d0ba-4059-a58c-4bb92661df5b.png',
  wine: 'https://images.hostinger.com/b2a4aa15-82c8-42b2-ae66-6d9a90a61abf.png',
  facade: 'https://images.hostinger.com/bc5f8b0a-51e7-4b57-ad89-f850a76e37d6.png',
};

const TIMES = ['13:00', '13:30', '14:00', '14:30', '15:00', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00'];

function Hero() {
  const { t } = useI18n();
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section id="inicio" className="relative flex min-h-[100dvh] items-end overflow-hidden">
      <img src={IMG.hero} alt="Horno de leña encendido con una pizza napolitana recién horneada en Il Forno Nero" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-transparent to-transparent" />
      <div className="relative mx-auto w-full max-w-[90rem] px-5 pb-20 pt-36 sm:px-8 sm:pb-28">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-[0.7rem] uppercase tracking-[0.3em] text-[hsl(var(--secondary))]">
          {t.hero.kicker}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-4xl font-display text-[3rem] leading-[0.95] sm:text-[4.5rem] lg:text-[6rem]"
        >
          {t.hero.title1}
          <span className="block italic text-[hsl(var(--secondary))]">{t.hero.title2}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70">
          {t.hero.sub}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }} className="mt-9 flex flex-wrap items-center gap-3">
          <button onClick={() => scrollTo('menu')} className="min-h-[48px] bg-[hsl(var(--primary))] px-7 text-[0.78rem] uppercase tracking-[0.2em] text-[hsl(var(--primary-foreground))] transition hover:brightness-110 active:scale-[0.98]">
            {t.hero.cta1}
          </button>
          <button onClick={() => scrollTo('reservas')} className="min-h-[48px] border border-[hsl(var(--secondary))] px-7 text-[0.78rem] uppercase tracking-[0.2em] text-[hsl(var(--secondary))] transition hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary-foreground))] active:scale-[0.98]">
            {t.hero.cta2}
          </button>
        </motion.div>
        <p className="mt-8 flex items-center gap-2 text-xs tracking-[0.14em] text-foreground/45">
          <Clock className="h-3.5 w-3.5" strokeWidth={1.5} /> {t.hero.open}
        </p>
      </div>
      <ChevronDown className="absolute bottom-5 left-1/2 h-5 w-5 -translate-x-1/2 animate-bounce text-foreground/35" strokeWidth={1.4} />
    </section>
  );
}

function Marquee() {
  const { t } = useI18n();
  const words = [...t.marquee, ...t.marquee];
  return (
    <div className="overflow-hidden border-y border-border bg-[hsl(24_16%_11%)] py-4">
      <div className="marquee-track">
        {words.map((w, i) => (
          <span key={i} className="flex items-center gap-6 whitespace-nowrap px-6 font-display text-lg italic text-foreground/60">
            {w} <Flame className="h-3.5 w-3.5 text-[hsl(var(--primary))]" strokeWidth={1.6} />
          </span>
        ))}
      </div>
    </div>
  );
}

function MenuSection() {
  const { t, tr } = useI18n();
  return (
    <section id="menu" className="mx-auto max-w-[80rem] px-5 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <Kicker>{t.menu.kicker}</Kicker>
        <Heading>{t.menu.title}</Heading>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/60">{t.menu.sub}</p>
      </Reveal>

      <div className="mt-14 grid gap-x-16 gap-y-14 lg:grid-cols-2">
        {menu.map((cat, idx) => (
          <Reveal key={cat.id} delay={0.05 * (idx % 2)}>
            <div className="flex items-baseline justify-between gap-4 border-b border-[hsl(var(--secondary))]/30 pb-3">
              <h3 className="font-display text-2xl text-[hsl(var(--secondary))] sm:text-3xl">{tr(cat.title)}</h3>
              {cat.note && <span className="text-[0.65rem] uppercase tracking-[0.18em] text-foreground/40">{tr(cat.note)}</span>}
            </div>
            <ul className="mt-6 space-y-5">
              {cat.items.map((item) => (
                <li key={cat.id + item.name}>
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-lg text-foreground">{item.name}</span>
                    {item.veg && (
                      <span className="inline-flex items-center gap-1 bg-[hsl(var(--basil))]/45 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.14em] text-[hsl(80_35%_82%)]" title={t.menu.veg}>
                        <Leaf className="h-3 w-3" strokeWidth={1.6} /> {t.menu.veg}
                      </span>
                    )}
                    {item.house && (
                      <span className="bg-[hsl(var(--primary))]/85 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.14em] text-[hsl(var(--primary-foreground))]">
                        {t.menu.house}
                      </span>
                    )}
                    <span className="mx-1 h-px flex-1 bg-border" />
                    <span className="font-display text-lg text-[hsl(var(--secondary))]">{item.price} €</span>
                  </div>
                  {tr(item.d) && <p className="mt-1 max-w-lg text-sm leading-relaxed text-foreground/50">{tr(item.d)}</p>}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-14 flex flex-col gap-3 border border-dashed border-[hsl(var(--secondary))]/40 p-6 text-sm text-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <span>{t.menu.gluten}</span>
          <span className="inline-flex items-center gap-2 text-[hsl(80_35%_78%)]"><Leaf className="h-4 w-4" strokeWidth={1.6} /> {t.menu.vegNote}</span>
        </div>
      </Reveal>
    </section>
  );
}

function About() {
  const { t } = useI18n();
  return (
    <section id="nosotros" className="border-y border-border bg-[hsl(24_16%_11%)]">
      <div className="mx-auto grid max-w-[90rem] items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:py-32">
        <Reveal>
          <Kicker>{t.about.kicker}</Kicker>
          <Heading>{t.about.title}</Heading>
          <div className="mt-6 space-y-5 text-[0.95rem] leading-[1.85] text-foreground/70">
            <p className="first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-[hsl(var(--secondary))]">{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {t.about.stats.map(([n, label]) => (
              <div key={label}>
                <dt className="font-display text-2xl text-[hsl(var(--secondary))]">{n}</dt>
                <dd className="mt-1 text-xs leading-snug text-foreground/50">{label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative">
            <img src={IMG.interior} alt="Interior de Il Forno Nero con mesas de madera oscura y velas" className="h-[26rem] w-full object-cover sm:h-[34rem]" />
            <img src={IMG.dough} alt="Manos amasando masa madre" className="absolute -bottom-8 -left-6 hidden h-40 w-40 border-4 border-[hsl(24_16%_11%)] object-cover lg:block" />
            <div className="absolute -right-3 -top-3 hidden h-24 w-24 border-r border-t border-[hsl(var(--secondary))]/60 lg:block" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Gallery() {
  const { t } = useI18n();
  const shots = [IMG.margherita, IMG.nero, IMG.diavola, IMG.dough, IMG.wine, IMG.interior];
  return (
    <section id="galeria" className="mx-auto max-w-[90rem] px-5 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <Kicker>{t.gallery.kicker}</Kicker>
        <Heading>{t.gallery.title}</Heading>
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shots.map((src, i) => (
          <Reveal key={src} delay={0.05 * i}>
            <figure className={`group relative overflow-hidden ${i === 1 ? 'sm:row-span-2' : ''}`}>
              <img
                src={src}
                alt={t.gallery.caps[i]}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.05] ${i === 1 ? 'h-72 sm:h-[36.5rem]' : 'h-72'}`}
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-4 font-display text-lg italic text-foreground">
                {t.gallery.caps[i]}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Promos() {
  const { t } = useI18n();
  return (
    <section id="promociones" className="border-y border-border bg-[hsl(var(--primary))]/10">
      <div className="mx-auto max-w-[72rem] px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <Kicker>{t.promos.kicker}</Kicker>
          <Heading>{t.promos.title}</Heading>
        </Reveal>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {t.promos.items.map(([title, text], i) => (
            <Reveal key={title} delay={0.05 * i}>
              <div className="flex flex-col gap-2 py-7 md:flex-row md:items-baseline md:gap-10">
                <span className="font-display text-xs tracking-[0.2em] text-[hsl(var(--secondary))]">0{i + 1}</span>
                <h3 className="font-display text-2xl md:w-72">{title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-foreground/65">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const { t } = useI18n();
  return (
    <section id="resenas" className="mx-auto max-w-[80rem] px-5 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <Kicker>{t.reviews.kicker}</Kicker>
        <Heading>{t.reviews.title}</Heading>
      </Reveal>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {t.reviews.items.map(([text, name, role], i) => (
          <Reveal key={name} delay={0.07 * i}>
            <blockquote className="flex h-full flex-col border-t border-[hsl(var(--secondary))]/40 pt-6">
              <Quote className="h-6 w-6 text-[hsl(var(--secondary))]/70" strokeWidth={1.3} />
              <p className="mt-4 flex-1 font-display text-lg italic leading-relaxed text-foreground/85">{text}</p>
              <footer className="mt-6 text-sm">
                <span className="text-foreground">{name}</span>
                <span className="block text-xs text-foreground/45">{role}</span>
              </footer>
            </blockquote>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Reservation() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: '', date: '', time: '20:30', people: '2', notes: '' });
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.date || !form.time || !form.people) {
      setError(t.reserve.error);
      return;
    }
    setError('');
    setStatus('sending');
    try {
      const res = await apiServerClient.fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form_type: 'reservation',
          name: form.name,
          date: form.date,
          time: form.time,
          people: form.people,
          notes: form.notes,
        }),
      });
      if (!res.ok) throw new Error('error');
      setStatus('sent');
      setForm({ name: '', date: '', time: '20:30', people: '2', notes: '' });
    } catch {
      setStatus('error');
    }
  };

  const field = 'w-full border border-border bg-[hsl(22_18%_7%)] px-4 py-3 text-sm text-foreground outline-none transition focus:border-[hsl(var(--secondary))] placeholder:text-foreground/35';

  return (
    <section id="reservas" className="relative overflow-hidden border-y border-border">
      <img src={IMG.wine} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-background/85" />
      <div className="relative mx-auto grid max-w-[72rem] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Kicker>{t.reserve.kicker}</Kicker>
          <Heading>{t.reserve.title}</Heading>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground/65">{t.reserve.sub}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[hsl(var(--primary))]">{t.reserve.closed}</p>
          <div className="mt-8 space-y-2 text-sm text-foreground/60">
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-[hsl(var(--secondary))]" strokeWidth={1.5} /> {INFO.phone}</p>
            <p className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-[hsl(var(--secondary))]" strokeWidth={1.5} /> {INFO.whatsapp}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} className="grid gap-4 border border-border bg-[hsl(24_16%_12%)]/80 p-6 backdrop-blur sm:grid-cols-2 sm:p-8">
            <div className="sm:col-span-2 flex flex-col gap-2">
              <label htmlFor="r-name" className="text-xs uppercase tracking-[0.16em] text-foreground/55">{t.reserve.name}</label>
              <input id="r-name" className={field} value={form.name} onChange={set('name')} autoComplete="name" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="r-date" className="text-xs uppercase tracking-[0.16em] text-foreground/55">{t.reserve.date}</label>
              <input id="r-date" type="date" className={field} value={form.date} onChange={set('date')} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="r-time" className="text-xs uppercase tracking-[0.16em] text-foreground/55">{t.reserve.time}</label>
              <select id="r-time" className={field} value={form.time} onChange={set('time')}>
                {TIMES.map((h) => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="r-people" className="text-xs uppercase tracking-[0.16em] text-foreground/55">{t.reserve.people}</label>
              <select id="r-people" className={field} value={form.people} onChange={set('people')}>
                {Array.from({ length: 14 }, (_, i) => String(i + 1)).map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <label htmlFor="r-notes" className="text-xs uppercase tracking-[0.16em] text-foreground/55">{t.reserve.notes}</label>
              <textarea id="r-notes" rows={3} placeholder={t.reserve.notesPh} className={field} value={form.notes} onChange={set('notes')} />
            </div>
            {error && <p className="sm:col-span-2 text-sm text-[hsl(358_70%_65%)]">{error}</p>}
            {status === 'error' && <p className="sm:col-span-2 text-sm text-[hsl(358_70%_65%)]">{t.contact.ferror}</p>}
            {status === 'sent' && <p className="sm:col-span-2 text-sm text-[hsl(80_35%_75%)]">{t.contact.sent}</p>}
            <button type="submit" disabled={status === 'sending' || status === 'sent'} className="sm:col-span-2 mt-1 inline-flex min-h-[48px] items-center justify-center gap-2 bg-[hsl(var(--primary))] px-6 text-[0.78rem] uppercase tracking-[0.2em] text-[hsl(var(--primary-foreground))] transition hover:brightness-110 active:scale-[0.98] disabled:opacity-50">
              <MessageCircle className="h-4 w-4" strokeWidth={1.7} /> {status === 'sending' ? '...' : t.reserve.submit}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="mx-auto max-w-[62rem] px-5 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <Kicker>{t.faq.kicker}</Kicker>
        <Heading>{t.faq.title}</Heading>
      </Reveal>
      <div className="mt-10 divide-y divide-border border-y border-border">
        {t.faq.items.map(([q, a], i) => (
          <div key={q}>
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
              aria-expanded={open === i}
            >
              <span className="font-display text-lg sm:text-xl">{q}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 text-[hsl(var(--secondary))] transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} strokeWidth={1.5} />
            </button>
            {open === i && <p className="pb-6 pr-8 text-sm leading-relaxed text-foreground/65">{a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const valid = form.name.trim() && form.message.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!valid) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const res = await apiServerClient.fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form_type: 'contact',
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error('error');
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const field = 'w-full border border-border bg-[hsl(22_18%_7%)] px-4 py-3 text-sm outline-none transition focus:border-[hsl(var(--secondary))] placeholder:text-foreground/35';

  return (
    <section id="contacto" className="border-t border-border bg-[hsl(24_16%_11%)]">
      <div className="mx-auto max-w-[90rem] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <Kicker>{t.contact.kicker}</Kicker>
          <Heading>{t.contact.title}</Heading>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                [MapPin, t.contact.address, INFO.address, null],
                [Clock, t.contact.hours, t.contact.hoursVal, null],
                [Phone, t.contact.phone, INFO.phone, INFO.phoneHref],
                [MessageCircle, t.contact.whatsapp, INFO.whatsapp, `https://wa.me/${INFO.waNumber}`],
                [Mail, t.contact.email, INFO.email, `mailto:${INFO.email}`],
              ].map(([Icon, label, value, href]) => (
                <div key={label} className="border-t border-border pt-4">
                  <span className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-foreground/45">
                    <Icon className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" strokeWidth={1.6} /> {label}
                  </span>
                  {href ? (
                    <a href={href} className="mt-2 block whitespace-pre-line text-sm text-foreground hover:text-[hsl(var(--secondary))]">{value}</a>
                  ) : (
                    <p className="mt-2 whitespace-pre-line text-sm text-foreground/80">{value}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 overflow-hidden border border-border">
              <iframe
                title="Mapa Il Forno Nero"
                src="https://www.google.com/maps?q=Calle%20de%20la%20Reina%2014%2C%2028004%20Madrid&output=embed"
                className="h-72 w-full grayscale-[0.4]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <img src={IMG.facade} alt="Fachada de Il Forno Nero de noche en Calle de la Reina" className="h-56 w-full object-cover" loading="lazy" />
            <form onSubmit={submit} className="mt-6 grid gap-4 border border-border bg-[hsl(22_18%_9%)] p-6 sm:p-8">
              <h3 className="font-display text-2xl text-[hsl(var(--secondary))]">{t.contact.formTitle}</h3>
              <div className="flex flex-col gap-2">
                <label htmlFor="c-name" className="text-xs uppercase tracking-[0.16em] text-foreground/55">{t.contact.fname}</label>
                <input id="c-name" className={field} value={form.name} onChange={set('name')} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="c-email" className="text-xs uppercase tracking-[0.16em] text-foreground/55">{t.contact.femail}</label>
                <input id="c-email" type="email" className={field} value={form.email} onChange={set('email')} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="c-msg" className="text-xs uppercase tracking-[0.16em] text-foreground/55">{t.contact.fmsg}</label>
                <textarea id="c-msg" rows={4} className={field} value={form.message} onChange={set('message')} />
              </div>
              {status === 'error' && <p className="text-sm text-[hsl(358_70%_65%)]">{t.contact.ferror}</p>}
              {status === 'sent' && <p className="text-sm text-[hsl(80_35%_75%)]">{t.contact.sent}</p>}
              <button type="submit" disabled={status === 'sending' || status === 'sent'} className="mt-1 min-h-[48px] border border-[hsl(var(--secondary))] px-6 text-[0.78rem] uppercase tracking-[0.2em] text-[hsl(var(--secondary))] transition hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary-foreground))] active:scale-[0.98] disabled:opacity-50">
                {status === 'sending' ? '...' : t.contact.fsend}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BlogTeaser() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-[80rem] px-5 py-24 sm:px-8">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Kicker>{t.blog.kicker}</Kicker>
            <Heading>{t.blog.title}</Heading>
          </div>
          <Link to="/noticias" className="inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.2em] text-[hsl(var(--secondary))] hover:gap-3 transition-all">
            {t.blog.read} <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
          </Link>
        </div>
      </Reveal>
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {t.blog.posts.map((p, i) => (
          <Reveal key={p.t} delay={0.06 * i}>
            <article className="border-t border-[hsl(var(--secondary))]/40 pt-5">
              <span className="text-[0.65rem] uppercase tracking-[0.18em] text-[hsl(var(--primary))]">{p.tag}</span>
              <h3 className="mt-3 font-display text-xl leading-snug">{p.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/60">{p.x}</p>
              <time className="mt-4 block text-xs text-foreground/40">{p.d}</time>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Il Forno Nero | Pizzería Napoletana en Madrid Centro</title>
        <meta name="description" content="Auténtica pizza napolitana de masa madre en el corazón de Madrid. Reserva tu mesa en Il Forno Nero, Chueca." />
        <meta name="keywords" content="pizzería napolitana Madrid, pizza artesanal Madrid centro, mejor pizza Chueca Madrid, pizzería italiana auténtica Madrid" />
      </Helmet>
      <Hero />
      <Marquee />
      <MenuSection />
      <About />
      <Gallery />
      <Promos />
      <Reviews />
      <Reservation />
      <Faq />
      <BlogTeaser />
      <Contact />
    </>
  );
}
