import Link from 'next/link';
import {getTranslations} from 'next-intl/server';
import ContactEmail from './ContactEmail';
import {asset} from './assetPath';

const BRAND_NAME = 'SnapAlert';

export default async function Footer({locale}: {locale: string}) {
  const t = await getTranslations('footer');

  return (
    <footer className="border-t border-card-border bg-footer-bg">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-5">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="mb-3 flex items-center gap-2 text-lg font-bold text-foreground">
              <img src={asset("/snapalert_logo.png")} alt={BRAND_NAME} width={24} height={24} className="rounded" />
              {BRAND_NAME}
            </div>
            <p className="text-sm text-muted">{t('tagline')}</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">{t('product')}</h4>
            <ul className="space-y-2">
              <li><Link href={`/${locale}#how-it-works`} className="text-sm text-muted transition-colors hover:text-foreground">{t('howItWorks')}</Link></li>
              <li><Link href={`/${locale}#use-cases`} className="text-sm text-muted transition-colors hover:text-foreground">{t('useCases')}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">{t('legal')}</h4>
            <ul className="space-y-2">
              <li><Link href={`/${locale}/privacy`} className="text-sm text-muted transition-colors hover:text-foreground">{t('privacy')}</Link></li>
              <li><Link href={`/${locale}/terms`} className="text-sm text-muted transition-colors hover:text-foreground">{t('terms')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">{t('contact')}</h4>
            <ul className="space-y-2">
              <li><ContactEmail label={t('contactEmail')} /></li>
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
                href="/ua"
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${locale === 'ua' ? 'bg-primary/15 text-primary' : 'text-muted hover:bg-card hover:text-foreground'}`}
              >
                Українська
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-card-border pt-6 text-center text-sm text-muted">
          &copy; {new Date().getFullYear()} {BRAND_NAME}. {t('rights')}
        </div>
      </div>
    </footer>
  );
}
