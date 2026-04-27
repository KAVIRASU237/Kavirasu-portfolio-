import React from 'react'
import styles from "./FooterStyles.module.css";

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.divider} />
      <p>
        &copy; {new Date().getFullYear()} Kavirasu.
        <br />

      </p>
    </footer>
  );
}

export default Footer
