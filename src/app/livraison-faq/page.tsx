import type { Metadata } from 'next';
import { LivraisonFaqClient } from './LivraisonFaqClient';

export const metadata: Metadata = {
  title: 'Livraison & FAQ',
  description: 'Infos livraison et réponses rapides avant de commander.'
};

export default function LivraisonFaqPage() {
  return <LivraisonFaqClient />;
}
