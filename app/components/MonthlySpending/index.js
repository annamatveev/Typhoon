import React from 'react';
import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function formatDate(date) {
  const mm = date.getMonth() + 1;

  return [date.getFullYear(),
    '/',
    (mm > 9 ? '' : '0') + mm,
  ].join('');
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

const MonthlySpending = ({ creditCardTransactions }) => {
  const chargedAmountBuckets = bucketify(creditCardTransactions);
  const chargedAmountPercentageBuckets = [];
  for (const key in chargedAmountBuckets.buckets) {
    chargedAmountPercentageBuckets.push(
      {
        name: key,
        y: Math.abs(chargedAmountBuckets.buckets[key].sum),
      });
  }

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
      data: chargedAmountPercentageBuckets,
    }],
  };
  return (
    <ReactHighcharts config={config} />
  );
}
  ;

MonthlySpending.propTypes = {
  creditCardTransactions: PropTypes.array,
};

export default MonthlySpending;
