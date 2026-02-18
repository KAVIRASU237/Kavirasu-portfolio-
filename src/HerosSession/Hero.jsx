import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './Hero.module.css'
import heroimg from '../images/kai-character3.png'
import moon from '../images/moon.png'
import sun from '../images/sun.png'
import twitterdark from "../images/icons8-twitter-50.png";
import twitterlight from "../images/icons8-twitter-50 (1).png";
import youtubedark from "../images/icons8-youtube-50.png";
import youtubelight from "../images/icons8-youtube-50 (1).png";
import facebookdark from "../images/icons8-facebook-50.png";
import facebooklight from "../images/icons8-facebook-50 (1).png";
import githubdark from "../images/icons8-github-64.png";
import githublight from "../images/icons8-github-64 (1).png";
import linkedindark from "../images/icons8-linkedin-48.png";
import linkedinlight from "../images/icons8-linkedin-48 (1).png";
import resumeFile from "../images/kavirasu resume online.pdf";
import { useTheme } from './common/ThemeContext'

const Hero = () => {
  const { theme, toggleTheme } = useTheme()

  const themeIcon = theme === 'dark' ? sun : moon
  const twitterIcon = theme === 'dark' ? twitterlight : twitterdark
  const youtubeIcon = theme === 'dark' ? youtubelight : youtubedark
  const facebookIcon = theme === 'dark' ? facebooklight : facebookdark
  const githubIcon = theme === 'dark' ? githublight : githubdark
  const linkedinIcon = theme === 'dark' ? linkedinlight : linkedindark

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
        className={styles.heroImageWrapper}
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        whileHover={{ scale: 1.05, rotate: 2 }}
      >
        <img
          className={styles.hero}
          src={heroimg}
          alt="Profile Picture of Kavirasu"
        />
        <motion.div
          className={styles.themeToggleWrapper}
          whileHover={{ scale: 1.2, rotate: 180 }}
          whileTap={{ scale: 0.8 }}
          onClick={toggleTheme}
        >
          <img
            className={styles.colorMode}
            src={themeIcon}
            alt="Color mode"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.info}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants}>kavirasu</motion.h1>
        <motion.h2 variants={itemVariants} className={styles.titleGradient}>
          Computer Science Student (Pre Final Year)
        </motion.h2>

        <motion.div variants={itemVariants} className={styles.socialContainer}>
          <SocialLink href="https://x.com/Kavirasu_C" icon={twitterIcon} alt="Twitter" />
          <SocialLink href="https://www.youtube.com/@Kavirasu_C" icon={youtubeIcon} alt="YouTube" />
          <SocialLink href="https://www.facebook.com/profile.php?id=61572290333700&sk" icon={facebookIcon} alt="Facebook" />
          <SocialLink href="https://github.com/KAVIRASU237" icon={githubIcon} alt="GitHub" />
          <SocialLink href="https://www.linkedin.com/in/kavirasu-c-00028928a/" icon={linkedinIcon} alt="LinkedIn" />
        </motion.div>

        <motion.p className={styles.description} variants={itemVariants}>
          I'm a passionate web developer building responsive, user-friendly websites.
          Specializing in creating modern digital experiences with the MERN stack.
        </motion.p>

        <a href={resumeFile} download="Kavirasu_Resume.pdf">
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            Resume
          </motion.button>
        </a>
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
