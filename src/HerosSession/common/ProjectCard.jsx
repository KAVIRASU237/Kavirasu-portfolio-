import React from 'react'
import { motion } from 'framer-motion'
import styles from '../projects/ProjectsStyles.module.css'

const ProjectCard = ({ src, link, h3, p, alt }) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.projectCard}
      whileHover={{
        y: -10,
        rotateX: 10,
        rotateY: 10,
        z: 50,
        transition: { duration: 0.3 }
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <div className={styles.imageOverlay}>
        <img src={src} alt={alt} />
      </div>
      <div className={styles.cardContent}>
        <h3>{h3}</h3>
        <p>{p}</p>
      </div>
    </motion.a>
  );
}

export default ProjectCard
