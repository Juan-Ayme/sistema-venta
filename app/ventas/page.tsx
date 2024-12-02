import dynamic from 'next/dynamic';

const SalesContent = dynamic(() => import('@/components/sales/SalesContent'), {
  ssr: false
});

export default function SalesPage() {
  return <SalesContent />;
}