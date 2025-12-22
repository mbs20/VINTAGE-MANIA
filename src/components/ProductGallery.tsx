'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductImagePlaceholder } from './ProductImagePlaceholder';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(images?.[0] || '');

    // Ensure we have at least 3 slots for thumbnails
    const thumbnails = [...(images || []), ...Array(3)].slice(0, 3);
    const mainImage = selectedImage || images?.[0];

    return (
        <div className="grid gap-3">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-forest/25 bg-ink/70">
                {mainImage ? (
                    <Image
                        src={mainImage}
                        alt={productName}
                        width={1200}
                        height={1500}
                        priority
                        className="h-full w-full object-contain transition-opacity duration-300"
                    />
                ) : (
                    <ProductImagePlaceholder className="h-full w-full" />
                )}
            </div>

            <div className="grid grid-cols-3 gap-3">
                {thumbnails.map((src, i) => {
                    const isPlaceholder = !src || typeof src !== 'string';
                    return (
                        <button
                            key={i}
                            onClick={() => !isPlaceholder && setSelectedImage(src as string)}
                            className={cn(
                                "relative aspect-square overflow-hidden rounded-xl border bg-ink/70 transition",
                                isPlaceholder ? "cursor-default border-forest/25" : "cursor-pointer hover:opacity-80",
                                selectedImage === src ? "border-sun ring-1 ring-sun" : "border-forest/25"
                            )}
                            disabled={isPlaceholder}
                        >
                            {!isPlaceholder ? (
                                <Image
                                    src={src as string}
                                    alt={`${productName} ${i + 1}`}
                                    width={500}
                                    height={500}
                                    loading="lazy"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <ProductImagePlaceholder className="h-full w-full opacity-50" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
