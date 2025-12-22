
import HomeLayouts from '../Layouts/HomeLayouts'
import BenefitsSection from './BenefitsSection'
import CTASection from './CTASection'
import FeaturesSection from './FeaturesSection'
import HeroSection from './HeroSection'
import Home from './Home'
import HowItWorks from './HowItWorks'
import PricingSection from './PricingSection'

const Homepage = () => {
    
  return (
    <div>
      <HomeLayouts>
        {/* <Home/> */}
      <HeroSection />
      <HowItWorks/>
      <FeaturesSection />
      <BenefitsSection />
      <PricingSection/>
      <CTASection />
      </HomeLayouts>
    </div>
  )
}

export default Homepage
