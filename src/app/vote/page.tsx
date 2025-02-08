import Header from "@/components/header/page";
import Footer from "@/components/footer/page";
import Section from "@/components/Section/page";

export default function VotePage() {
  return <div className="flex flex-wrap gap-4 items-center">
    <Header id="vote"/>
    <Section id="votepage" />
    <Footer id="vote"/>
  </div>
}
