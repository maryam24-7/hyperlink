import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function KeywordChart({ matched, missing }) {
  const data = {
    labels: ['Matched Keywords', 'Missing Keywords'],
    datasets: [
      {
        data: [matched.length, missing.length],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderColor: ['#388E3C', '#D32F2F'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value} keywords`;
          }
        }
      }
    },
  };

  return (
    <div className="max-w-xs mx-auto">
      <Pie data={data} options={options} />
    </div>
  );
}
