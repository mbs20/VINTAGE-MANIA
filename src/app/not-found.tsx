import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <div className="font-display text-6xl tracking-wide">404</div>
      <div className="mt-2 text-bone/80">Cette page n’existe pas (ou plus).</div>
      <div className="mt-6">
        <Link
          href="/catalogue"
          className="inline-flex items-center justify-center rounded-xl bg-acid px-5 py-3 text-sm font-extrabold text-ink transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acid"
        >
          Retour au catalogue
        </Link>
      </div>
    </div>
  );
}
