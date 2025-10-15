import LandingHeader from '@/components/landing/landing-header';
import LandingContent from '@/components/landing/landing-content';

export default function Home() {
  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#e9e9e9' }}>
      <LandingHeader />
      <LandingContent />
    </div>
  );
}
