import Link from 'next/link';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export const metadata = {
    title: 'Commander',
    description: 'Comment commander une pièce Vintage Mania via WhatsApp.'
};

export default function CommanderPage() {
    return (
        <div className="mx-auto max-w-4xl px-4 py-12">
            <h1 className="font-display text-5xl tracking-wide">Commander</h1>
            <p className="mt-3 text-bone/80">Ultra simple. Pas de paiement en ligne: on confirme tout sur WhatsApp.</p>

            <div className="mt-8 grid gap-5">
                <div className="rounded-3xl border border-forest/35 bg-ink/45 p-6">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-bone/60">Étape 1</div>
                    <div className="mt-1 text-xl font-extrabold text-bone">Choisir un article</div>
                    <div className="mt-2 text-sm text-bone/75">Va sur le catalogue, filtre, clique une pièce pour voir les détails.</div>
                    <div className="mt-4">
                        <Link href="/catalogue?sort=new" className="text-sm font-semibold text-acid hover:underline">
                            Voir les nouveautés
                        </Link>
                    </div>
                </div>

                <div className="rounded-3xl border border-forest/35 bg-ink/45 p-6">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-bone/60">Étape 2</div>
                    <div className="mt-1 text-xl font-extrabold text-bone">Cliquer WhatsApp</div>
                    <div className="mt-2 text-sm text-bone/75">Le message est pré-rempli avec: nom, SKU, taille, prix.</div>
                </div>

                <div className="rounded-3xl border border-forest/35 bg-ink/45 p-6">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-bone/60">Étape 3</div>
                    <div className="mt-1 text-xl font-extrabold text-bone">Confirmer la livraison</div>
                    <div className="mt-2 text-sm text-bone/75">On confirme: disponibilité, adresse, ville, délai, et mode de livraison.</div>
                </div>
            </div>

            <div className="mt-10 rounded-3xl border border-sun/25 bg-gradient-to-b from-ink/40 to-ink p-8">
                <div className="font-display text-4xl tracking-wide">Règles rapides</div>
                <div className="mt-3 grid gap-3 text-sm text-bone/75">
                    <div>Pièces uniques: une fois vendue, elle ne revient pas.</div>
                    <div>Réservation: possible sur courte durée selon le drop.</div>
                    <div>Délais: variables selon la ville, confirmés sur WhatsApp.</div>
                </div>
                <div className="mt-6">
                    <WhatsAppButton className="w-full sm:w-auto">Ouvrir WhatsApp</WhatsAppButton>
                </div>
            </div>
        </div>
    );
}
