'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  message?: string;
  variant?: 'primary' | 'secondary';
};

export function WhatsAppButton({
  children,
  message = 'Salam, je veux commander sur Vintage Mania.',
  variant = 'primary',
  className,
  ...rest
}: Props) {
  const href = buildWhatsAppLink(message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-extrabold transition-all duration-300 hover:scale-[1.03] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        variant === 'primary'
          ? 'bg-acid text-ink hover:brightness-110 focus-visible:outline-acid'
          : 'border border-forest/50 bg-ink/40 text-bone hover:bg-ink/65 focus-visible:outline-sun',
        className
      )}
      {...rest}
    >
      <span className="h-2 w-2 rounded-full bg-sun" />
      {children}
    </a>
  );
}
