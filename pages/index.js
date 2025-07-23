import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import ATSAnalyzer from '../components/ATSAnalyzer';
import CVJobMatcher from '../components/CVJobMatcher';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [activeTab, setActiveTab] = useState('ats');

  return (
    <div className={styles.container}>
      <Head>
        <title>Resume ATS Checker Pro</title>
        <meta name="description" content="Professional ATS Resume Checker and CV-Job Matcher" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      
      <main className={styles.main}>
        <h1 className={styles.title}>
          <span className={styles.titleGradient}>Resume ATS Checker Pro</span>
        </h1>
        
        <div className={styles.tabContainer}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'ats' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('ats')}
          >
            ATS Analyzer
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'matcher' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('matcher')}
          >
            CV-Job Matcher
          </button>
        </div>
        
        <div className={styles.tabContent}>
          {activeTab === 'ats' ? <ATSAnalyzer /> : <CVJobMatcher />}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
