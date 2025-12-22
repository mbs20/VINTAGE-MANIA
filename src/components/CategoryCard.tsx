import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ProductCategory } from '@/data/products';

const accentByCategory: Record<ProductCategory, string> = {
  Pantalons: 'from-forest/45 to-ink/60',
  Tricots: 'from-beige/25 to-ink/60',
  'T-Shirts': 'from-acid/15 to-ink/60',
  Jackets: 'from-sun/18 to-ink/60',
  Boots: 'from-leather/35 to-ink/60',
  Spadri: 'from-steel/25 to-ink/60',
  Cuir: 'from-leather/30 to-ink/60',
  Chemises: 'from-beige/20 to-ink/60'
};

export function CategoryCard({ category, className }: { category: ProductCategory; className?: string }) {
  return (
    <Link
      href={`/catalogue?category=${encodeURIComponent(category)}`}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-forest/35 bg-ink/50 p-4 transition hover:border-sun/30 hover:bg-ink/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acid',
        className
      )}
    >
      <div className={cn('pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80', accentByCategory[category])} />
      <div className="relative">
        <div className="font-display text-2xl tracking-wide">{category}</div>
        <div className="mt-1 text-xs text-bone/75">Voir les pièces</div>
      </div>
      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-acid/10 blur-2xl transition group-hover:bg-acid/15" />
    </Link>
  );
}
