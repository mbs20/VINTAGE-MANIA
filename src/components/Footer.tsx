import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export function Footer() {
  return (
    <footer className="border-t border-forest/35 bg-ink/60">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logo-vintage-mania.png"
                alt="Vintage Mania"
                width={44}
                height={44}
                className="rounded-lg"
              />
              <div>
                <div className="font-display text-2xl tracking-wide">Vintage Mania</div>
                <div className="text-sm text-bone/70">Thrift / vintage • drops réguliers</div>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm text-bone/75">Catalogue en ligne, commande simple via WhatsApp. Pas de paiement en ligne.</p>
            <div className="mt-5">
              <WhatsAppButton>Commander sur WhatsApp</WhatsAppButton>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-semibold text-bone">Pages</div>
              <div className="mt-3 flex flex-col gap-2 text-sm text-bone/75">
                <Link href="/catalogue" className="transition-colors duration-300 hover:text-acid hover:underline">
                  Catalogue
                </Link>
                <Link href="/commander" className="transition-colors duration-300 hover:text-acid hover:underline">
                  Commander
                </Link>
                <Link href="/livraison-faq" className="transition-colors duration-300 hover:text-acid hover:underline">
                  Livraison & FAQ
                </Link>
                <Link href="/contact" className="transition-colors duration-300 hover:text-acid hover:underline">
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-bone">Réseaux</div>
              <div className="mt-3 flex flex-col gap-2 text-sm text-bone/75">
                <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-bone hover:underline">
                  Instagram
                </a>
                <a href="/catalogue?sort=new" className="hover:text-bone hover:underline">
                  Nouveautés
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-forest/35 bg-ink/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-bone">Badge</div>
                <div className="mt-1 text-sm text-bone/75">Old-school, propre, efficace.</div>
              </div>
              <Image src="/logo-badge.svg" alt="Badge" width={72} height={72} />
            </div>
            <div className="mt-4 text-sm text-bone/75">
              Besoin d’une mesure ou d’un conseil taille ? Écris-nous directement.
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-forest/35 pt-6 text-xs text-bone/60 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Vintage Mania. Tous droits réservés.</div>
          <div>Commande via WhatsApp • {siteConfig.city}</div>
        </div>
      </div>
    </footer>
  );
}
