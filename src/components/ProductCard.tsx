import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/products';
import { buildProductWhatsAppMessage } from '@/lib/whatsapp';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Badge } from '@/components/Badge';
import { StickerBadge } from '@/components/StickerBadge';
import { ProductImagePlaceholder } from '@/components/ProductImagePlaceholder';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/whatsapp';

export function ProductCard({ product, className }: { product: Product; className?: string }) {
    const message = buildProductWhatsAppMessage({
        name: product.name,
        sku: product.sku,
        size: product.size,
        price: product.price
    });

    return (
        <div className={cn('group rounded-3xl border border-forest/35 bg-ink/45 p-4 transition hover:border-sun/30 hover:bg-ink/60', className)}>
            <div className="relative">
                <Link href={`/produit/${product.slug}`} className="block">
                    <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-forest/25 bg-ink/70">
                        {product.images?.[0] ? (
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                width={800}
                                height={1000}
                                className="h-full w-full object-cover transition duration-500 will-change-transform group-hover:scale-105"
                                loading="lazy"
                            />
                        ) : (
                            <ProductImagePlaceholder className="h-full w-full" />
                        )}
                    </div>
                </Link>

                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    {product.isSoldOut ? (
                        <StickerBadge tone="sold">SOLD OUT</StickerBadge>
                    ) : (
                        <>
                            {product.isNew && <StickerBadge tone="acid">DROP</StickerBadge>}
                            {product.isOneOfOne && <StickerBadge tone="sun">ONE OF ONE</StickerBadge>}
                        </>
                    )}
                </div>
            </div>

            <div className="mt-4">
                <div className="flex items-start justify-between gap-3">
                    <Link href={`/produit/${product.slug}`} className="font-semibold text-bone hover:underline">
                        {product.name}
                    </Link>
                    <div className="text-sm font-extrabold text-sun">{formatPrice(product.price)}</div>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge label={`Taille ${product.size}`} variant="drop" className="text-bone/80 border-forest/40" />
                    <Badge label={`État ${product.condition}`} variant="one" className="text-bone/80 border-forest/40" />
                </div>

                <div className="mt-4">
                    {product.isSoldOut ? (
                        <div className="rounded-xl border border-steel/35 bg-ink/60 px-4 py-3 text-center text-sm font-semibold text-steel">
                            Plus disponible
                        </div>
                    ) : (
                        <WhatsAppButton message={message} className="w-full">
                            Commander sur WhatsApp
                        </WhatsAppButton>
                    )}
                </div>
            </div>
        </div>
    );
}
