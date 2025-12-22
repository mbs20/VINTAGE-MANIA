'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'Vous livrez où ? ',
    a: 'On livre au Maroc. Dis-nous ta ville sur WhatsApp et on confirme la meilleure option.'
  },
  {
    q: 'Quels sont les délais ?',
    a: 'En général 24-72h selon la ville. On confirme le délai exact au moment de la commande.'
  },
  {
    q: 'Les retours sont possibles ?',
    a: 'Chaque pièce est vintage et unique. On discute au cas par cas selon l’état et le contexte.'
  },
  {
    q: 'Comment choisir la bonne taille ?',
    a: 'Regarde les mesures en cm sur la page produit. Si tu hésites, écris-nous sur WhatsApp.'
  }
];

function AccordionItem({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-forest/35 bg-ink/45">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <div className="text-sm font-extrabold text-bone">{title}</div>
        <div className="text-bone/70">{open ? '−' : '+'}</div>
      </button>
      {open ? <div className="px-5 pb-5 text-sm text-bone/75">{content}</div> : null}
    </div>
  );
}

export function LivraisonFaqClient() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-display text-5xl tracking-wide">Livraison & FAQ</h1>
      <p className="mt-3 text-bone/80">Infos simples, claires, et on finalise sur WhatsApp.</p>

      <div className="mt-8 grid gap-5">
        <div className="rounded-3xl border border-forest/35 bg-ink/45 p-6">
          <div className="font-display text-3xl tracking-wide">Zones livrées</div>
          <p className="mt-2 text-sm text-bone/75">Maroc (selon ville). Livraison confirmée au moment de la commande.</p>
        </div>

        <div className="rounded-3xl border border-forest/35 bg-ink/45 p-6">
          <div className="font-display text-3xl tracking-wide">Délais estimés</div>
          <p className="mt-2 text-sm text-bone/75">En moyenne 24-72h. On te donne le délai exact sur WhatsApp.</p>
        </div>

        <div className="rounded-3xl border border-forest/35 bg-ink/45 p-6">
          <div className="font-display text-3xl tracking-wide">Retours</div>
          <p className="mt-2 text-sm text-bone/75">On gère au cas par cas. L’objectif: zéro surprise (état + défauts annoncés).</p>
        </div>
      </div>

      <div className="mt-10">
        <div className="font-display text-3xl tracking-wide">FAQ</div>
        <div className="mt-5 grid gap-3">
          {faqs.map((f) => (
            <AccordionItem key={f.q} title={f.q} content={f.a} />
          ))}
        </div>
      </div>
    </div>
  );
}
