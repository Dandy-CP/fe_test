import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

function ShiftPieChart() {
  const options = {
    labels: ['Shift 1', 'Shift 2', 'Shift 3'],
  };

  const series = [44, 55, 41];

  return (
    <div className="h-87.5 w-112.5">
      <ApexChart type="donut" options={options} series={series} />
    </div>
  );
}

export default ShiftPieChart;
