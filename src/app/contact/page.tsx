import { siteConfig } from '@/config/site';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export const metadata = {
  title: 'Contact',
  description: 'Contact Vintage Mania: WhatsApp + Instagram.'
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-display text-5xl tracking-wide">Contact</h1>
      <p className="mt-3 text-bone/80">Pour une commande, une question taille, ou un drop: WhatsApp direct.</p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-forest/35 bg-ink/45 p-6">
          <div className="font-display text-3xl tracking-wide">WhatsApp</div>
          <p className="mt-2 text-sm text-bone/75">Le plus rapide. Message pré-rempli sur chaque produit.</p>
          <div className="mt-5">
            <WhatsAppButton className="w-full sm:w-auto">Écrire sur WhatsApp</WhatsAppButton>
          </div>
        </div>

        <div className="rounded-3xl border border-forest/35 bg-ink/45 p-6">
          <div className="font-display text-3xl tracking-wide">Instagram</div>
          <p className="mt-2 text-sm text-bone/75">Les previews du drop + stories. Suis-nous ici.</p>
          <div className="mt-5">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-xl border border-forest/45 bg-ink/40 px-5 py-3 text-sm font-extrabold text-bone transition hover:bg-ink/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acid sm:w-auto"
            >
              Ouvrir Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-3xl border border-forest/35 bg-ink/45 p-6">
        <div className="font-display text-3xl tracking-wide">Option e-mail</div>
        <p className="mt-2 text-sm text-bone/75">Si tu préfères, tu peux aussi envoyer un mail (sans formulaire serveur).</p>
        <div className="mt-5">
          <a
            href="mailto:vintagemania@example.com?subject=Contact%20Vintage%20Mania"
            className="inline-flex w-full items-center justify-center rounded-xl bg-sun px-5 py-3 text-sm font-extrabold text-ink transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun sm:w-auto"
          >
            Envoyer un mail
          </a>
        </div>
      </div>
    </div>
  );
}
