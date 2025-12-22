'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'jamalvintage2025') {
            document.cookie = 'admin_session=true; path=/; max-age=86400';
            router.push('/admin/dashboard');
        } else {
            setError('Mot de passe incorrect');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-ink p-4">
            <div className="w-full max-w-md rounded-2xl border border-forest/30 bg-ink/50 p-8 shadow-2xl">
                <h1 className="mb-6 font-display text-3xl text-bone">Admin Panel</h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-bone/70">Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full rounded-xl border border-forest/40 bg-ink/60 px-4 py-2 text-bone outline-none focus:border-acid"
                            placeholder="••••••"
                        />
                    </div>

                    {error && <div className="text-sm text-red-400">{error}</div>}

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-acid px-4 py-3 font-bold text-ink hover:brightness-110"
                    >
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    );
}
