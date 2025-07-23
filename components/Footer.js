import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Resume ATS Checker Pro</h3>
            <p>Professional tool to analyze your resume for ATS compatibility and job matching.</p>
          </div>
          <div className={styles.footerSection}>
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3>Contact</h3>
            <p>Email: info@atscheckerpro.com</p>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Resume ATS Checker Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
