import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

function HangerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 5c0-1.7 1.4-3 3.1-3 1.6 0 2.9 1.1 2.9 2.7 0 1.1-.6 2-1.6 2.5l-3 1.4c-.7.3-1.4 1-1.4 1.9v.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M4.5 15.2 11 10.8c.6-.4 1.4-.4 2 0l6.5 4.4c.9.6.5 2-.6 2H5.1c-1.1 0-1.5-1.4-.6-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProductImagePlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-forest/40 via-ink/60 to-ink ring-1 ring-forest/30',
        className
      )}
    >
      <div className="flex flex-col items-center gap-2 text-bone/70">
        <HangerIcon className="h-9 w-9" />
        <div className="text-xs font-semibold">Photo bientôt</div>
      </div>
    </div>
  );
}
