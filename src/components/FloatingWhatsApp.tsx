'use client';

import type { SVGProps } from 'react';
import { buildWhatsAppLink } from '@/lib/whatsapp';

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M20.2 11.8A8.2 8.2 0 1 1 7.2 5.2a8.2 8.2 0 0 1 13 6.6Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8.2 18.4 4 20l1.6-4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M10.1 8.8c0 3.8 4.9 6.4 6.5 6.4.4 0 .7-.1 1-.4l.9-1.1c.2-.3.1-.7-.2-.9l-1.6-1c-.3-.2-.7-.1-.9.2l-.6.7c-.2.2-.5.3-.8.2-1-.3-2.9-1.6-3.5-2.7-.2-.3-.1-.6.1-.8l.7-.7c.2-.2.3-.6.1-.9l-.9-1.7c-.2-.3-.6-.4-.9-.2l-1.2.9c-.3.2-.4.6-.4 1Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

export function FloatingWhatsApp() {
  const href = buildWhatsAppLink('Salam, je veux commander sur Vintage Mania.');

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-[76px] right-4 z-50 inline-flex items-center gap-2 rounded-full bg-acid px-4 py-3 text-sm font-extrabold text-ink shadow-[0_14px_40px_rgba(0,0,0,0.45)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acid md:bottom-6"
      aria-label="Ouvrir WhatsApp"
    >
      <WhatsAppIcon className="h-5 w-5" />
      WhatsApp
    </a>
  );
}
