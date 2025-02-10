import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";
import About from "@/components/About/page";
import Features from "@/components/Features/page";
import Contact from "@/components/Contact/page";
import Vote from "@/components/Vote/page";

export default function HomePage() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Header />
      <About />
      <Features />
      <Contact />
      <Vote />
      <Footer />
    </div>
  );
}
