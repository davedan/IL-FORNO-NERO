import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n, INFO } from '@/i18n';

export default function SiteFooter() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-[hsl(24_16%_10%)]">
      <div className="mx-auto grid max-w-[72rem] gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <div className="font-display text-2xl tracking-[0.18em] text-[hsl(var(--secondary))]">IL FORNO</div>
          <div className="font-display text-2xl italic tracking-[0.3em]">NERO</div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground/55">{t.footer.tag}</p>
        </div>
        <div>
          <h3 className="text-[0.7rem] uppercase tracking-[0.22em] text-foreground/45">{t.footer.nav}</h3>
          <ul className="mt-4 space-y-2 text-sm text-foreground/75">
            <li><Link className="hover:text-[hsl(var(--secondary))]" to="/">{t.nav.home}</Link></li>
            <li><Link className="hover:text-[hsl(var(--secondary))]" to="/delivery">{t.nav.delivery}</Link></li>
            <li><Link className="hover:text-[hsl(var(--secondary))]" to="/noticias">{t.nav.blog}</Link></li>
            <li><a className="hover:text-[hsl(var(--secondary))]" href={`mailto:${INFO.email}`}>{INFO.email}</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-[0.7rem] uppercase tracking-[0.22em] text-foreground/45">{t.footer.find}</h3>
          <address className="mt-4 space-y-2 text-sm not-italic leading-relaxed text-foreground/75">
            <p>{INFO.address}</p>
            <p><a className="hover:text-[hsl(var(--secondary))]" href={INFO.phoneHref}>{INFO.phone}</a></p>
            <p className="whitespace-pre-line text-foreground/55">{t.contact.hoursVal}</p>
          </address>
        </div>
      </div>
      <div className="gold-rule" />
      <div className="mx-auto flex max-w-[72rem] flex-col gap-2 px-5 py-6 text-xs text-foreground/40 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span>© {year} {INFO.name}. {t.footer.rights}</span>
        <span>{t.footer.legal}</span>
      </div>
    </footer>
  );
}
