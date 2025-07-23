import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/globals.module.css';

export default function Home() {
  const [cvText, setCvText] = useState('');
  const [jobText, setJobText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = () => {
    const keywords = ['communication', 'leadership', 'project', 'security', 'engineer', 'python'];
    const found = keywords.filter(k => cvText.toLowerCase().includes(k));
    const score = Math.floor((found.length / keywords.length) * 100);
    setAnalysisResult({ score, found });
  };

  const handleCompare = () => {
    const cvWords = cvText.toLowerCase().split(/\s+/);
    const jobWords = jobText.toLowerCase().split(/\s+/);
    const matched = jobWords.filter(w => cvWords.includes(w));
    const percent = Math.floor((matched.length / jobWords.length) * 100);
    setAnalysisResult({ comparePercent: percent, matched });
  };

  return (
    <>
      <Head>
        <title>Resume ATS Checker Pro</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.container}>
        <h1>📄 Resume ATS Checker Pro</h1>

        <textarea
          placeholder="📝 الصق سيرتك الذاتية هنا"
          value={cvText}
          onChange={e => setCvText(e.target.value)}
          className={styles.textarea}
        />

        <textarea
          placeholder="📌 الصق نص الوظيفة هنا (اختياري)"
          value={jobText}
          onChange={e => setJobText(e.target.value)}
          className={styles.textarea}
        />

        <div className={styles.buttonGroup}>
          <button onClick={handleAnalyze}>🔍 تحليل ATS يدوي</button>
          <button onClick={handleCompare}>⚖️ مقارنة مع الوظيفة</button>
        </div>

        {analysisResult && (
          <div className={styles.result}>
            {analysisResult.score !== undefined && (
              <>
                <h2>نتيجة ATS:</h2>
                <p>النسبة: {analysisResult.score}%</p>
                <p>الكلمات المكتشفة: {analysisResult.found.join(', ') || 'لا شيء'}</p>
              </>
            )}
            {analysisResult.comparePercent !== undefined && (
              <>
                <h2>مقارنة مع الوظيفة:</h2>
                <p>نسبة التشابه: {analysisResult.comparePercent}%</p>
                <p>الكلمات المتطابقة: {analysisResult.matched.join(', ') || 'لا شيء'}</p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
