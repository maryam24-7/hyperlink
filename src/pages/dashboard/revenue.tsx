import { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { AnalyticsCharts } from "../../components/Analytics/Charts";
import GeoMap from "../../components/Analytics/GeoMap";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function RevenueDashboard() {
  const [analytics, setAnalytics] = useState({ 
    clicksByDay: [], clicksByCountry: [], revenue: 0 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(query(collection(db, "analytics")), snap => {
      let byDay = {};
      let byCountry = {};
      let totalRevenue = 0;
      snap.forEach(doc => {
        const { date, country, clicks, revenue } = doc.data();
        if (date) byDay[date] = (byDay[date] || 0) + (clicks || 0);
        if (country) byCountry[country] = (byCountry[country] || 0) + (clicks || 0);
        if (revenue) totalRevenue += revenue;
      });
      setAnalytics({
        clicksByDay: Object.entries(byDay).map(([date, clicks]) => ({ date, clicks })),
        clicksByCountry: Object.entries(byCountry).map(([country, clicks]) => ({ country, clicks })),
        revenue: totalRevenue
      });
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <LoadingSpinner message="Loading analytics" />;

  return (
    <div>
      <h1>Revenue & Analytics</h1>
      <div className="card">
        <b>Total Revenue:</b> ${analytics.revenue.toFixed(2)}
      </div>
      <AnalyticsCharts 
        clicksByDay={analytics.clicksByDay}
        clicksByCountry={analytics.clicksByCountry}
      />
      <GeoMap countryStats={analytics.clicksByCountry} />
    </div>
  );
}
