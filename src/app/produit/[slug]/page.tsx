import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/db';
import { ProductCard } from '@/components/ProductCard';
import { StickerBadge } from '@/components/StickerBadge';
import { buildProductWhatsAppMessage, formatPrice } from '@/lib/whatsapp';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ProductImagePlaceholder } from '@/components/ProductImagePlaceholder';
import { ProductGallery } from '@/components/ProductGallery';
import { ScrollReveal } from '@/components/ScrollReveal';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const product = await getProductBySlug(params.slug);
    if (!product) return {};

    return {
        title: `${product.name} • ${product.category}`,
        description: `${product.name} — ${formatPrice(product.price)} • Taille ${product.size} • État ${product.condition}. Commande via WhatsApp.`,
        openGraph: {
            title: `${product.name} • ${product.category}`,
            description: `${product.name} — ${formatPrice(product.price)}. Commande via WhatsApp.`
        }
    };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
    const product = await getProductBySlug(params.slug);
    if (!product) return notFound();

    const message = buildProductWhatsAppMessage({
        name: product.name,
        sku: product.sku,
        size: product.size,
        price: product.price
    });

    const allProducts = await getProducts();
    const similar = allProducts
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            <ScrollReveal>
                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="rounded-3xl border border-forest/35 bg-ink/45 p-4">
                        <ProductGallery images={product.images} productName={product.name} />
                    </div>

                    <div>
                        <ScrollReveal direction="left" delay={200}>
                            <div className="flex flex-wrap items-center gap-2">
                                {product.isSoldOut ? (
                                    <StickerBadge tone="sold">SOLD OUT</StickerBadge>
                                ) : (
                                    <>
                                        {product.isNew && <StickerBadge tone="acid">DROP</StickerBadge>}
                                        {product.isOneOfOne && <StickerBadge tone="sun">ONE OF ONE</StickerBadge>}
                                    </>
                                )}
                            </div>

                            <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-wide">{product.name}</h1>
                            <div className="mt-3 text-2xl font-extrabold text-sun">{formatPrice(product.price)}</div>

                            <div className="mt-6 rounded-3xl border border-forest/35 bg-ink/45 p-6">
                                <div className="grid gap-4 text-sm text-bone/80">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="rounded-2xl border border-forest/35 bg-ink/40 p-4">
                                            <div className="text-xs font-extrabold uppercase tracking-wider text-bone/60">Taille</div>
                                            <div className="mt-1 font-semibold text-bone">{product.size}</div>
                                        </div>
                                        <div className="rounded-2xl border border-forest/35 bg-ink/40 p-4">
                                            <div className="text-xs font-extrabold uppercase tracking-wider text-bone/60">État</div>
                                            <div className="mt-1 font-semibold text-bone">{product.condition}</div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-xs font-extrabold uppercase tracking-wider text-bone/60">Mesures</div>
                                        <div className="mt-1">{product.measurements}</div>
                                    </div>

                                    <div>
                                        <div className="text-xs font-extrabold uppercase tracking-wider text-bone/60">Description</div>
                                        <div className="mt-1">{product.description}</div>
                                    </div>

                                    {product.defects ? (
                                        <div>
                                            <div className="text-xs font-extrabold uppercase tracking-wider text-bone/60">Défauts</div>
                                            <div className="mt-1">{product.defects}</div>
                                        </div>
                                    ) : null}
                                </div>

                                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                    {product.isSoldOut ? (
                                        <div className="flex-1 rounded-xl border border-steel/35 bg-ink/60 px-5 py-3 text-center text-sm font-semibold text-steel">
                                            Plus disponible
                                        </div>
                                    ) : (
                                        <WhatsAppButton className="flex-1" message={message}>
                                            Commander sur WhatsApp
                                        </WhatsAppButton>
                                    )}
                                    <Link
                                        href={`/catalogue?category=${encodeURIComponent(product.category)}`}
                                        className="inline-flex flex-1 items-center justify-center rounded-xl border border-forest/50 bg-ink/40 px-5 py-3 text-sm font-extrabold text-bone transition hover:bg-ink/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acid"
                                    >
                                        Voir d’autres {product.category}
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </ScrollReveal>

            <section className="mt-14">
                <ScrollReveal delay={400}>
                    <div className="flex items-end justify-between gap-6">
                        <div>
                            <h2 className="font-display text-3xl tracking-wide">Produits similaires</h2>
                            <p className="mt-2 text-bone/75">Même vibe, même catégorie.</p>
                        </div>
                        <Link href="/catalogue" className="text-sm font-semibold text-acid hover:underline">
                            Retour au catalogue
                        </Link>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {similar.map((p, i) => (
                            <ScrollReveal key={p.id} delay={i * 100} direction="up" className="h-full">
                                <ProductCard product={p} />
                            </ScrollReveal>
                        ))}
                    </div>
                </ScrollReveal>
            </section>
        </div>
    );
}
