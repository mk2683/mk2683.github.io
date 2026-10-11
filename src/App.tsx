import { ReactLenis } from "lenis/react";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import SectionNav from "./components/SectionNav";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import Hero from "./components/Hero";
import IntroVideo from "./components/IntroVideo";
import CommitGraph from "./components/CommitGraph";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.1 }}>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <SectionNav />
      <main>
        <Hero />
        <IntroVideo />
        <CommitGraph />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </ReactLenis>
  );
}
