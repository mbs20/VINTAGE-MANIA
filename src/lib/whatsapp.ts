import { siteConfig } from '@/config/site';

export function normalizeWhatsAppNumber(input: string) {
  return input.replace(/\D/g, '');
}

export function buildWhatsAppLink(message: string, customNumber?: string) {
  const number = normalizeWhatsAppNumber(customNumber ?? siteConfig.whatsappNumber);
  const text = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${text}`;
}

export function buildProductWhatsAppMessage(params: {
  name: string;
  sku: string;
  size: string;
  price: number;
}) {
  return `Salam, je veux commander : ${params.name} (Code: ${params.sku}) - Taille: ${params.size} - Prix: ${formatPrice(params.price)}. Est-ce disponible ?`;
}

export function formatPrice(price: number) {
  return `${price} DH`;
}
