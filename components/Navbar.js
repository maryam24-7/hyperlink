import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Resume ATS Checker Pro
        </Link>
        <div className={styles.navLinks}>
          <a href="#features" className={styles.navLink}>Features</a>
          <a href="#how-it-works" className={styles.navLink}>How It Works</a>
          <a href="#contact" className={styles.navLink}>Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
