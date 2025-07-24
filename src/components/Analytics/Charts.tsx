import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Tooltip, Legend, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export function AnalyticsCharts({ clicksByDay, clicksByCountry }) {
  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#6366f1', '#14b8a6', '#8b5cf6'];
  return (
    <div>
      <h2>Traffic Over Time</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={clicksByDay}>
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="clicks" stroke="#4f46e5" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>

      <h2>Clicks by Country</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={clicksByCountry}>
          <XAxis dataKey="country" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="clicks" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Country Share</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={clicksByCountry} dataKey="clicks" nameKey="country" cx="50%" cy="50%" outerRadius={80} fill="#f59e0b" label>
            {clicksByCountry.map((entry, idx) => (
              <Cell key={entry.country} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
