const buildConfig = function (data) {
  return {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: 'Amount Spent by Category',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b> (<b>{point.y:.1f} ILS</b>)',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          useHTML: true,
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f}%',
        },
      },
    },
    series: [{
      name: 'Spent',
      colorByPoint: true,
      data: data.data,
    }],
    drilldown: {
      series: data.drilldown,
    },
  };
};

export default buildConfig;
