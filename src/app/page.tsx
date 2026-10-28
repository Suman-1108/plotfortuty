import { getPlots, getProjects } from '@/lib/storage';
import Hero from '@/components/home/Hero';
import StatsBanner from '@/components/home/StatsBanner';
import PopularBentoGrid from '@/components/home/PopularBentoGrid';
import APRajanGardenCard from '@/components/home/APRajanGardenCard';
import PropertySuggestions from '@/components/home/PropertySuggestions';
import ExploreCategories from '@/components/home/ExploreCategories';
import MasterplanInteractive from '@/components/home/MasterplanInteractive';
import ContactCTA from '@/components/home/ContactCTA';
import UnitConverter from '@/components/plots/UnitConverter';

export default async function HomePage() {
  const plots = await getPlots();
  const projects = await getProjects();

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F5F0]">
      {/* 1. Immersive Aerial Hero matching Reference (Wireframe outline + Editorial search) */}
      <Hero />

      {/* 2. Light Lime Stats Banner directly under Hero matching reference */}
      <StatsBanner />

      {/* 3. Propriedades mais populares - Asymmetric Bento Grid matching reference */}
      <PopularBentoGrid />

      {/* 4. Featured Constructor & Township Showcase: AP Rajan Garden */}
      <APRajanGardenCard />

      {/* 5. Sugestões de propriedade que você pode gostar - Pill Filter Bar */}
      <PropertySuggestions />

      {/* 5. Explore os tipos de propriedades - 4-Card Horizontal Verified Plot Row */}
      <ExploreCategories />

      {/* 6. Interactive Masterplan Blueprint Inspector */}
      <MasterplanInteractive />

      {/* 7. Tamil Nadu Land Area Unit Converter */}
      <section className="py-14 sm:py-16 bg-white border-y border-[#DADDD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-wider text-[#668F35] font-semibold">
                Tamil Nadu Land Area Utility
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#222222] mt-1">
                Calculate &amp; Convert Plot Dimensions
              </h3>
            </div>
            <UnitConverter />
          </div>
        </div>
      </section>

      {/* 8. Contact & Site Inspection Booking */}
      <ContactCTA />
    </div>
  );
}
