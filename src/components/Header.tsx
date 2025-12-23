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
        <header className="sticky top-0 z-50 border-b border-forest/30 bg-ink/85 backdrop-blur-md">
            <div className="mx-auto max-w-7xl">
                {/* Main Header Row */}
                <div className="flex items-center justify-between px-4 py-2 lg:px-8">
                    {/* Mobile: Menu Button */}
                    <div className="flex flex-1 items-center md:hidden">
                        <MobileMenu />
                    </div>

                    {/* Logo Section */}
                    <Link
                        href="/"
                        className="group flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-95"
                    >
                        <div className="relative overflow-hidden rounded-xl border border-forest/30 bg-gradient-to-br from-forest/30 to-ink p-1.5 shadow-lg shadow-forest/10">
                            <Image
                                src="/logo-vintage-mania.png"
                                alt="Vintage Mania"
                                width={42}
                                height={42}
                                priority
                                className="rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="font-display text-xl leading-tight tracking-wider text-bone md:text-2xl">
                                VINTAGE <span className="text-acid">MANIA</span>
                            </div>
                            <div className="hidden text-[9px] font-medium uppercase tracking-[0.25em] text-bone/50 md:block">
                                Drops & Thrift Maroc
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation - Centered */}
                    <nav className="hidden items-center gap-1 rounded-full border border-forest/25 bg-ink/50 px-2 py-1.5 md:flex">
                        {navLinks.map((l) => {
                            const active = pathname === l.href;
                            return (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    className={cn(
                                        'relative rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300',
                                        active
                                            ? 'bg-acid/15 text-acid'
                                            : 'text-bone/70 hover:bg-forest/20 hover:text-bone'
                                    )}
                                >
                                    {l.label}
                                    {active && (
                                        <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-acid" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Action Buttons - Right side */}
                    <div className="flex flex-1 items-center justify-end gap-3">
                        <a
                            href={siteConfig.instagramUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center justify-center rounded-full border border-forest/40 bg-ink/50 p-2.5 text-bone/70 transition-all hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-pink-400"
                            aria-label="Instagram"
                        >
                            <InstagramIcon className="h-4 w-4" />
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
