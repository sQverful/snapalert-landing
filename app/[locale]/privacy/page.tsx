import {getTranslations, setRequestLocale} from 'next-intl/server';
import Link from 'next/link';
import type {Metadata} from 'next';
import Footer from '../../components/Footer';

const BRAND_NAME = 'SnapAlert';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'privacy'});
  return {
    title: `${t('title')} — ${BRAND_NAME}`,
    description: t('description'),
  };
}

export default async function PrivacyPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('privacy');

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

          {/* What we collect */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">{t('collect.title')}</h2>
            <p className="mb-3">{t('collect.intro')}</p>

            <h3 className="mb-2 mt-4 text-base font-semibold text-foreground">{t('collect.telegram.title')}</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>{t('collect.telegram.item1')}</li>
              <li>{t('collect.telegram.item2')}</li>
              <li>{t('collect.telegram.item3')}</li>
            </ul>

            <h3 className="mb-2 mt-4 text-base font-semibold text-foreground">{t('collect.monitoring.title')}</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>{t('collect.monitoring.item1')}</li>
              <li>{t('collect.monitoring.item2')}</li>
              <li>{t('collect.monitoring.item3')}</li>
              <li>{t('collect.monitoring.item4')}</li>
            </ul>

            <h3 className="mb-2 mt-4 text-base font-semibold text-foreground">{t('collect.landing.title')}</h3>
            <p>{t('collect.landing.description')}</p>
          </section>

          {/* How we use */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">{t('use.title')}</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>{t('use.item1')}</li>
              <li>{t('use.item2')}</li>
              <li>{t('use.item3')}</li>
              <li>{t('use.item4')}</li>
            </ul>
          </section>

          {/* Third-party services */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">{t('thirdParty.title')}</h2>
            <p className="mb-3">{t('thirdParty.intro')}</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>{t('thirdParty.item1')}</li>
              <li>{t('thirdParty.item2')}</li>
              <li>{t('thirdParty.item3')}</li>
            </ul>
            <p className="mt-3">{t('thirdParty.note')}</p>
          </section>

          {/* Data storage */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">{t('storage.title')}</h2>
            <p>{t('storage.description')}</p>
          </section>

          {/* No cookies */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">{t('cookies.title')}</h2>
            <p>{t('cookies.description')}</p>
          </section>

          {/* Your rights */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">{t('rights.title')}</h2>
            <p className="mb-3">{t('rights.intro')}</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>{t('rights.item1')}</li>
              <li>{t('rights.item2')}</li>
              <li>{t('rights.item3')}</li>
            </ul>
            <p className="mt-3">{t('rights.contact')}</p>
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
