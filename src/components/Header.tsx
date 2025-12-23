'use client';

import type { SVGProps } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { MobileMenu } from '@/components/MobileMenu';
import { cn } from '@/lib/utils';

const navLinks = [
    // ... existing links
    { href: '/catalogue', label: 'Catalogue' },
    { href: '/commander', label: 'Commander' },
    { href: '/livraison-faq', label: 'Livraison & FAQ' },
    { href: '/contact', label: 'Contact' }
];

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
            <path
                d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Z"
                stroke="currentColor"
                strokeWidth="1.6"
            />
            <path
                d="M12 16.2A4.2 4.2 0 1 0 12 7.8a4.2 4.2 0 0 0 0 8.4Z"
                stroke="currentColor"
                strokeWidth="1.6"
            />
            <path
                d="M17.4 6.6h.01"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function Header() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 border-b border-forest/20 bg-ink/90 shadow-xl shadow-ink/50 backdrop-blur-lg">
            <div className="mx-auto max-w-7xl">
                {/* Main Header Row - Better spacing */}
                <div className="flex items-center justify-between gap-8 px-6 py-4 lg:px-10 lg:py-5">
                    {/* Mobile: Menu Button */}
                    <div className="flex items-center md:hidden">
                        <MobileMenu />
                    </div>

                    {/* Logo Section with Neon Glow on Active */}
                    <Link
                        href="/"
                        className="group flex items-center gap-4 transition-all duration-300 active:scale-95"
                    >
                        {/* Logo Container with Neon Glow Effect */}
                        <div className="relative">
                            {/* Neon Glow Layer - Visible on hover/active */}
                            <div className="absolute -inset-1 rounded-2xl bg-acid/0 blur-md transition-all duration-300 group-hover:bg-acid/30 group-active:bg-acid/50" />

                            {/* Logo Box */}
                            <div className="relative overflow-hidden rounded-2xl border-2 border-forest/40 bg-gradient-to-br from-forest/40 via-ink to-forest/20 p-2 shadow-2xl shadow-forest/20 transition-all duration-300 group-hover:border-acid/50 group-hover:shadow-acid/20 group-active:border-acid group-active:shadow-acid/40">
                                <Image
                                    src="/logo-vintage-mania.png"
                                    alt="Vintage Mania"
                                    width={48}
                                    height={48}
                                    priority
                                    className="rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Brand Text */}
                        <div className="flex flex-col gap-0.5">
                            <div className="font-display text-2xl leading-none tracking-widest text-bone transition-colors group-hover:text-acid md:text-3xl">
                                VINTAGE <span className="text-acid transition-all group-hover:drop-shadow-[0_0_8px_rgba(92,255,92,0.6)]">MANIA</span>
                            </div>
                            <div className="hidden text-[10px] font-semibold uppercase tracking-[0.3em] text-bone/40 md:block">
                                Drops & Thrift • Maroc
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation - Pill Style with shadow */}
                    <nav className="hidden items-center gap-2 rounded-2xl border border-forest/30 bg-ink/60 px-3 py-2 shadow-lg shadow-ink/30 md:flex">
                        {navLinks.map((l) => {
                            const active = pathname === l.href;
                            return (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    className={cn(
                                        'relative rounded-xl px-5 py-2 text-sm font-semibold tracking-wide transition-all duration-300',
                                        active
                                            ? 'bg-acid/20 text-acid shadow-inner shadow-acid/10'
                                            : 'text-bone/60 hover:bg-forest/25 hover:text-bone'
                                    )}
                                >
                                    {l.label}
                                    {active && (
                                        <span className="absolute bottom-0.5 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-acid shadow-[0_0_10px_rgba(92,255,92,0.6)]" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Action Buttons - Right side with better spacing */}
                    <div className="flex items-center gap-4">
                        <a
                            href={siteConfig.instagramUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center rounded-xl border border-forest/30 bg-ink/50 p-3 text-bone/60 shadow-lg shadow-ink/20 transition-all duration-300 hover:border-acid/40 hover:bg-acid/10 hover:text-acid hover:shadow-acid/20"
                            aria-label="Instagram"
                        >
                            <InstagramIcon className="h-5 w-5" />
                        </a>
                        <div className="hidden md:block">
                            <WhatsAppButton>Commander</WhatsAppButton>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
