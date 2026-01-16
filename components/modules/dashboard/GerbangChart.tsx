import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

function GerbangChart() {
  const option = {
    chart: {
      height: 350,
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [
        'Gerbang 1',
        'Gerbang 2',
        'Gerbang 3',
        'Gerbang 4',
        'Gerbang 5',
      ],
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
  };

  const series = [
    {
      data: [21, 22, 10, 28, 16],
    },
  ];

  return (
    <div className="h-75 w-125">
      <ApexChart type="bar" options={option} series={series} />
    </div>
  );
}

export default GerbangChart;
