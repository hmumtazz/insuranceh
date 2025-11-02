import AppHeader from '@/components/shared/app-header';
import LandingContent from '@/components/landing/landing-content';

export default function Home() {
  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#e9e9e9' }}>
      <AppHeader />
      <LandingContent />
    </div>
  );
}
