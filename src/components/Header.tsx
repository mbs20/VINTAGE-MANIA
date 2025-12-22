'use client';

import type { SVGProps } from 'react';
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

  return (
    <header className="sticky top-0 z-50 border-b border-forest/35 bg-ink/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-vintage-mania.png"
            alt="Vintage Mania"
            width={44}
            height={44}
            priority
            className="rounded-lg"
          />
          <div className="hidden sm:block">
            <div className="font-display text-2xl leading-none tracking-wide">Vintage Mania</div>
            <div className="text-xs text-bone/70">Drops thrift / vintage</div>
          </div>
        </Link>

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

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center justify-center rounded-xl border border-forest/50 bg-ink/40 p-2 text-bone/80 transition hover:bg-ink/60 hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acid md:inline-flex"
            aria-label="Instagram"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <div className="hidden md:block">
            <WhatsAppButton>WhatsApp</WhatsAppButton>
          </div>
        </div>
      </div>
    </header>
  );
}
