import React from 'react'
import styles from "./FooterStyles.module.css";

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.divider} />
      <p>
        &copy; {new Date().getFullYear()} Kavirasu C.
        <br />
        AI Full Stack Developer & Automation Engineer
      </p>
    </footer>
  );
}

export default Footer
