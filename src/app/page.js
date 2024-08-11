import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import UploadSection from '../components/UploadSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="bg-gray-100 text-gray-800">
      <Navbar />
      <main>
        <HeroSection />
        <UploadSection />
      </main>
      <Footer />
    </div>
  );
}
