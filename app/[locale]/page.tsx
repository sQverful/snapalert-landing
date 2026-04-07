import {getTranslations, setRequestLocale} from 'next-intl/server';
import Link from 'next/link';

const BOT_LINK = 'https://t.me/web_snap_alert_bot';
const BRAND_NAME = 'SnapAlert';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export default async function LandingPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const otherLocale = locale === 'en' ? 'uk' : 'en';
  const otherLocaleLabel = locale === 'en' ? 'UA' : 'EN';

  const faqItems = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
  ];

  const trustItems = [
    { headline: t('trust.items.0.headline'), detail: t('trust.items.0.detail') },
    { headline: t('trust.items.1.headline'), detail: t('trust.items.1.detail') },
    { headline: t('trust.items.2.headline'), detail: t('trust.items.2.detail') },
    { headline: t('trust.items.3.headline'), detail: t('trust.items.3.detail') },
  ];

  const alphaFeatures = [
    t('pricing.alpha.features.0'),
    t('pricing.alpha.features.1'),
    t('pricing.alpha.features.2'),
    t('pricing.alpha.features.3'),
    t('pricing.alpha.features.4'),
    t('pricing.alpha.features.5'),
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: BRAND_NAME,
    description: t('meta.description'),
    url: `${siteUrl}/${locale}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(faqSchema)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(softwareSchema)}}
      />
      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 w-full border-b border-card-border bg-background/90 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href={`/${locale}`} className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-primary">
              <rect width="28" height="28" rx="6" fill="currentColor" fillOpacity="0.15" />
              <path d="M8 14l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{BRAND_NAME}</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#how-it-works" data-umami-event="nav-how-it-works" className="text-sm text-muted transition-colors hover:text-foreground">
              {t('nav.howItWorks')}
            </a>
            <a href="#use-cases" data-umami-event="nav-use-cases" className="text-sm text-muted transition-colors hover:text-foreground">
              {t('nav.useCases')}
            </a>
            <a href="#faq" data-umami-event="nav-faq" className="text-sm text-muted transition-colors hover:text-foreground">
              {t('nav.faq')}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/${otherLocale}`}
              className="rounded-md px-2.5 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-card hover:text-foreground"
            >
              {otherLocaleLabel}
            </Link>
            <a
              href={BOT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="nav-cta-start"
              className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover sm:inline-flex"
            >
              {t('nav.startFree')}
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden pb-20 pt-24 sm:pb-28 sm:pt-32">
          {/* Gradient blobs */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-primary/10 blur-[120px]" />
            <div className="absolute right-1/4 top-1/4 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-secondary/10 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="3" fill="currentColor" />
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>
              {t('hero.badge')}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              {t('hero.title')}
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('hero.titleHighlight')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {t('hero.subtitle')}
            </p>

            {/* Dual CTA */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={BOT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="hero-cta-start"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-primary/40"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
                {t('hero.cta')}
              </a>
              <a
                href="#how-it-works"
                data-umami-event="hero-cta-how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-card-border bg-card px-8 py-3.5 text-base font-semibold text-foreground transition-all hover:border-primary/30 hover:shadow-sm"
              >
                {t('hero.ctaSecondary')}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 8h8" /><path d="M8 4l4 4-4 4" />
                </svg>
              </a>
            </div>
            <span className="mt-4 inline-block text-sm text-muted">{t('hero.ctaSub')}</span>
          </div>
        </section>

        {/* ── Trust Bar ── */}
        <section className="border-y border-card-border bg-card/50 py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p className="mb-2 text-center text-sm font-medium uppercase tracking-wider text-muted">{t('trust.title')}</p>
            <p className="mb-8 text-center text-sm text-muted">{t('trust.subtitle')}</p>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {trustItems.map((item) => (
                <div key={item.headline} className="text-center">
                  <div className="text-base font-semibold tracking-tight text-foreground sm:text-lg">{item.headline}</div>
                  <div className="mt-1 text-sm text-muted">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section id="how-it-works" className="bg-card py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t('howItWorks.title')}</h2>
              <p className="mt-3 text-lg text-muted">{t('howItWorks.subtitle')}</p>
            </div>

            <div className="relative grid gap-8 md:grid-cols-3 md:gap-12">
              {/* Connecting line */}
              <div className="pointer-events-none absolute left-0 right-0 top-12 hidden h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent md:block" />

              {/* Step 1 */}
              <article className="relative flex flex-col items-center text-center">
                <div className="relative z-10 mb-5 flex h-24 w-24 items-center justify-center rounded-2xl border border-card-border bg-card shadow-sm">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                  </svg>
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">1</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{t('howItWorks.step1.title')}</h3>
                <p className="text-sm leading-relaxed text-muted">{t('howItWorks.step1.description')}</p>
                <div className="mt-4 w-full overflow-hidden rounded-xl border border-card-border bg-background">
                  <div className="flex h-48 items-center justify-center text-sm text-muted">
                    {t('howItWorks.step1.screenshotAlt')}
                  </div>
                </div>
              </article>

              {/* Step 2 */}
              <article className="relative flex flex-col items-center text-center">
                <div className="relative z-10 mb-5 flex h-24 w-24 items-center justify-center rounded-2xl border border-card-border bg-card shadow-sm">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
                    <path d="M12 2a4 4 0 014 4c0 1.95-2 4-4 6-2-2-4-4.05-4-6a4 4 0 014-4z" />
                    <path d="M12 18v4" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs font-bold text-white">2</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{t('howItWorks.step2.title')}</h3>
                <p className="text-sm leading-relaxed text-muted">{t('howItWorks.step2.description')}</p>
                <div className="mt-4 w-full overflow-hidden rounded-xl border border-card-border bg-background">
                  <div className="flex h-48 items-center justify-center text-sm text-muted">
                    {t('howItWorks.step2.screenshotAlt')}
                  </div>
                </div>
              </article>

              {/* Step 3 */}
              <article className="relative flex flex-col items-center text-center">
                <div className="relative z-10 mb-5 flex h-24 w-24 items-center justify-center rounded-2xl border border-card-border bg-card shadow-sm">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 01-3.46 0" />
                  </svg>
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">3</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{t('howItWorks.step3.title')}</h3>
                <p className="text-sm leading-relaxed text-muted">{t('howItWorks.step3.description')}</p>
                <div className="mt-4 w-full overflow-hidden rounded-xl border border-card-border bg-background">
                  <div className="flex h-48 items-center justify-center text-sm text-muted">
                    {t('howItWorks.step3.screenshotAlt')}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ── Use Cases — Bento Grid ── */}
        <section id="use-cases" className="py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t('useCases.title')}</h2>
              <p className="mt-3 text-lg text-muted">{t('useCases.subtitle')}</p>
            </div>

            {/* Bento 3-col grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Price Tracking — spans 2 cols */}
              <article className="group rounded-2xl border border-card-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md sm:col-span-2 sm:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{t('useCases.price.title')}</h3>
                <p className="text-sm leading-relaxed text-muted">{t('useCases.price.description')}</p>
                <a href={t('useCases.price.exampleUrl')} target="_blank" rel="noopener noreferrer"
                   data-umami-event="usecase-price"
                   className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  {t('useCases.price.exampleLabel')}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 9l4-4"/><path d="M5 5h4v4"/></svg>
                </a>
              </article>

              {/* Financial Reports */}
              <article className="group rounded-2xl border border-card-border bg-card p-6 transition-all hover:border-secondary/30 hover:shadow-md sm:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{t('useCases.finance.title')}</h3>
                <p className="text-sm leading-relaxed text-muted">{t('useCases.finance.description')}</p>
                <a href={t('useCases.finance.exampleUrl')} target="_blank" rel="noopener noreferrer"
                   data-umami-event="usecase-finance"
                   className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  {t('useCases.finance.exampleLabel')}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 9l4-4"/><path d="M5 5h4v4"/></svg>
                </a>
              </article>

              {/* SEC & IPO */}
              <article className="group rounded-2xl border border-card-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md sm:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{t('useCases.sec.title')}</h3>
                <p className="text-sm leading-relaxed text-muted">{t('useCases.sec.description')}</p>
                <a href={t('useCases.sec.exampleUrl')} target="_blank" rel="noopener noreferrer"
                   data-umami-event="usecase-sec"
                   className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  {t('useCases.sec.exampleLabel')}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 9l4-4"/><path d="M5 5h4v4"/></svg>
                </a>
              </article>

              {/* Government — spans 2 cols */}
              <article className="group rounded-2xl border border-card-border bg-card p-6 transition-all hover:border-secondary/30 hover:shadow-md sm:col-span-2 sm:p-8 lg:col-span-2">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
                    <path d="M3 21h18" /><path d="M5 21V7l7-4 7 4v14" /><path d="M9 21v-4h6v4" /><path d="M9 10h1" /><path d="M14 10h1" /><path d="M9 14h1" /><path d="M14 14h1" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{t('useCases.government.title')}</h3>
                <p className="text-sm leading-relaxed text-muted">{t('useCases.government.description')}</p>
                <a href={t('useCases.government.exampleUrl')} target="_blank" rel="noopener noreferrer"
                   data-umami-event="usecase-government"
                   className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  {t('useCases.government.exampleLabel')}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 9l4-4"/><path d="M5 5h4v4"/></svg>
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section id="pricing" className="bg-card py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t('pricing.title')}</h2>
              <p className="mt-3 text-lg text-muted">{t('pricing.subtitle')}</p>
            </div>

            <div className="flex justify-center">
              <article className="relative flex w-full max-w-[400px] flex-col rounded-2xl border border-primary/30 bg-card p-6 shadow-lg shadow-primary/10 sm:p-8">
                <h3 className="text-lg font-semibold text-foreground">{t('pricing.alpha.name')}</h3>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-foreground">{t('pricing.alpha.price')}</span>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {alphaFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0 text-primary">
                        <path d="M4 8l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={BOT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="pricing-cta-start"
                  className="mt-8 block rounded-xl bg-primary py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                  {t('pricing.cta')}
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="bg-footer-bg py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t('faq.title')}</h2>
              <p className="mt-3 text-lg text-muted">{t('faq.subtitle')}</p>
            </div>

            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-card-border bg-card transition-all hover:border-primary/30"
                >
                  <summary data-umami-event={`faq-item-${i + 1}`} className="flex items-center justify-between px-6 py-5 text-left text-base font-medium text-foreground">
                    {item.q}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-4 shrink-0 text-muted transition-transform group-open:rotate-45"
                    >
                      <line x1="10" y1="4" x2="10" y2="16" />
                      <line x1="4" y1="10" x2="16" y2="10" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-5 text-sm leading-relaxed text-muted">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-card-border bg-footer-bg">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-5">
            {/* Brand */}
            <div className="sm:col-span-2 md:col-span-1">
              <div className="mb-3 flex items-center gap-2 text-lg font-bold text-foreground">
                <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="text-primary">
                  <rect width="28" height="28" rx="6" fill="currentColor" fillOpacity="0.15" />
                  <path d="M8 14l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {BRAND_NAME}
              </div>
              <p className="text-sm text-muted">{t('footer.tagline')}</p>
            </div>

            {/* Product */}
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">{t('footer.product')}</h4>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="text-sm text-muted transition-colors hover:text-foreground">{t('footer.howItWorks')}</a></li>
                <li><a href="#use-cases" className="text-sm text-muted transition-colors hover:text-foreground">{t('footer.useCases')}</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">{t('footer.legal')}</h4>
              <ul className="space-y-2">
                <li><Link href={`/${locale}/privacy`} className="text-sm text-muted transition-colors hover:text-foreground">{t('footer.privacy')}</Link></li>
                <li><Link href={`/${locale}/terms`} className="text-sm text-muted transition-colors hover:text-foreground">{t('footer.terms')}</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">{t('footer.contact')}</h4>
              <ul className="space-y-2">
                <li><a href="mailto:snapalertdemo@gmail.com" className="text-sm text-muted transition-colors hover:text-foreground">{t('footer.contactEmail')}</a></li>
                <li><a href="https://linktr.ee/sqverful" target="_blank" rel="noopener noreferrer" className="text-sm text-muted transition-colors hover:text-foreground">Linktree</a></li>
              </ul>
            </div>

            {/* Language */}
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">Language</h4>
              <div className="flex gap-2">
                <Link
                  href="/en"
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${locale === 'en' ? 'bg-primary/15 text-primary' : 'text-muted hover:bg-card hover:text-foreground'}`}
                >
                  English
                </Link>
                <Link
                  href="/uk"
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${locale === 'uk' ? 'bg-primary/15 text-primary' : 'text-muted hover:bg-card hover:text-foreground'}`}
                >
                  Українська
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-10 border-t border-card-border pt-6 text-center text-sm text-muted">
            &copy; {new Date().getFullYear()} {BRAND_NAME}. {t('footer.rights')}
          </div>
        </div>
      </footer>
    </>
  );
}
