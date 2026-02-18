import React from "react";
import { motion } from "framer-motion";
import styles from "./SkillsStyles.module.css";
import checkIconDark from "../../images/icons8-tick-64.png";
import checkIconLight from "../../images/icons8-tick-64 (1).png";
import SkillList from "../common/SkillList";
import { useTheme } from "../common/ThemeContext";

function Skills() {
  const { theme } = useTheme();
  const themeIcon = theme === "dark" ? checkIconLight : checkIconDark;

  const skillCategories = [
    {
      title: "Languages",
      skills: ["Java", "C++", "C", "Python", "JavaScript", "SQL"]
    },
    {
      title: "Web Development",
      skills: ["HTML", "CSS", "React", "Redux", "Bootstrap", "Tailwind CSS", "Node.js"]
    },
    {
      title: "AI Technologies",
      skills: ["LLM", "RAG", "Langchain", "n8n", "Antigravity", "Machine Learning"]
    },
    {
      title: "Tools & Others",
      skills: ["Git", "GitHub", "VS Code", "Vite", "Firebase", "Unit Testing", "Responsive Design"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section id="skills" className={styles.container}>
      <motion.h1
        className="sectionTitle"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Skills
      </motion.h1>

      <motion.div
        className={styles.skillsWrapper}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            className={styles.skillCategory}
            variants={itemVariants}
          >
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <div className={styles.skillList}>
              {category.skills.map((skill, idx) => (
                <SkillList key={idx} src={themeIcon} skill={skill} />
              ))}
            </div>
            {index < skillCategories.length - 1 && <div className={styles.divider} />}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Skills;
