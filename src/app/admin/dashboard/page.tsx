'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/data/products';
import { ProductForm } from './product-form';
import Image from 'next/image';
import { formatPrice } from '@/lib/whatsapp';

export default function DashboardPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

    const fetchProducts = async () => {
        const res = await fetch('/api/admin/products');
        const data = await res.json();
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Supprimer ce produit ?')) return;

        await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
        fetchProducts();
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSuccess = () => {
        setShowForm(false);
        setEditingProduct(undefined);
        fetchProducts();
    };

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <h1 className="font-display text-3xl text-bone">Tableau de bord</h1>
                <button
                    onClick={() => {
                        setEditingProduct(undefined);
                        setShowForm(!showForm);
                    }}
                    className="rounded-xl bg-acid px-5 py-2 font-bold text-ink hover:brightness-110"
                >
                    {showForm ? 'Fermer' : 'Ajouter un produit'}
                </button>
            </div>

            {showForm && (
                <div className="mb-10">
                    <h2 className="mb-4 text-xl font-bold text-bone">
                        {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
                    </h2>
                    <ProductForm initialData={editingProduct} onSuccess={handleSuccess} />
                </div>
            )}

            <div className="grid gap-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="flex items-center gap-4 rounded-xl border border-forest/30 bg-ink/40 p-4 transition hover:bg-ink/60"
                    >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-ink/80">
                            {product.images?.[0] && (
                                <Image src={product.images[0]} alt="" fill className="object-cover" />
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="font-bold text-bone truncate">{product.name}</div>
                            <div className="text-sm text-bone/60">
                                {product.category} • {product.size} • {formatPrice(product.price)}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(product)}
                                className="rounded-lg border border-forest/50 px-3 py-1 text-sm font-semibold text-bone hover:bg-forest/20"
                            >
                                Editer
                            </button>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="rounded-lg bg-red-500/10 px-3 py-1 text-sm font-semibold text-red-400 hover:bg-red-500/20"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}

                {products.length === 0 && !showForm && (
                    <div className="rounded-xl border border-forest/30 p-8 text-center text-bone/60">
                        Aucun produit. Cliquez sur &quot;Ajouter un produit&quot; pour commencer.
                    </div>
                )}
            </div>
        </div>
    );
}
