import Head from 'next/head';
import Link from 'next/link';
import LinkForm from '../components/LinkForm';
import AdBanner from '../components/AdBanner';
import { FiZap, FiBarChart2, FiClock, FiDollarSign } from 'react-icons/fi';

export default function Home() {
  return (
    <>
      <Head>
        <title>ShortXpress Pro | Premium URL Shortener</title>
        <meta name="description" content="Create short links, QR codes, and track your links with our powerful URL shortener. Perfect for businesses and marketers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="header">
        <div className="container navbar">
          <Link href="/" className="logo">
            <img src="/images/logo.svg" alt="ShortXpress" />
            ShortXpress
          </Link>
          <nav className="nav-links">
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/login" className="login-button">Login</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <h1>The Most Powerful URL Shortener</h1>
            <p>Create memorable short links, QR codes, and track your audience with our advanced analytics platform.</p>
            
            <AdBanner slot="728x90" style={{ margin: '20px auto', maxWidth: '728px' }} />
            
            <div className="link-form-wrapper">
              <LinkForm />
            </div>
          </div>
        </section>

        <section className="features">
          <div className="container">
            <h2 className="section-title">Why Choose ShortXpress?</h2>
            <p className="section-subtitle">Everything you need to optimize, track, and monetize your links</p>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <FiZap />
                </div>
                <h3>Lightning Fast</h3>
                <p>Our global CDN ensures your links redirect instantly, no matter where your audience is located.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <FiBarChart2 />
                </div>
                <h3>Advanced Analytics</h3>
                <p>Track clicks, locations, devices, and more with our comprehensive analytics dashboard.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <FiClock />
                </div>
                <h3>Link Expiration</h3>
                <p>Set expiration dates for your links to automatically disable them after a certain time.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <FiDollarSign />
                </div>
                <h3>Monetization</h3>
                <p>Earn money from your links with our premium ad network and affiliate programs.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="premium-section">
          <div className="container">
            <h2>Ready to Go Premium?</h2>
            <p>Upgrade to unlock all features and remove ads from your links.</p>
            <Link href="/pricing" className="cta-button">View Pricing Plans</Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-about">
            <div className="footer-logo">ShortXpress</div>
            <p>The most advanced URL shortener for businesses and marketers.</p>
          </div>
          
          <div className="footer-links">
            <h3>Product</h3>
            <ul>
              <li><Link href="/features">Features</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/api">API</Link></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h3>Company</h3>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h3>Legal</h3>
            <ul>
              <li><Link href="/privacy">Privacy</Link></li>
              <li><Link href="/terms">Terms</Link></li>
              <li><Link href="/cookie-policy">Cookies</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="container copyright">
          <p>&copy; {new Date().getFullYear()} ShortXpress Pro. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
