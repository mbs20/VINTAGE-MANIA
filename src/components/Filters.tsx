'use client';

import type { ChangeEvent, ReactNode } from 'react';
import { useMemo } from 'react';
import type { ProductCategory, ProductCondition } from '@/data/products';
import { categories } from '@/data/products';

export type CatalogueFilters = {
  category?: ProductCategory;
  size?: string;
  condition?: ProductCondition;
  availability?: 'available' | 'sold';
  minPrice?: string;
  maxPrice?: string;
};

type Props = {
  value: CatalogueFilters;
  onChange: (next: CatalogueFilters) => void;
};

function FieldLabel({ children }: { children: string }) {
  return <div className="text-xs font-extrabold uppercase tracking-wider text-bone/70">{children}</div>;
}

function Select({
  value,
  onChange,
  children
}: {
  value?: string;
  onChange: (v: string) => void;
  children: ReactNode;
}) {
  return (
    <select
      value={value ?? ''}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
      className="mt-2 w-full rounded-xl border border-forest/40 bg-ink/50 px-3 py-2 text-sm text-bone outline-none transition focus:border-acid/50"
    >
      {children}
    </select>
  );
}

function TextInput({
  value,
  onChange,
  placeholder
}: {
  value?: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <input
      value={value ?? ''}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      placeholder={placeholder}
      inputMode="numeric"
      className="mt-2 w-full rounded-xl border border-forest/40 bg-ink/50 px-3 py-2 text-sm text-bone outline-none transition focus:border-acid/50"
    />
  );
}

function Panel({ value, onChange }: Props) {
  const sizes = useMemo(
    () => ['S', 'M', 'L', 'XL', '40', '41', '42', '43', '44'],
    []
  );

  return (
    <div className="rounded-3xl border border-forest/35 bg-ink/45 p-5">
      <div className="flex items-center justify-between">
        <div className="font-display text-2xl tracking-wide">Filtres</div>
        <button
          type="button"
          onClick={() => onChange({})}
          className="rounded-lg border border-forest/40 bg-ink/40 px-3 py-1.5 text-xs font-bold text-bone/80 hover:bg-ink/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acid"
        >
          Réinitialiser
        </button>
      </div>

      <div className="mt-5 space-y-5">
        <div>
          <FieldLabel>Catégorie</FieldLabel>
          <Select
            value={value.category}
            onChange={(v) => onChange({ ...value, category: (v || undefined) as ProductCategory | undefined })}
          >
            <option value="">Toutes</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <FieldLabel>Taille</FieldLabel>
          <Select value={value.size} onChange={(v) => onChange({ ...value, size: v || undefined })}>
            <option value="">Toutes</option>
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <FieldLabel>État</FieldLabel>
          <Select
            value={value.condition}
            onChange={(v) => onChange({ ...value, condition: (v || undefined) as ProductCondition | undefined })}
          >
            <option value="">Tous</option>
            <option value="A">A (quasi neuf)</option>
            <option value="B">B (très bon)</option>
            <option value="C">C (vintage marqué)</option>
          </Select>
        </div>

        <div>
          <FieldLabel>Disponibilité</FieldLabel>
          <Select
            value={value.availability}
            onChange={(v) => onChange({ ...value, availability: (v || undefined) as CatalogueFilters['availability'] })}
          >
            <option value="">Tout</option>
            <option value="available">Disponible</option>
            <option value="sold">Sold out</option>
          </Select>
        </div>

        <div>
          <FieldLabel>Prix (DH)</FieldLabel>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <TextInput
              value={value.minPrice}
              onChange={(v) => onChange({ ...value, minPrice: v || undefined })}
              placeholder="Min"
            />
            <TextInput
              value={value.maxPrice}
              onChange={(v) => onChange({ ...value, maxPrice: v || undefined })}
              placeholder="Max"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Filters({ value, onChange }: Props) {
  return <Panel value={value} onChange={onChange} />;
}
