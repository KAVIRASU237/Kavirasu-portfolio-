import React from 'react'
import { motion } from 'framer-motion'
import styles from "./ProjectsStyles.module.css";
import QRcodegenerator from "../../images/QRcodegenerator.png";
import ProjectCard from '../common/ProjectCard';
import todolist from '../../images/todolistlogo.jpg'
import calculator from '../../images/calculator logo.webp'
import portfolioLogo from '../../images/portfolioWebLogo.jpg'
import kaveririceshop from '../../images/kaveririceshop.png'
import chatsql from '../../images/chatsqlscreenshot.png'
import aura from '../../images/aura.png'

const Project = () => {
  return (
    <section id="projects" className={styles.container}>
      <motion.h1 
        className="sectionTitle"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h1>
      <motion.div 
        className={styles.projectsContainer}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <ProjectCard
          src={portfolioLogo}
          link="https://github.com/KAVIRASU237/Kavirasu-portfolio-"
          h3="PORTFOLIO"
          p="Personal portfolio website"
          alt="PORTFOLIO LOGO"
        />
        <ProjectCard
          src={chatsql}
          link="https://github.com/KAVIRASU237/chat-SQL"
          h3="ChatSQL (AI-RAG)"
          p="Offline Natural Language → SQL assistant using RAG & Local LLMs."
          alt="ChatSQL LOGO"
        />
        <ProjectCard
          src={kaveririceshop}
          link="https://kaveri-rice-shop.vercel.app/"
          h3="AI-Powered Shop Platform"
          p="Full-stack e-commerce with secure JWT auth, admin dashboard, inventory management, and modern UX architecture using Node.js and MongoDB."
          alt="AI-Powered Shop"
        />
        <ProjectCard
          src={aura}
          link="https://github.com/KAVIRASU237/Personal-tasks"
          h3="Aura AI"
          p="Intelligent task management system with automation workflows."
          alt="Aura"
        />
        <ProjectCard
          src={QRcodegenerator}
          link="https://github.com/KAVIRASU237/QR-code-Generator"
          h3="QR CODE"
          p="generator"
          alt="QR"
        />
        <ProjectCard
          src={todolist}
          link="https://github.com/KAVIRASU237/To-Do-List"
          h3="TO-DO"
          p="List"
          alt="to-do list logo"
        />
        <ProjectCard
          src={calculator}
          link="https://github.com/KAVIRASU237/calculator"
          h3="calculator"
          p="arthmetic operations"
          alt="calculator logo"
        />
      </motion.div>
    </section>
  );
}

export default Project
