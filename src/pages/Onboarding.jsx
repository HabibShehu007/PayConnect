import WelcomeSection, {
  FeaturesSection,
  AboutSection,
  CustomerStatsSection,
  TestimonialSection,
  CTASection,
} from "../components/Sections";

export default function Onboarding() {
  return (
    <div>
      <WelcomeSection />
      <FeaturesSection />
      <AboutSection />
      <CustomerStatsSection />
      <TestimonialSection />
      <CTASection />
    </div>
  );
}
