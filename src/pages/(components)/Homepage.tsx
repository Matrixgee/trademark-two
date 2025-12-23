
import HomeLayouts from '../Layouts/HomeLayouts'
import BenefitsSection from './BenefitsSection'
import CTASection from './CTASection'
import FeaturesSection from './FeaturesSection'
import HeroSection from './HeroSection'
import Home from './Home'
import HowItWorks from './HowItWorks'
import PricingSection from './PricingSection'
import SecuritySection from './SecuritySection'
import TestimonialsSection from './TestimonialsSection'

const Homepage = () => {
    
  return (
    <div>
      <HomeLayouts>
      <HeroSection />
      <HowItWorks/>
      <FeaturesSection />
      <BenefitsSection />
      <PricingSection/>
      <SecuritySection/>
      <TestimonialsSection/>
      <CTASection />
      </HomeLayouts>
    </div>
  )
}

export default Homepage
