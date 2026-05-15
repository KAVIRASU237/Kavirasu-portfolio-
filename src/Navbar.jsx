import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./NavbarStyle.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = ["hero", "about", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + 200; // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "#hero", id: "hero" },
    { name: "About", path: "#about", id: "about" },
    { name: "Projects", path: "#projects", id: "projects" },
    { name: "Skills", path: "#skills", id: "skills" },
    { name: "Contact", path: "#contact", id: "contact" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <a href="#hero" className="nav-logo" onClick={() => setActiveSection("hero")}>
          <motion.div
            className="logo-box"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            K
          </motion.div>
        </a>

        {/* Desktop Menu */}
        <ul className="nav-links desktop">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.path}
                className={activeSection === link.id ? "active" : ""}
                onClick={() => setActiveSection(link.id)}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="underline"
                    className="underline"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <div className={`bar ${isOpen ? "animate" : ""}`}></div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <ul>
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a 
                    href={link.path} 
                    onClick={() => {
                      setIsOpen(false);
                      setActiveSection(link.id);
                    }}
                    className={activeSection === link.id ? "active" : ""}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Close button for extra usability */}
            <motion.div 
              className="close-menu"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              CLOSE
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
