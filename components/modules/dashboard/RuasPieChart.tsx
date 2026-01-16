import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

function RuasPieChart() {
  const options = {
    labels: ['Ruas 1', 'Ruas 2', 'Ruas 3'],
  };

  const series = [44, 55, 41];

  return (
    <div className="h-87.5 w-112.5">
      <ApexChart type="donut" options={options} series={series} />
    </div>
  );
}

export default RuasPieChart;
