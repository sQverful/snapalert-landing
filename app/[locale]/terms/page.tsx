import {getTranslations, setRequestLocale} from 'next-intl/server';
import Link from 'next/link';
import type {Metadata} from 'next';
import Footer from '../../components/Footer';

const BRAND_NAME = 'SnapAlert';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'terms'});
  return {
    title: `${t('title')} — ${BRAND_NAME}`,
    description: t('description'),
  };
}

export default async function TermsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('terms');

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-card-border bg-background/90 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href={`/${locale}`} className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
            <img src="/snapalert_logo.png" alt={BRAND_NAME} width={32} height={32} className="rounded" />
            <span>{BRAND_NAME}</span>
          </Link>
          <Link href={`/${locale}`} className="text-sm text-muted transition-colors hover:text-foreground">
            {t('backHome')}
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t('title')}</h1>
        <p className="mt-2 text-sm text-muted">{t('lastUpdated')}</p>

        <div className="mt-10 space-y-10 text-sm leading-relaxed text-foreground/80">
          {/* Intro */}
          <section>
            <p>{t('intro')}</p>
          </section>

          {/* Service description */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">{t('service.title')}</h2>
            <p>{t('service.description')}</p>
          </section>

          {/* Alpha status */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">{t('alpha.title')}</h2>
            <p>{t('alpha.description')}</p>
          </section>

          {/* Acceptable use */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">{t('acceptable.title')}</h2>
            <p className="mb-3">{t('acceptable.intro')}</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>{t('acceptable.item1')}</li>
              <li>{t('acceptable.item2')}</li>
              <li>{t('acceptable.item3')}</li>
              <li>{t('acceptable.item4')}</li>
            </ul>
          </section>

          {/* Monitoring limits */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">{t('limits.title')}</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>{t('limits.item1')}</li>
              <li>{t('limits.item2')}</li>
              <li>{t('limits.item3')}</li>
            </ul>
          </section>

          {/* Monitored content */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">{t('content.title')}</h2>
            <p>{t('content.description')}</p>
          </section>

          {/* Availability */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">{t('availability.title')}</h2>
            <p>{t('availability.description')}</p>
          </section>

          {/* Limitation of liability */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">{t('liability.title')}</h2>
            <p>{t('liability.description')}</p>
          </section>

          {/* Account termination */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">{t('termination.title')}</h2>
            <p>{t('termination.description')}</p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">{t('changes.title')}</h2>
            <p>{t('changes.description')}</p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">{t('contact.title')}</h2>
            <p>
              {t('contact.description')}{' '}
              <a href="mailto:snapalertdemo@gmail.com" className="text-primary hover:underline">snapalertdemo@gmail.com</a>
            </p>
          </section>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
