import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import LiveDemo from '../components/LiveDemo';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden selection:bg-brand-primary selection:text-bg-dark bg-bg-dark">
      <Navbar />

      <main>
        <Hero />

        <section id="features">
          <Features />
        </section>

        <section id="live-demo">
          <LiveDemo />
        </section>

        <CTA />
      </main>

      <Footer />
    </div>
  );
}
