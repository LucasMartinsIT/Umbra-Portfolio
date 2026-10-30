import About from './components/About';
import Atmosphere from './components/Atmosphere';
import Contact from './components/Contact';
import Education from './components/Education';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Gallery3D from './components/gallery/Gallery3D';
import Hero from './components/Hero';
import IntroSequence from './components/IntroSequence';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skills';
import WelcomeDialog from './components/WelcomeDialog';
import LanguageProvider from './i18n/LanguageProvider';
import DarkHourProvider from './theme/DarkHourProvider';

function App() {
  return (
    <LanguageProvider>
      <DarkHourProvider>
        <div className="overflow-x-clip bg-abyss font-sans text-foam">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Gallery3D />
            <Education />
            <Contact />
          </main>
          <Footer />
          <Atmosphere />
          <WelcomeDialog />
          <IntroSequence />
        </div>
      </DarkHourProvider>
    </LanguageProvider>
  );
}

export default App;
