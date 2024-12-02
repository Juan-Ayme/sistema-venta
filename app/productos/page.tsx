import dynamic from 'next/dynamic';

const ProductsContent = dynamic(() => import('@/components/products/ProductsContent'), {
  ssr: false
});

export default function ProductsPage() {
  return <ProductsContent />;
}