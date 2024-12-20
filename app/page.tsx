import dynamic from 'next/dynamic';

const DashboardContent = dynamic(() => import('@/components/dashboard/DashboardContent'), {
  ssr: false
});

export default function Home() {
  return <DashboardContent />;
}