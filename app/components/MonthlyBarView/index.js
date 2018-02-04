import React from 'react';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';
import drilldown from 'highcharts-drilldown';
drilldown(Highcharts);

function formatDate(date) {
  const mm = date.getMonth() + 1;

  return [date.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
  ].join('/');
}

const bucketify = (transactions) => transactions.reduce((result, current) => {
  const newBuckets = Object.assign({}, result.buckets);
  const dateString = formatDate(new Date(current.date));
  if (!newBuckets[dateString]) {
    newBuckets[dateString] = {
      sum: 0,
      transactions: [],
    };
  }
  newBuckets[dateString].sum += current.chargedAmount;
  const total = result.total + current.chargedAmount;
  newBuckets[dateString].transactions.push(current);
  return { total, buckets: newBuckets };
}, { total: 0, buckets: {} });

const normalizeDataForChart = function (chargedAmountBuckets) {
  const chargedAmountPercentageBuckets = [];
  for (const key in chargedAmountBuckets.buckets) {
    chargedAmountPercentageBuckets.push(
      {
        name: key,
        date: parseInt(key.split('/').join(''), 10),
        y: Math.abs(chargedAmountBuckets.buckets[key].sum),
      });
  }
  console.log(chargedAmountPercentageBuckets);
  return chargedAmountPercentageBuckets.sort((a, b) => a.date - b.date);
}

class MonthlyBarView extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const { data } = this.props;
    const mergedTxns = data.get('txns').reduce((accumulator, card) => accumulator.concat(card.txns), []);
    const chargedAmountBuckets = normalizeDataForChart(bucketify(mergedTxns));
    const config = {
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
        data: chargedAmountBuckets,
      }],
    };
    return (
      <ReactHighcharts config={config} />
    );
  }
}

MonthlyBarView.propTypes = {
  data: PropTypes.object.isRequired,
  onLoad: PropTypes.func.isRequired,
};

export default MonthlyBarView;
