import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";

const Hero = lazy(() => import("./HerosSession/Hero"));
const Project = lazy(() => import("./HerosSession/projects/Project"));
const Skills = lazy(() => import("./HerosSession/skills/Skills"));
const Contact = lazy(() => import("./HerosSession/contact/Contact"));
const Navbar = lazy(() => import("./Navbar"));
const Background3D = lazy(() => import("./components/Background3D"));
const Footer = lazy(() => import("./HerosSession/Footer/Footer"));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route index element={<PageWrapper><Hero /></PageWrapper>} />
        <Route path="/" element={<PageWrapper><Hero /></PageWrapper>} />
        <Route path="/Projects" element={<PageWrapper><Project /></PageWrapper>} />
        <Route path="/Skills" element={<PageWrapper><Skills /></PageWrapper>} />
        <Route path="/Contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

const PageWrapper = ({ children }) => (
  <motion.main
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.main>
);

const App = () => {
  return (
    <BrowserRouter basename="/Kavirasu-portfolio-">
      <Suspense fallback={<div className="loading-placeholder" />}>
        <Background3D />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
