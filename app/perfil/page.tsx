import dynamic from 'next/dynamic';

const ProfileContent = dynamic(() => import('@/components/profile/ProfileContent'), {
  ssr: false
});

export default function ProfilePage() {
  return <ProfileContent />;
}