import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';
import { getProducts } from '@/lib/db';
import { categories } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { CategoryCard } from '@/components/CategoryCard';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ScrollReveal } from '@/components/ScrollReveal';

export default async function HomePage() {
  const allProducts = await getProducts();
  const newest = allProducts
    .filter((p) => p.isNew)
    .slice(0, 8);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-forest/30">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <ScrollReveal direction="right" className="relative z-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-sun/30 bg-ink/60 px-4 py-2 text-sm text-bone/80">
                <span className="h-2 w-2 animate-pulse rounded-full bg-acid shadow-[0_0_20px_rgba(92,255,92,0.45)]" />
                Drop en cours • pièces limitées
              </div>

              <h1 className="mt-5 font-display text-5xl leading-[0.95] tracking-wide text-bone md:text-6xl">
                Pièces vintage uniques • Drops réguliers
              </h1>

              <p className="mt-4 max-w-xl text-base text-bone/80 md:text-lg">
                Des trouvailles thrift sélectionnées, contrôlées et prêtes à porter. Tu choisis, tu cliques, on confirme sur WhatsApp.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/catalogue?sort=new"
                  className="inline-flex items-center justify-center rounded-xl bg-acid px-5 py-3 font-semibold text-ink transition duration-300 hover:-translate-y-1 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acid"
                >
                  Voir les nouveautés
                </Link>
                <WhatsAppButton variant="secondary">Commander via WhatsApp</WhatsAppButton>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-4 text-sm text-bone/70 md:max-w-xl">
                <div className="rounded-xl border border-forest/35 bg-ink/50 p-4 transition duration-300 hover:border-sun/50">
                  <div className="font-semibold text-bone">Pièces uniques</div>
                  <div className="mt-1">Quand c’est vendu, c’est vendu.</div>
                </div>
                <div className="rounded-xl border border-forest/35 bg-ink/50 p-4 transition duration-300 hover:border-sun/50">
                  <div className="font-semibold text-bone">Commande rapide</div>
                  <div className="mt-1">WhatsApp, confirmation, livraison.</div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={200} className="relative">
              <div className="animate-float mx-auto w-full max-w-sm rounded-[28px] border border-sun/25 bg-gradient-to-b from-forest/30 via-ink/50 to-ink p-6 shadow-2xl backdrop-blur-sm">
                <div className="mx-auto flex w-full max-w-[280px] items-center justify-center">
                  <Image
                    src="/logo-badge.svg"
                    alt="Vintage Mania"
                    width={280}
                    height={280}
                    priority
                    className="drop-shadow-[0_0_30px_rgba(92,255,92,0.2)]"
                  />
                </div>
                <div className="mt-5 rounded-2xl border border-forest/35 bg-ink/60 p-4 text-sm text-bone/80">
                  <div className="font-semibold text-bone">Style thrift / street</div>
                  <div className="mt-1">Grunge propre, pièces fortes, fits faciles.</div>
                </div>
              </div>
              <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 animate-pulse rounded-full bg-sun/20 blur-2xl decoration-clone" />
              <div className="pointer-events-none absolute -bottom-6 -left-10 h-28 w-28 animate-pulse rounded-full bg-acid/10 blur-2xl delay-1000" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <ScrollReveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl tracking-wide">Nouveautés (Drop)</h2>
              <p className="mt-2 text-bone/75">Les pièces les plus récentes. Premier arrivé, premier servi.</p>
            </div>
            <Link href="/catalogue?sort=new" className="text-sm font-semibold text-acid hover:underline">
              Voir tout
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {newest.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 100} direction="up" className="h-full">
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="border-y border-forest/30 bg-ink/40">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <ScrollReveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="font-display text-3xl tracking-wide">Catégories</h2>
                <p className="mt-2 text-bone/75">Choisis ton mood du moment.</p>
              </div>
              <Link href="/catalogue" className="text-sm font-semibold text-sun hover:underline">
                Parcourir le catalogue
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {categories.map((c, i) => (
                <ScrollReveal key={c} delay={i * 50} direction="up">
                  <CategoryCard category={c} />
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-3xl tracking-wide">Pourquoi Vintage Mania ?</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-2xl border border-forest/35 bg-ink/55 p-5">
            <div className="font-semibold text-bone">Authenticité</div>
            <p className="mt-2 text-sm text-bone/75">Sélection vintage/thrift avec vrai caractère.</p>
          </div>
          <div className="rounded-2xl border border-forest/35 bg-ink/55 p-5">
            <div className="font-semibold text-bone">Pièces uniques</div>
            <p className="mt-2 text-sm text-bone/75">Beaucoup de “one of one”. Pas de restock.</p>
          </div>
          <div className="rounded-2xl border border-forest/35 bg-ink/55 p-5">
            <div className="font-semibold text-bone">Contrôle état</div>
            <p className="mt-2 text-sm text-bone/75">État et défauts annoncés clairement.</p>
          </div>
          <div className="rounded-2xl border border-forest/35 bg-ink/55 p-5">
            <div className="font-semibold text-bone">Livraison simple</div>
            <p className="mt-2 text-sm text-bone/75">Commande WhatsApp, confirmation, envoi.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-forest/30 bg-ink/40">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl tracking-wide">FAQ rapide</h2>
              <p className="mt-2 text-bone/75">L’essentiel avant de commander.</p>
              <div className="mt-7 flex flex-col gap-3">
                <div className="rounded-2xl border border-forest/35 bg-ink/55 p-5">
                  <div className="font-semibold text-bone">Livraison</div>
                  <p className="mt-2 text-sm text-bone/75">On confirme la ville, l’adresse et le délai sur WhatsApp.</p>
                </div>
                <div className="rounded-2xl border border-forest/35 bg-ink/55 p-5">
                  <div className="font-semibold text-bone">Tailles</div>
                  <p className="mt-2 text-sm text-bone/75">Regarde les mesures (cm) sur la page produit. Besoin d’aide ? WhatsApp.</p>
                </div>
                <div className="rounded-2xl border border-forest/35 bg-ink/55 p-5">
                  <div className="font-semibold text-bone">Retours</div>
                  <p className="mt-2 text-sm text-bone/75">Chaque pièce est unique : on discute au cas par cas selon l’état.</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-sun/25 bg-gradient-to-b from-ink/40 to-ink p-8">
              <div className="font-display text-4xl tracking-wide">Prêt pour le drop ?</div>
              <p className="mt-3 text-bone/80">Passe au catalogue, choisis ta pièce, et clique WhatsApp pour réserver.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/catalogue?sort=new"
                  className="inline-flex items-center justify-center rounded-xl bg-sun px-5 py-3 font-semibold text-ink transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun"
                >
                  Voir le drop
                </Link>
                <Link
                  href="/commander"
                  className="inline-flex items-center justify-center rounded-xl border border-forest/50 bg-ink/40 px-5 py-3 font-semibold text-bone transition hover:bg-ink/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acid"
                >
                  Comment commander
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
