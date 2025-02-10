import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";
import VoteSection from "@/components/VotePage/page";

export default function VotePage() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Header id="vote" />
      <VoteSection />
      <Footer id="vote" />
    </div>
  );
}
