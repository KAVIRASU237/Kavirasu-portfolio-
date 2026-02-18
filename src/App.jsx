import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";
import Hero from "./HerosSession/Hero";
import Project from "./HerosSession/projects/Project";
import Skills from "./HerosSession/skills/Skills";
import Contact from "./HerosSession/contact/Contact";
import Navbar from "./Navbar";

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

import Footer from "./HerosSession/Footer/Footer";

const App = () => {
  return (
    <BrowserRouter basename="/Kavirasu-portfolio-">
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
