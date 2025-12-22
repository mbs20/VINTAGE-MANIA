import { cn } from '@/lib/utils';

type Props = {
  label: string;
  variant?: 'drop' | 'one' | 'sold';
  className?: string;
};

export function Badge({ label, variant = 'drop', className }: Props) {
  const v =
    variant === 'sold'
      ? 'border-steel/40 bg-ink/70 text-steel'
      : variant === 'one'
        ? 'border-sun/40 bg-ink/70 text-sun'
        : 'border-acid/40 bg-ink/70 text-acid';

  return (
    <span className={cn('inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide', v, className)}>
      {label}
    </span>
  );
}
