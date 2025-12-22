'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // Simple cookie check
        const hasSession = document.cookie.includes('admin_session=true');
        if (!hasSession) {
            router.push('/admin');
        } else {
            setAuthorized(true);
        }
    }, [router]);

    if (!authorized) return null;

    return (
        <div className="min-h-screen bg-ink">
            <nav className="border-b border-forest/30 bg-ink/50 px-6 py-4">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    <Link href="/admin/dashboard" className="font-display text-xl text-bone">
                        Vintage Mania Admin
                    </Link>
                    <div className="flex gap-4">
                        <Link href="/" target="_blank" className="text-sm font-semibold text-acid hover:underline">
                            Voir le site
                        </Link>
                        <button
                            onClick={() => {
                                document.cookie = 'admin_session=; max-age=0; path=/';
                                router.push('/admin');
                            }}
                            className="text-sm font-semibold text-red-400 hover:underline"
                        >
                            Déconnexion
                        </button>
                    </div>
                </div>
            </nav>
            <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        </div>
    );
}
