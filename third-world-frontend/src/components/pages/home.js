import HeroSection from './sections/hero'
import TextSlider from './sections/textSlider'
import WelcomToThirdworld from './sections/welcomToThirdWorld'
import NFTs from './sections/nfts'
import WhyInvestInUs from './sections/whyInvestInUs'
import ProjectRoadMap from './sections/projectRoadmap'
import CSRProjects from './sections/CSRprojects'
import JoinTheCommunity from './sections/joinTheCommunity'
import FAQ from './sections/FAQ'
import WeAreTransparent from './sections/weAreTransparent'
import TheTeam from './sections/theTeam'
import ComicSection from './sections/comic'

const HomePage = () => {
  return (
    <>
      {/* build section by section */}
      <HeroSection />
      <TextSlider />
      <WelcomToThirdworld />
      <NFTs />
      <WhyInvestInUs />
      <ProjectRoadMap />
      <ComicSection />
      <CSRProjects />
      <JoinTheCommunity />
      <FAQ />
      <WeAreTransparent />
      <TheTeam />
    </>
  );
}

export default HomePage