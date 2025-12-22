import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  tone?: 'acid' | 'sun' | 'muted' | 'sold';
  className?: string;
};

export function StickerBadge({ children, tone = 'muted', className }: Props) {
  const toneClasses =
    tone === 'acid'
      ? 'bg-acid text-ink'
      : tone === 'sun'
        ? 'bg-sun text-ink'
        : tone === 'sold'
          ? 'bg-steel text-ink'
          : 'bg-beige text-ink';

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-[14px] px-3 py-1 text-xs font-extrabold tracking-wide shadow-sticker ring-1 ring-ink/20 rotate-[-2deg]',
        toneClasses,
        className
      )}
    >
      {children}
    </span>
  );
}
