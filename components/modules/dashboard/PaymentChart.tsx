import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

function PaymentChart() {
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
        'BCA',
        'BRI',
        'BNI',
        'DKI',
        'MANDIRI',
        'MEGA',
        'FLO',
        'E-TOLL',
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
      data: [21, 22, 10, 28, 16, 21, 13, 30],
    },
  ];

  return (
    <div className="h-75 w-125">
      <ApexChart type="bar" options={option} series={series} />
    </div>
  );
}

export default PaymentChart;
