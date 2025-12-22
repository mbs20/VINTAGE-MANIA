'use client';

import type { SVGProps } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { buildWhatsAppLink } from '@/lib/whatsapp';

function IconBag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 8V7a5 5 0 0 1 10 0v1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M6 8h12l1 13H5L6 8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChat(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.6-4.8A8 8 0 1 1 21 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconInstagram(props: SVGProps<SVGSVGElement>) {
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

export function MobileBottomBar() {
  const whatsappHref = buildWhatsAppLink('Salam, je veux commander sur Vintage Mania.');

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-forest/35 bg-ink/80 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-3">
        <Link
          href="/catalogue"
          className="flex flex-col items-center justify-center gap-1 px-3 py-3 text-xs font-semibold text-bone/80"
        >
          <IconBag className="h-5 w-5" />
          Catalogue
        </Link>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center gap-1 px-3 py-3 text-xs font-semibold text-acid"
        >
          <IconChat className="h-5 w-5" />
          WhatsApp
        </a>
        <a
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center gap-1 px-3 py-3 text-xs font-semibold text-bone/80"
        >
          <IconInstagram className="h-5 w-5" />
          Instagram
        </a>
      </div>
    </div>
  );
}
