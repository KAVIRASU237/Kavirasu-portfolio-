import React from 'react'
import { motion } from 'framer-motion'
import styles from "./ContactStyles.module.css";

function Contact() {
  return (
    <section id="contact" className={styles.container}>
      <motion.h1
        className="sectionTitle"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Contact
      </motion.h1>
      <motion.div
        className={styles.formWrapper}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <form action="https://api.web3forms.com/submit" method="POST">
          <input
            type="hidden"
            name="access_key"
            value="54202941-eaf6-4ccb-b977-0b1a447473b1"
          />
          <div className={styles.formGroup}>
            <input type="text" name="name" placeholder="Full Name" required />
          </div>
          <div className={styles.formGroup}>
            <input type="email" name="email" placeholder="Email Address" required />
          </div>
          <div className={styles.formGroup}>
            <textarea
              id="Message"
              name="Message"
              placeholder="Your Message"
              rows="5"
              required
            />
          </div>
          <motion.button
            type="submit"
            className={styles.submitBtn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}

export default Contact
