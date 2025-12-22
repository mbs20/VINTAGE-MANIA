# Vintage Mania

Site catalogue + commande via WhatsApp (pas de paiement en ligne).

## Lancer le projet

```bash
npm install
npm run dev
```

## Config

- Numéro WhatsApp: `src/config/site.ts` (`whatsappNumber`)
- Logo source: `logo vintage mania.png` (racine)

Le script `postinstall` copie le logo dans `public/` et génère un badge rond en SVG (`public/logo-badge.svg`).
