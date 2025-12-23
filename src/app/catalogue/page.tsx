import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
import { categories } from '@/data/products';
import type { ProductCategory } from '@/data/products';
import type { SortKey } from '@/lib/catalogue';
import { CatalogueClient } from './CatalogueClient';

export const metadata: Metadata = {
  title: 'Catalogue',
  description: 'Catalogue Vintage Mania: filtres, tri, pièces uniques. Commande via WhatsApp.'
};

import { getProducts } from '@/lib/db';

export default async function CataloguePage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const products = await getProducts();
  const sortParam = typeof searchParams.sort === 'string' ? searchParams.sort : undefined;
  const initialSort: SortKey =
    sortParam === 'price-asc' || sortParam === 'price-desc' || sortParam === 'new' ? sortParam : 'new';

  const categoryParam = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const initialCategory: ProductCategory | undefined = categoryParam
    ? (categories.includes(categoryParam as ProductCategory) ? (categoryParam as ProductCategory) : undefined)
    : undefined;

  return <CatalogueClient products={products} initialSort={initialSort} initialCategory={initialCategory} />;
}
