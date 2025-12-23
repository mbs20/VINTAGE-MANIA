'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { categories, Product } from '@/data/products';
import Image from 'next/image';

interface ProductFormProps {
    initialData?: Partial<Product>;
    onSuccess?: () => void;
}

export function ProductForm({ initialData, onSuccess }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<Partial<Product>>({
        name: '',
        price: 0,
        category: 'T-Shirts',
        size: 'M',
        condition: 'A',
        description: '',
        measurements: '',
        defects: '',
        isNew: true,
        isOneOfOne: true,
        isSoldOut: false,
        images: [],
        ...initialData
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            setLoading(true);
            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();

            if (data.url) {
                setForm(prev => ({
                    ...prev,
                    images: [...(prev.images || []), data.url]
                }));
            }
        } catch (err) {
            console.error(err);
            alert('Erreur upload');
        } finally {
            setLoading(false);
        }
    };

    const removeImage = (index: number) => {
        setForm(prev => ({
            ...prev,
            images: prev.images?.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/admin/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                router.refresh();
                if (onSuccess) onSuccess();
                else alert('Produit enregistré !');
            } else {
                alert('Erreur lors de l\'enregistrement');
            }
        } catch (err) {
            console.error(err);
            alert('Erreur');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-forest/30 bg-ink/40 p-6">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-semibold text-bone/70">Nom du produit</label>
                        <input
                            required
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-forest/40 bg-ink/60 px-3 py-2 text-bone"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-bone/70">Prix (DH)</label>
                            <input
                                required
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-forest/40 bg-ink/60 px-3 py-2 text-bone"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-bone/70">Taille</label>
                            <input
                                required
                                name="size"
                                value={form.size}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-forest/40 bg-ink/60 px-3 py-2 text-bone"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-bone/70">Catégorie</label>
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-forest/40 bg-ink/60 px-3 py-2 text-bone"
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-bone/70">État</label>
                            <select
                                name="condition"
                                value={form.condition}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-forest/40 bg-ink/60 px-3 py-2 text-bone"
                            >
                                <option value="A">A (Excellent)</option>
                                <option value="B">B (Bon)</option>
                                <option value="C">C (Correct)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-semibold text-bone/70">Description</label>
                        <textarea
                            required
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full rounded-xl border border-forest/40 bg-ink/60 px-3 py-2 text-bone"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-semibold text-bone/70">Mesures (ex: Épaules 50cm...)</label>
                        <input
                            required
                            name="measurements"
                            value={form.measurements}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-forest/40 bg-ink/60 px-3 py-2 text-bone"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-semibold text-bone/70">Défauts (optionnel)</label>
                        <input
                            name="defects"
                            value={form.defects}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-forest/40 bg-ink/60 px-3 py-2 text-bone"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3 rounded-xl border border-forest/40 bg-ink/60 p-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="isNew"
                                checked={form.isNew}
                                onChange={handleChange}
                                className="h-4 w-4 rounded accent-acid"
                            />
                            <label className="text-sm font-semibold text-bone">Nouveauté (Drop)</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="isOneOfOne"
                                checked={form.isOneOfOne}
                                onChange={handleChange}
                                className="h-4 w-4 rounded accent-sun"
                            />
                            <label className="text-sm font-semibold text-bone">Pièce unique (1/1)</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="isSoldOut"
                                checked={form.isSoldOut}
                                onChange={handleChange}
                                className="h-4 w-4 rounded accent-red-500"
                            />
                            <label className="text-sm font-semibold text-bone">Vendu / Sold Out</label>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-bone/70">Images</label>
                        <div className="grid grid-cols-3 gap-2">
                            {form.images?.map((src, i) => (
                                <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-lg border border-forest/30">
                                    <Image src={src} alt="" fill className="object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(i)}
                                        className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            <label className="flex aspect-[3/4] cursor-pointer items-center justify-center rounded-lg border border-dashed border-forest/50 bg-ink/30 hover:bg-ink/50">
                                <span className="text-2xl text-bone/50">+</span>
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                            </label>
                        </div>
                        {loading && <p className="mt-2 text-xs text-acid">Chargement...</p>}
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-forest/30">
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-acid px-6 py-2 font-bold text-ink hover:brightness-110 disabled:opacity-50"
                >
                    {loading ? 'Enregistrement...' : 'Enregistrer le produit'}
                </button>
            </div>
        </form>
    );
}
