import { sql } from '@vercel/postgres';
import type { Product } from '@/data/products';

export async function getProducts(): Promise<Product[]> {
  try {
    const { rows } = await sql`
      SELECT * FROM products ORDER BY created_at DESC
    `;

    return rows.map(row => ({
      id: row.id,
      slug: row.slug,
      sku: row.sku,
      name: row.name,
      category: row.category,
      price: row.price,
      size: row.size,
      condition: row.condition,
      isNew: row.is_new,
      isOneOfOne: row.is_one_of_one,
      isSoldOut: row.is_sold_out,
      description: row.description,
      measurements: row.measurements,
      defects: row.defects || '',
      images: row.images || []
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const { rows } = await sql`SELECT * FROM products WHERE slug = ${slug}`;
    if (rows.length === 0) return undefined;

    const row = rows[0];
    return {
      id: row.id,
      slug: row.slug,
      sku: row.sku,
      name: row.name,
      category: row.category,
      price: row.price,
      size: row.size,
      condition: row.condition,
      isNew: row.is_new,
      isOneOfOne: row.is_one_of_one,
      isSoldOut: row.is_sold_out,
      description: row.description,
      measurements: row.measurements,
      defects: row.defects || '',
      images: row.images || []
    };
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return undefined;
  }
}

export async function saveProduct(product: Product): Promise<Product> {
  try {
    await sql`
      INSERT INTO products (
        id, slug, sku, name, category, price, size, condition,
        is_new, is_one_of_one, is_sold_out, description, measurements, defects, images
      ) VALUES (
        ${product.id}, ${product.slug}, ${product.sku}, ${product.name}, ${product.category},
        ${product.price}, ${product.size}, ${product.condition}, ${product.isNew},
        ${product.isOneOfOne}, ${product.isSoldOut}, ${product.description},
        ${product.measurements}, ${product.defects || null}, ${product.images as any}
      )
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        price = EXCLUDED.price,
        size = EXCLUDED.size,
        condition = EXCLUDED.condition,
        is_new = EXCLUDED.is_new,
        is_one_of_one = EXCLUDED.is_one_of_one,
        is_sold_out = EXCLUDED.is_sold_out,
        description = EXCLUDED.description,
        measurements = EXCLUDED.measurements,
        defects = EXCLUDED.defects,
        images = EXCLUDED.images
    `;

    return product;
  } catch (error) {
    console.error('Error saving product:', error);
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    await sql`DELETE FROM products WHERE id = ${id}`;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}
