import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Hero.module.css'
import twitterlight from "../images/icons8-twitter-50 (1).png";
import youtubelight from "../images/icons8-youtube-50 (1).png";
import facebooklight from "../images/icons8-facebook-50 (1).png";
import githublight from "../images/icons8-github-64 (1).png";
import linkedinlight from "../images/icons8-linkedin-48 (1).png";
import yourCharacter from '../images/astranaut-home-kavirasu.png'
import resumeFile from '../images/kavirasu resume online.pdf'

const Hero = () => {
  const twitterIcon = twitterlight
  const youtubeIcon = youtubelight
  const facebookIcon = facebooklight
  const githubIcon = githublight
  const linkedinIcon = linkedinlight

  const professions = [
    "Software Engineer",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Problem Solver"
  ];

  const [text, setText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [profIndex, setProfIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);
  const [isGlitching, setIsGlitching] = React.useState(false);

  React.useEffect(() => {
    const currentProf = professions[profIndex];
    const typeSpeed = isDeleting ? 40 : 75;
    const pauseTime = isDeleting ? 400 : 1800;

    const handleTyping = () => {
      if (!isDeleting) {
        if (charIndex < currentProf.length) {
          setText(currentProf.slice(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
        } else {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 260);
          setTimeout(() => setIsDeleting(true), pauseTime);
          return;
        }
      } else {
        if (charIndex > 0) {
          setText(currentProf.slice(0, charIndex - 1));
          setCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setProfIndex((prev) => (prev + 1) % professions.length);
          setTimeout(() => {}, pauseTime);
          return;
        }
      }
    };

    const timer = setTimeout(handleTyping, typeSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, profIndex, professions]);



  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <section id="hero" className={styles.container}>
      <motion.div 
        className={styles.contentWrapper}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.leftColumn}>
          <div className={styles.titleInfo}>
            <motion.h1 variants={itemVariants}>KAVIRASU C</motion.h1>
            <div className={styles.professionsWrapper}>
              <div className={styles.glow}></div>
              <span 
                className={`${styles.professionText} ${isGlitching ? styles.glitching : ""}`}
                data-text={text}
              >
                {text}
              </span>
              <span className={styles.cursor}></span>
            </div>
          </div>

          <motion.div variants={itemVariants} className={styles.socialContainer}>
            {/* <SocialLink href="https://x.com/Kavirasu_C" icon={twitterIcon} alt="Twitter" /> */}
            <SocialLink href="https://www.youtube.com/@Kavirasu_C" icon={youtubeIcon} alt="YouTube" />
            {/* <SocialLink href="https://www.facebook.com/profile.php?id=61572290333700&sk" icon={facebookIcon} alt="Facebook" /> */}
            <SocialLink href="https://github.com/KAVIRASU237" icon={githubIcon} alt="GitHub" />
            <SocialLink href="https://www.linkedin.com/in/kavirasu-c-00028928a/" icon={linkedinIcon} alt="LinkedIn" />
          </motion.div>

          <motion.p className={styles.description} variants={itemVariants}>
            I engineer scalable full-stack applications, intelligent AI-driven systems, and high-performance automation, specializing in React, Node.js, and Large Language Models (LLMs).
          </motion.p>

          <motion.div className={styles.buttonGroup} variants={itemVariants}>
            <a 
              href={resumeFile} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.primaryButton}
            >
              View Resume
            </a>
            <a 
              href={resumeFile} 
              download="Kavirasu_Resume.pdf" 
              className={styles.secondaryButton}
            >
              Download
            </a>
          </motion.div>
        </div>

        {/* Right Column: Animated Character */}
        <div className={styles.rightColumn}>
          <div className={styles.characterContainer}>
            {/* Main Character */}
            <img 
              src={yourCharacter} 
              className={styles.character} 
              alt="Kavirasu Cartoon Character"
              fetchpriority="high"
              decoding="async"
              loading="eager"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

const SocialLink = ({ href, icon, alt }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -5, scale: 1.2 }}
  >
    <img src={icon} alt={alt} />
  </motion.a>
)

export default Hero
