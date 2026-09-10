import { Navbar } from "./components/landing/Navbar";
import { Hero } from "./components/landing/Hero";
import { Introduction } from "./components/landing/Introduction";
import { BudgetAllocator } from "./components/landing/BudgetAllocator";
import { DashboardShowcase } from "./components/landing/DashboardShowcase";
import { BentoFeatures } from "./components/landing/BentoFeatures";
import { ScrollStory } from "./components/landing/ScrollStory";
import { SecondaryFeatures } from "./components/landing/SecondaryFeatures";
import { Statistics } from "./components/landing/Statistics";
import { CTA } from "./components/landing/CTA";
import { Footer } from "./components/landing/Footer";

function App() {
  return (
    <div className="min-h-screen bg-[#070708] text-[#F1F1F2]">
      <Navbar />

      <main>
        <Hero />

        <Introduction />

        <BudgetAllocator />

        <DashboardShowcase />

        <BentoFeatures />

        <ScrollStory />

        <SecondaryFeatures />

        <Statistics />

        <CTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;