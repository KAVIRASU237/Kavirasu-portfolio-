import React from "react";
import { motion } from "framer-motion";
import styles from "../skills/SkillsStyles.module.css";

function SkillList({ src, skill }) {
  return (
    <motion.span
      className={styles.skillItem}
      whileHover={{
        scale: 1.1,
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
      }}
      whileTap={{ scale: 0.95 }}
    >
      <img src={src} alt="Checkmark icon" />
      <p>{skill}</p>
    </motion.span>
  );
}

export default SkillList;
