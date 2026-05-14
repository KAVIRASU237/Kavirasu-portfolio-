import React from 'react'
import { motion } from 'framer-motion'
import styles from './Hero.module.css'
import twitterlight from "../images/icons8-twitter-50 (1).png";
import youtubelight from "../images/icons8-youtube-50 (1).png";
import facebooklight from "../images/icons8-facebook-50 (1).png";
import githublight from "../images/icons8-github-64 (1).png";
import linkedinlight from "../images/icons8-linkedin-48 (1).png";
import yourCharacter from '../images/your-character.png'
import resumeFile from '../images/kavirasu resume online.pdf'

const Hero = () => {
  const twitterIcon = twitterlight
  const youtubeIcon = youtubelight
  const facebookIcon = facebooklight
  const githubIcon = githublight
  const linkedinIcon = linkedinlight

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
        {/* Left Column: All Text Content */}
        <div className={styles.leftColumn}>
          <div className={styles.titleInfo}>
            <motion.h1 variants={itemVariants}>KAVIRASU C</motion.h1>
            <motion.h2 variants={itemVariants} className={styles.titleGradient}>
              AI-Powered Full Stack Developer | Automation Engineer | React & Node.js Developer
            </motion.h2>
          </div>

          <motion.div variants={itemVariants} className={styles.socialContainer}>
            <SocialLink href="https://x.com/Kavirasu_C" icon={twitterIcon} alt="Twitter" />
            <SocialLink href="https://www.youtube.com/@Kavirasu_C" icon={youtubeIcon} alt="YouTube" />
            <SocialLink href="https://www.facebook.com/profile.php?id=61572290333700&sk" icon={facebookIcon} alt="Facebook" />
            <SocialLink href="https://github.com/KAVIRASU237" icon={githubIcon} alt="GitHub" />
            <SocialLink href="https://www.linkedin.com/in/kavirasu-c-00028928a/" icon={linkedinIcon} alt="LinkedIn" />
          </motion.div>

          <motion.p className={styles.description} variants={itemVariants}>
            I build scalable full-stack applications, intelligent AI systems, and automation-driven software specializing in React, Node.js, and Large Language Models (LLMs).
          </motion.p>

          <a href={resumeFile} download="Kavirasu_Resume.pdf">
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              RESUME
            </motion.button>
          </a>
        </div>

        {/* Right Column: Animated Character */}
        <div className={styles.rightColumn}>
          <div className={styles.characterContainer}>
            {/* Base Character */}
            <img 
              src={yourCharacter} 
              className={styles.character} 
              alt="Animated Samurai Character"
              fetchpriority="high"
              decoding="async"
              loading="eager"
            />
            
            {/* Yellow Glow Layer */}
            <img 
              src={yourCharacter} 
              className={styles.glowLayer} 
              aria-hidden="true"
              decoding="async"
              loading="eager"
            />
            
            {/* Soft Aura */}
            <div className={styles.aura}></div>
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
