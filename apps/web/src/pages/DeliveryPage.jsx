import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import { useI18n, INFO } from '@/i18n';
import { Reveal, Kicker, Heading } from '@/components/Section';

const HERO = 'https://images.hostinger.com/5267ed01-5467-474b-b569-159afc6742c6.png';

export default function DeliveryPage() {
  const { t } = useI18n();
  const waHref = `https://wa.me/${INFO.waNumber}?text=${encodeURIComponent(t.delivery.waMsg)}`;

  return (
    <>
      <Helmet>
        <title>Delivery y recogida | Il Forno Nero Madrid</title>
        <meta name="description" content="Pide tu pizza napolitana a domicilio en Chueca, Justicia, Malasaña y Salesas llamando al 910 456 782 o por WhatsApp. Sin apps ni carrito." />
      </Helmet>

      <section className="relative flex min-h-[62vh] items-end overflow-hidden">
        <img src={HERO} alt="Pizza Diavola recién horneada lista para llevar" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/50" />
        <div className="relative mx-auto w-full max-w-[72rem] px-5 pb-16 pt-40 sm:px-8">
          <Kicker>{t.delivery.kicker}</Kicker>
          <h1 className="mt-4 font-display text-[2.8rem] leading-[1] sm:text-6xl">{t.delivery.title}</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/70">{t.delivery.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={INFO.phoneHref} className="inline-flex min-h-[48px] items-center gap-2 bg-[hsl(var(--primary))] px-6 text-[0.78rem] uppercase tracking-[0.2em] text-[hsl(var(--primary-foreground))] transition hover:brightness-110 active:scale-[0.98]">
              <Phone className="h-4 w-4" strokeWidth={1.7} /> {t.delivery.call}
            </a>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] items-center gap-2 border border-[hsl(var(--secondary))] px-6 text-[0.78rem] uppercase tracking-[0.2em] text-[hsl(var(--secondary))] transition hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary-foreground))] active:scale-[0.98]">
              <MessageCircle className="h-4 w-4" strokeWidth={1.7} /> {t.delivery.wa}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[72rem] px-5 py-20 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="space-y-5 text-[0.95rem] leading-[1.85] text-foreground/70">
              <p>{t.delivery.p1}</p>
              <p>{t.delivery.p2}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-5 border border-border bg-[hsl(24_16%_12%)] p-6">
              {[
                [MapPin, t.delivery.zone, t.delivery.zoneVal],
                [Clock, t.delivery.min, t.delivery.minVal],
                [Phone, t.contact.phone, INFO.phone],
                [MessageCircle, t.contact.whatsapp, INFO.whatsapp],
              ].map(([Icon, label, value]) => (
                <div key={label} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <span className="flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.18em] text-foreground/45">
                    <Icon className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" strokeWidth={1.6} /> {label}
                  </span>
                  <p className="mt-1.5 text-sm text-foreground/85">{value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {t.delivery.steps.map(([n, title, text], i) => (
            <Reveal key={n} delay={0.05 * i}>
              <div className="h-full bg-background p-7">
                <span className="font-display text-3xl text-[hsl(var(--secondary))]/70">{n}</span>
                <h3 className="mt-4 font-display text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/" className="text-[0.75rem] uppercase tracking-[0.2em] text-[hsl(var(--secondary))] hover:underline underline-offset-4">
            {t.common.backHome}
          </Link>
        </div>
      </section>
    </>
  );
}
