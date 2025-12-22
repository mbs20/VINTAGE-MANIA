import type { Product } from '@/data/products';
import type { CatalogueFilters } from '@/components/Filters';

export type SortKey = 'new' | 'price-asc' | 'price-desc';

export function applyFilters(items: Product[], filters: CatalogueFilters) {
  return items.filter((p) => {
    if (filters.category && p.category !== filters.category) return false;
    if (filters.size && p.size !== filters.size) return false;
    if (filters.condition && p.condition !== filters.condition) return false;

    if (filters.availability === 'available' && p.isSoldOut) return false;
    if (filters.availability === 'sold' && !p.isSoldOut) return false;

    const min = filters.minPrice ? Number(filters.minPrice) : undefined;
    const max = filters.maxPrice ? Number(filters.maxPrice) : undefined;

    if (Number.isFinite(min) && min !== undefined && p.price < min) return false;
    if (Number.isFinite(max) && max !== undefined && p.price > max) return false;

    return true;
  });
}

export function applySort(items: Product[], sort: SortKey) {
  const sorted = [...items];

  if (sort === 'new') {
    sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    return sorted;
  }

  if (sort === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
    return sorted;
  }

  sorted.sort((a, b) => b.price - a.price);
  return sorted;
}
