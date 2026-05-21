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
  ];

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    setActiveSection(link.id);
    
    const element = document.getElementById(link.id);
    if (element) {
      if (link.id === "hero") {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      } else {
        element.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
    
    // Close mobile menu with a short delay to allow touch event completion and smooth scroll initiation
    setTimeout(() => {
      setIsOpen(false);
    }, 250);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setActiveSection("hero");
    
    const element = document.getElementById("hero");
    if (element) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }

    setTimeout(() => {
      setIsOpen(false);
    }, 250);
  };

  const handleCtaClick = (e) => {
    e.preventDefault();
    setActiveSection("contact");
    
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }

    setTimeout(() => {
      setIsOpen(false);
    }, 250);
  };

  return (
    <header className={`navbar-header ${scrolled ? "scrolled" : ""} ${isOpen ? "menu-open" : ""}`}>
      <motion.div 
        className={`nav-pill-wrapper ${isOpen ? "menu-open" : ""}`}
        layout
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      >
        <div className="nav-main-row">
          <a href="#hero" className="nav-logo" onClick={handleLogoClick}>
            <span className="logo-accent">Kavi</span>
            <span className="logo-main">rasu</span>
          </a>

          {/* Desktop Menu */}
          <nav className="nav-links-desktop">
            <ul className="nav-links-list">
              {navLinks.map((link) => (
                <li key={link.name} className="nav-item">
                  <a
                    href={link.path}
                    className={`nav-link ${activeSection === link.id ? "active" : ""}`}
                    onClick={(e) => handleLinkClick(e, link)}
                  >
                    <span className="nav-link-text">{link.name}</span>
                    {activeSection === link.id && (
                      <motion.div
                        layoutId="active-pill"
                        className="active-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA Button */}
          <div className="nav-cta-desktop">
            <a 
              href="#contact" 
              className={`cta-button ${activeSection === "contact" ? "active" : ""}`}
              onClick={handleCtaClick}
            >
              Contact Me
            </a>
          </div>

          {/* Mobile Hamburger Icon */}
          <button 
            className={`hamburger-btn ${isOpen ? "open" : ""}`} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mobile-dropdown"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ul className="mobile-links-list">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <a 
                      href={link.path} 
                      onClick={(e) => handleLinkClick(e, link)}
                      className={`mobile-link ${activeSection === link.id ? "active" : ""}`}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="mobile-cta-item"
                >
                  <a 
                    href="#contact" 
                    onClick={handleCtaClick}
                    className="mobile-cta-button"
                  >
                    Contact Me
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Navbar;
