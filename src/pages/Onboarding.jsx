import WelcomeSection, {
  FeaturesSection,
  AboutSection,
  CustomerStatsSection,
  TestimonialSection,
  CTASection,
} from "../components/Sections";
import Header from "../components/Header";

export default function Onboarding() {
  return (
    <div>
      <Header />
      <WelcomeSection />
      <FeaturesSection />
      <AboutSection />
      <CustomerStatsSection />
      <TestimonialSection />
      <CTASection />
    </div>
  );
}
