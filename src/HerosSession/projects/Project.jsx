import React from 'react'
import styles from "./ProjectsStyles.module.css";
import QRcodegenerator from "../../images/QRcodegenerator.png";
import ProjectCard from '../common/ProjectCard';
import smartScaller from '../../images/smartScaller.jpg'
import todolist from '../../images/todolistlogo.jpg'
import calculator from '../../images/calculator logo.webp'
import portfolioLogo from '../../images/portfolioWebLogo.jpg'
import kaveririceshop from '../../images/kaveririceshop.png'
import chatsql from '../../images/chatsqlscreenshot.png'
const Project = () => {
  return (
    <>
      <section id="projects" className={styles.container}>
        <h1 className="sectionTitle">Projects</h1>
        <div className={styles.projectsContainer}>
          <ProjectCard
            src={portfolioLogo}
            link="https://github.com/KAVIRASU237/Kavirasu-portfolio-"
            h3="PORTFOLIO"
            p=""
            alt="PORTFOLIO LOGO"
          />
          <ProjectCard
            src={chatsql}
            link="https://github.com/KAVIRASU237/chat-SQL"
            h3="ChatSQL"
            p=""
            alt="ChatSQL LOGO"
          />
          <ProjectCard
            src={kaveririceshop}
            link="https://kaveri-rice-shop.vercel.app/"
            h3="Kaveri Rice Shop"
            p=""
            alt="Kaveri Rice Shop"
          />
          <ProjectCard
            src={QRcodegenerator}
            link="https://github.com/KAVIRASU237/QR-code-Generator"
            h3="QR CODE"
            p="generator"
            alt="QR"
          />
          {/* <ProjectCard
            src={smartScaller}
            link="https://www.google.com/"
            h3="Smart Scaler"
            p="Converts Kg 🔄️ price"
            alt="Smart scaler logo"
          /> */}
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
        </div>
      </section>
    </>
  );
}

export default Project
