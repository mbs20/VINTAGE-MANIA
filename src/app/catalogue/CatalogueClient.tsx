'use client';
// Force refresh

import type { ChangeEvent } from 'react';
import { useMemo, useState } from 'react';
import type { Product, ProductCategory } from '@/data/products';
import { Filters } from '@/components/Filters';
import type { CatalogueFilters } from '@/components/Filters';
import { applyFilters, applySort, type SortKey } from '@/lib/catalogue';
import { ProductCard } from '@/components/ProductCard';
import { ScrollReveal } from '@/components/ScrollReveal';
import Image from 'next/image';

const sortOptions: Array<{ value: SortKey; label: string }> = [
    { value: 'new', label: 'Nouveautés' },
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' }
];

export function CatalogueClient({
    products,
    initialSort = 'new',
    initialCategory
}: {
    products: Product[];
    initialSort?: SortKey;
    initialCategory?: ProductCategory;
}) {
    const [filters, setFilters] = useState<CatalogueFilters>({
        category: initialCategory
    });
    const [sort, setSort] = useState<SortKey>(initialSort);

    const filtered = useMemo(() => {
        const a = applyFilters(products, filters);
        return applySort(a, sort);
    }, [filters, sort]);

    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            {/* Banner Section */}
            <div className="mb-8 grid gap-6 lg:grid-cols-2 lg:items-center">
                <ScrollReveal direction="right">
                    <div className="overflow-hidden rounded-3xl border border-forest/35 shadow-2xl">
                        <Image
                            src="/catalogue-banner.jpg"
                            alt="Vintage Mania Store"
                            width={600}
                            height={600}
                            className="h-auto w-full object-cover"
                            priority
                        />
                    </div>
                </ScrollReveal>

                <ScrollReveal direction="left" delay={200}>
                    <Filters value={filters} onChange={setFilters} />

                    <div className="mt-4 rounded-2xl border border-forest/40 bg-ink/45 px-4 py-3">
                        <div className="text-xs font-extrabold uppercase tracking-wider text-bone/70">Trier</div>
                        <select
                            value={sort}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSort(e.target.value as SortKey)}
                            className="mt-2 w-full rounded-xl border border-forest/40 bg-ink/50 px-3 py-2 text-sm text-bone outline-none transition focus:border-acid/50"
                        >
                            {sortOptions.map((o) => (
                                <option key={o.value} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </ScrollReveal>
            </div>

            {/* Title Section */}
            <div className="mb-8">
                <h1 className="font-display text-4xl tracking-wide">Catalogue</h1>
                <p className="mt-2 max-w-2xl text-bone/75">
                    Clique une pièce pour voir les détails. Pour commander: bouton WhatsApp (message pré-rempli).
                </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p, i) => (
                    <ScrollReveal key={p.id} delay={i * 50} direction="up" className="h-full">
                        <ProductCard product={p} />
                    </ScrollReveal>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="mt-10 rounded-3xl border border-forest/35 bg-ink/45 p-8 text-center">
                    <div className="font-display text-3xl tracking-wide">Aucun résultat</div>
                    <div className="mt-2 text-bone/75">Essaye d’élargir les filtres (ou réinitialise).</div>
                </div>
            )}
        </div>
    );
}
