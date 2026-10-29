import FeaturesSection from "@/components/FeaturesSection";
import GetStartedSection from "@/components/GetStartedSection";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import RolesSection from "@/components/RolesSection";
import StatSection from "@/components/StatSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection></HeroSection>
      <StatSection></StatSection>
      <RolesSection></RolesSection>
      <FeaturesSection></FeaturesSection>
      <PricingSection></PricingSection>
      <GetStartedSection></GetStartedSection>
    </div>
  );
}
