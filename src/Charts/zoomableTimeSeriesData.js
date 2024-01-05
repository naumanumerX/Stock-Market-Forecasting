import React from 'react';
import ReactApexChart from 'react-apexcharts';
import dayjs from 'dayjs';


const TimeSeriesChart = ({ stockData, stockSymbol, customDays }) => {
  const timeSeriesData = [];

  if (!stockData) {
    return <div>Stock data is not available.</div>;
  }

  Object.entries(stockData)
    .slice(0, customDays)
    .forEach(([date, value]) => {
      timeSeriesData.push({
        x: new Date(date).getTime(),
        y: [value['1. open'], value['2. high'], value['3. low'], value['4. close']],
      });
    });

  const options = {
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: 'zoom',
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: `Time Series Chart - ${stockSymbol}`,
      align: 'left',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
      title: {
        text: 'Price',
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (val) {
          return dayjs(val).format('MMM DD HH:mm');
        },
      },
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
    },
  };

  return (
    <div className="chart-component">
      <h3 style={{ textAlign: 'center' }}>
        <u>Time Series Chart</u>
      </h3>

      <div className="chart">
        <ReactApexChart
          series={[
            {
              data: timeSeriesData,
            },
          ]}
          options={options}
          type="area"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default TimeSeriesChart;
