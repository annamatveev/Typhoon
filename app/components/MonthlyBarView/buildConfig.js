const buildConfig = function (data) {
  return {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'column',
    },
    title: {
      text: 'Amount Spent by Month',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y:.1f} ILS</b>',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      title: {
        text: 'Total spent',
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:.1f} ILS',
        },
      },
    },
    series: [{
      name: 'Money Spent',
      colorByPoint: true,
      data,
    }],
  };
};

export default buildConfig;
