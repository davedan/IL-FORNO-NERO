import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n';
import { Reveal, Kicker } from '@/components/Section';

const COVERS = [
  'https://images.hostinger.com/569fd2f0-8dad-46a2-915a-aa536605226b.png',
  'https://images.hostinger.com/161cae1b-fb49-46dc-9743-508f76b01f69.png',
  'https://images.hostinger.com/1c3e9407-d0ba-4059-a58c-4bb92661df5b.png',
];

export default function BlogPage() {
  const { t } = useI18n();

  return (
    <>
      <Helmet>
        <title>Noticias y eventos | Il Forno Nero Madrid</title>
        <meta name="description" content="Cenas a cuatro manos, pizzas de temporada y el cuidado de nuestra masa madre: las novedades de Il Forno Nero en Chueca, Madrid." />
      </Helmet>

      <section className="mx-auto max-w-[72rem] px-5 pb-10 pt-36 sm:px-8 sm:pt-44">
        <Kicker>{t.blog.kicker}</Kicker>
        <h1 className="mt-4 font-display text-[2.8rem] leading-[1] sm:text-6xl">{t.blog.title}</h1>
      </section>

      <section className="mx-auto max-w-[72rem] px-5 pb-24 sm:px-8">
        <div className="divide-y divide-border border-y border-border">
          {t.blog.posts.map((p, i) => (
            <Reveal key={p.t} delay={0.05 * i}>
              <article className="grid gap-6 py-10 md:grid-cols-[18rem_1fr] md:items-start">
                <img src={COVERS[i % COVERS.length]} alt={p.t} className="h-48 w-full object-cover md:h-40" loading="lazy" />
                <div>
                  <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.18em]">
                    <span className="text-[hsl(var(--primary))]">{p.tag}</span>
                    <span className="text-foreground/35">{p.d}</span>
                  </div>
                  <h2 className="mt-3 font-display text-2xl leading-snug sm:text-3xl">{p.t}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/65">{p.x}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link to="/" className="text-[0.75rem] uppercase tracking-[0.2em] text-[hsl(var(--secondary))] underline-offset-4 hover:underline">
            {t.common.backHome}
          </Link>
        </div>
      </section>
    </>
  );
}
