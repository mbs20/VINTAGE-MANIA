import { NextRequest, NextResponse } from 'next/server';
import { getProducts, saveProduct, deleteProduct } from '@/lib/db';
import { Product } from '@/data/products';
import { randomUUID } from 'crypto';

export async function GET() {
    const products = await getProducts();
    return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const product: Product = {
            ...body,
            id: body.id || randomUUID(),
            sku: body.sku || `VM-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            slug: body.slug || body.name.toLowerCase().replace(/ \//g, '-').replace(/ /g, '-').replace(/[^\w-]/g, '')
        };

        await saveProduct(product);
        return NextResponse.json(product);
    } catch (error) {
        console.error('Error in POST /api/admin/products:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
        }

        await deleteProduct(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in DELETE /api/admin/products:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
