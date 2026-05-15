import React, { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

const Hero = lazy(() => import("./HerosSession/Hero"));
const Project = lazy(() => import("./HerosSession/projects/Project"));
const Skills = lazy(() => import("./HerosSession/skills/Skills"));
const Contact = lazy(() => import("./HerosSession/contact/Contact"));
const About = lazy(() => import("./HerosSession/about/About"));
const Navbar = lazy(() => import("./Navbar"));
const Background3D = lazy(() => import("./components/Background3D"));
const Footer = lazy(() => import("./HerosSession/Footer/Footer"));

const App = () => {
  return (
    <BrowserRouter basename="/Kavirasu-portfolio-">
      <Suspense fallback={<div className="loading-placeholder" />}>
        <Background3D />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Project />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
