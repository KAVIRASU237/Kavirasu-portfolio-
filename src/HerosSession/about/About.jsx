import React from 'react'
import { motion } from 'framer-motion'
import styles from './AboutStyles.module.css'

const About = () => {
  return (
    <section id="about" className={styles.container}>
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="sectionTitle">About Me</h2>
        
        <div className={styles.textBlock}>
          <p>
            I am <strong>Kavirasu C</strong>, a Computer Science Engineering student and AI-focused Full Stack Developer from India.
          </p>
          <p>
            I specialize in building scalable web applications, intelligent AI systems, and automation-driven software using technologies like <strong>React.js, Node.js, Express.js, MongoDB, and Python</strong>.
          </p>
          <p>
            My work combines modern frontend engineering with backend architecture, authentication systems, database optimization, and AI integrations such as <strong>Retrieval-Augmented Generation (RAG), Large Language Models (LLMs), and workflow automation</strong>.
          </p>
          <p>
            I enjoy solving complex engineering problems, improving application security, optimizing performance, and designing production-ready software with real-world usability.
          </p>
          <p>
            Through building projects ranging from AI-powered Text-to-SQL systems to complete e-commerce platforms with admin dashboards and inventory management, I have gained strong experience in debugging, deployment, scalability, authentication, and software architecture.
          </p>
        </div>
      </motion.div>
    </section>
  )
}

export default About
