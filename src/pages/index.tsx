import Navbar from "src/components/Navbar";
import Footer from "src/components/Footer";
import IntroCard from "src/components/IntroCard";
import InfoGrid from "src/components/InfoGrid";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="flex items-center justify-center w-full px-16 mx-auto my-16">
        <IntroCard />
      </div>
      <div className="flex items-center justify-center w-full px-16 mx-auto pb-16">
        <InfoGrid />
      </div>
      <Footer />
    </main>
  );
}
