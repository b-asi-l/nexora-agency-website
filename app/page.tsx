import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import EditorMock from "@/components/EditorMock";
import Pipeline from "@/components/Pipeline";
import UseCases from "@/components/UseCases";
import Pricing from "@/components/Pricing";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import FooterCTA from "@/components/FooterCTA";

export default function Page() {
  return (
    <main className="relative min-h-screen bg-[#05040d] text-white selection:bg-fuchsia-500 selection:text-white">
      <Nav />
      <Hero />
      <EditorMock />
      <Pipeline />
      <UseCases />
      <Pricing />
      <Team />
      <Contact />
      <FooterCTA />
    </main>
  );
}
