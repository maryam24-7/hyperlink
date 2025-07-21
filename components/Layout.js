import Head from 'next/head';
import AdBanner from './AdBanner';
import SEO from './SEO';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Head>
        <title>Resume ATS Checker</title>
        <meta name="description" content="Check your resume ATS compatibility" />
      </Head>
      
      <SEO />
      <AdBanner />
      
      <main className="main-content">
        {children}
      </main>
      
      <style jsx>{`
        .layout {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        .main-content {
          margin-top: 30px;
        }
      `}</style>
    </div>
  );
}
