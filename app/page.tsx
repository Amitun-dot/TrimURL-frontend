import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Preview from '@/components/Preview';
import Trust from '@/components/Trust';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Preview />
        <Features />
        <HowItWorks />
        <Trust />
      </main>
      <Footer />
    </>
  );
}
