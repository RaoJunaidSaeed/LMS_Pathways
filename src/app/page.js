import Hero from '@/components/ui/LandingPage/Hero';
import CourseTicker from '@/components/ui/LandingPage/CourseTicker';
import Features from '@/components/ui/LandingPage/Features';
import HowItWorks from '@/components/ui/LandingPage/HowItWorks';
import ContactSection from '@/components/ui/LandingPage/ContactSection';
import Footer from '@/components/ui/LandingPage/Footer';
import Header from '@/components/ui/Header';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gray-50">
      <Header />
      <Hero />
      <CourseTicker />
      <Features />
      <HowItWorks />
      <ContactSection />
      <Footer />
    </main>
  );
}
