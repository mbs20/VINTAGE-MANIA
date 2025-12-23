'use client';

import { useState, type SVGProps } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/catalogue', label: 'Catalogue' },
  { href: '/commander', label: 'Commander' },
  { href: '/livraison-faq', label: 'Livraison & FAQ' },
  { href: '/contact', label: 'Contact' }
];

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 16.2A4.2 4.2 0 1 0 12 7.8a4.2 4.2 0 0 0 0 8.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M17.4 6.6h.01"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-forest/35 bg-ink/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center px-4 py-3 md:justify-between">
        {/* Mobile: Left side (Menu button) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-1 items-center md:hidden outline-none"
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest/20 text-acid/80 transition-transform active:scale-90">
            {isMenuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 stroke-current stroke-2">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 stroke-current stroke-2">
                <path d="M4 6h16M4 12h16m-7 6h7" strokeLinecap="round" />
              </svg>
            )}
          </div>
        </button>

        {/* Logo Section - Centered on Mobile, Left on Desktop */}
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-2 md:gap-3 transition-transform active:scale-95"
        >
          <div className="relative overflow-hidden rounded-xl bg-forest/20 p-1">
            <Image
              src="/logo-vintage-mania.png"
              alt="Vintage Mania"
              width={38}
              height={38}
              priority
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-center text-center md:text-left">
            <div className="font-display text-xl sm:text-2xl leading-none tracking-wide text-acid">VINTAGE MANIA</div>
            <div className="hidden text-[10px] uppercase tracking-[0.2em] text-bone/50 sm:block">Drops & Thrift</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:text-acid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acid',
                  active ? 'bg-forest/40 text-bone' : 'text-bone/80 hover:bg-ink/60'
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons - Right side */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center rounded-xl border border-forest/50 bg-ink/40 p-2 text-bone/80 transition hover:bg-ink/60 hover:text-acid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acid"
            aria-label="Instagram"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <div className="hidden md:block">
            <WhatsAppButton>WhatsApp</WhatsAppButton>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 top-[65px] z-40 bg-ink/95 backdrop-blur-xl transition-all duration-300 md:hidden flex flex-col items-center justify-center overflow-hidden",
          isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
        )}
      >
        <nav className="flex flex-col items-center gap-8 p-6">
          {navLinks.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "font-display text-4xl tracking-widest transition-all duration-300",
                pathname === l.href ? "text-acid scale-110" : "text-bone/60 hover:text-bone"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {l.label}
            </Link>
          ))}

          <div className="mt-8 flex flex-col items-center gap-6">
            <WhatsAppButton onClick={() => setIsMenuOpen(false)}>Commander via WhatsApp</WhatsAppButton>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-bone/70 hover:text-acid"
            >
              <InstagramIcon className="h-7 w-7" />
              <span className="font-semibold tracking-wide">vintage.mania.ma</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
