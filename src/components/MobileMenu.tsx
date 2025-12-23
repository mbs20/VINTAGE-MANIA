'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
    { href: '/catalogue', label: 'Catalogue' },
    { href: '/commander', label: 'Commander' },
    { href: '/livraison-faq', label: 'Livraison & FAQ' },
    { href: '/contact', label: 'Contact' }
];

export function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Vintage "Tag" Button */}
            <button
                onClick={toggle}
                className="group relative flex h-10 items-center justify-center gap-2 rounded-lg border-2 border-forest/50 bg-forest/10 px-3 transition-all active:scale-95"
                aria-label="Menu"
            >
                {/* Dot graphic to look like a price tag hole */}
                <div className="h-2 w-2 rounded-full bg-acid shadow-[0_0_8px_rgba(92,255,92,0.5)]" />
                <span className="font-display text-sm tracking-widest text-acid">MENU</span>

                {/* Vintage "Stitch" border effect */}
                <div className="absolute inset-0 -m-[2px] rounded-lg border border-dashed border-acid/30 pointer-events-none" />
            </button>

            {/* Backdrop + Drawer - Only render when open */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-[60] bg-ink/80 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Menu Drawer */}
                    <div className="fixed inset-y-0 left-0 z-[70] w-[280px] border-r-4 border-forest/30 bg-ink paper grain animate-slide-in">
                        <div className="flex h-full flex-col p-6">
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between border-b-2 border-forest/20 pb-6">
                                <div className="font-display text-3xl tracking-tighter text-acid">NAVIGATION</div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest/20 text-bone hover:text-acid"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 stroke-current stroke-2">
                                        <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>

                            {/* Links */}
                            <nav className="mt-10 flex flex-col gap-4">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "relative overflow-hidden rounded-xl border-2 px-6 py-4 transition-all duration-300 active:scale-95",
                                                isActive
                                                    ? "border-acid bg-acid/10 text-acid shadow-[0_0_20px_rgba(92,255,92,0.1)]"
                                                    : "border-forest/30 bg-forest/5 text-bone/70 hover:border-forest/60 hover:text-bone"
                                            )}
                                        >
                                            <div className="font-display text-2xl tracking-wide uppercase">{link.label}</div>
                                            {isActive && (
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                                    <div className="h-2 w-2 rounded-full bg-acid animate-pulse" />
                                                </div>
                                            )}
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Footer / Info */}
                            <div className="mt-auto rounded-2xl border border-forest/20 bg-forest/5 p-4">
                                <div className="text-[10px] uppercase tracking-[0.3em] text-bone/40">Thrift & Vintage Mania</div>
                                <div className="mt-1 font-display text-lg text-bone/70">STOCK LIMITÉ</div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
