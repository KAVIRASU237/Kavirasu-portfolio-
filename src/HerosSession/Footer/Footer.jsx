import React from 'react'
import styles from "./FooterStyles.module.css";
import twitterIcon from "../../images/icons8-twitter-50 (1).png";
import youtubeIcon from "../../images/icons8-youtube-50 (1).png";
import facebookIcon from "../../images/icons8-facebook-50 (1).png";
import githubIcon from "../../images/icons8-github-64 (1).png";
import linkedinIcon from "../../images/icons8-linkedin-48 (1).png";

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.divider} />
      
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>KAVIRASU C</h3>
          <p className={styles.shortBio}>
            AI-focused Full Stack Developer & Automation Engineer. 
            Building intelligent systems and scalable web applications 
            with a focus on performance and innovation.
          </p>
        </div>

        <div className={styles.footerSection}>
          <h3>Quick Links</h3>
          <ul className={styles.links}>
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Social Presence</h3>
          <div className={styles.socials}>
            {/* <a href="https://x.com/Kavirasu_C" target="_blank" rel="noopener noreferrer">
              <img src={twitterIcon} alt="Twitter" />
            </a> */}
            {/*<a href="https://www.youtube.com/@Kavirasu_C" target="_blank" rel="noopener noreferrer">
              <img src={youtubeIcon} alt="YouTube" />
            </a> */}
            {/* <a href="https://www.facebook.com/profile.php?id=61572290333700&sk" target="_blank" rel="noopener noreferrer">
              <img src={facebookIcon} alt="Facebook" />
            </a> */}
            <a href="https://github.com/KAVIRASU237" target="_blank" rel="noopener noreferrer">
              <img src={githubIcon} alt="GitHub" />
            </a>
            <a href="https://www.linkedin.com/in/kavirasu-c-00028928a/" target="_blank" rel="noopener noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} Kavirasu C. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer
