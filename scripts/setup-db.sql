-- Script d'initialisation de la base de données Postgres
-- Exécutez ce script dans Vercel Postgres Dashboard -> Query

CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    sku TEXT NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price INTEGER NOT NULL,
    size TEXT NOT NULL,
    condition TEXT NOT NULL,
    is_new BOOLEAN DEFAULT false,
    is_one_of_one BOOLEAN DEFAULT false,
    is_sold_out BOOLEAN DEFAULT false,
    description TEXT NOT NULL,
    measurements TEXT NOT NULL,
    defects TEXT,
    images TEXT[], -- Array d'URLs Cloudinary
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
