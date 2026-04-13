import {getTranslations, setRequestLocale} from 'next-intl/server';
import Link from 'next/link';
import Footer from '../components/Footer';
import {asset} from '../components/assetPath';

const BOT_LINK = 'https://t.me/web_snap_alert_bot';
const BRAND_NAME = 'SnapAlert';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export default async function LandingPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const otherLocale = locale === 'en' ? 'ua' : 'en';
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
            <img src={asset("/snapalert_logo.png")} alt={BRAND_NAME} width={32} height={32} className="rounded" />
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
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:max-w-7xl">
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
                  <img src={asset("/how-it-works-screenshots/step1.png")} alt={t('howItWorks.step1.screenshotAlt')} className="h-auto w-full object-cover" />
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
                  <img src={asset("/how-it-works-screenshots/step2.png")} alt={t('howItWorks.step2.screenshotAlt')} className="h-auto w-full object-cover" />
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
                  <img src={asset("/how-it-works-screenshots/step3.png")} alt={t('howItWorks.step3.screenshotAlt')} className="h-auto w-full object-cover" />
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ── Use Cases — Personal Use Grid ── */}
        <section id="use-cases" className="py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t('useCases.title')}</h2>
              <p className="mt-3 text-lg text-muted">{t('useCases.subtitle')}</p>
            </div>

            <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted">{t('useCases.sectionLabel')}</p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {([
                { key: 'restock', icon: <><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></> },
                { key: 'priceDrops', icon: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></> },
                { key: 'news', icon: <><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></> },
                { key: 'jobs', icon: <><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></> },
                { key: 'realEstate', icon: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></> },
                { key: 'grades', icon: <><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /><line x1="6" y1="8" x2="6" y2="8.01" /><line x1="18" y1="8" x2="18" y2="8.01" /></> },
                { key: 'restaurants', icon: <><path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></> },
                { key: 'scholarships', icon: <><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></> },
                { key: 'tickets', icon: <><path d="M2 9a3 3 0 013 3 3 3 0 01-3 3v4a2 2 0 002 2h16a2 2 0 002-2v-4a3 3 0 01-3-3 3 3 0 013-3V5a2 2 0 00-2-2H4a2 2 0 00-2 2z" /><line x1="9" y1="3" x2="9" y2="5" /><line x1="9" y1="9" x2="9" y2="11" /><line x1="9" y1="15" x2="9" y2="17" /><line x1="9" y1="19" x2="9" y2="21" /></> },
              ] as const).map(({ key, icon }, i) => (
                <article key={key} className="group flex items-start gap-4 rounded-2xl border border-card-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${i % 2 === 0 ? 'bg-primary/10' : 'bg-secondary/10'}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={i % 2 === 0 ? 'text-primary' : 'text-secondary'}>
                      {icon}
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{t(`useCases.${key}.title`)}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted">{t(`useCases.${key}.description`)}</p>
                  </div>
                </article>
              ))}
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

      <Footer locale={locale} />
    </>
  );
}
