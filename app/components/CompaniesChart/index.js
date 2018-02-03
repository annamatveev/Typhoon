import React from 'react';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';
import drilldown from 'highcharts-drilldown';
drilldown(Highcharts);

const getCompanyCategory = (company, places) => (places[company] && places[company] !== true && places[company].types[0]) || 'Unknown';

const addCategoryToTransactions = (transactions, places) => transactions.map((transaction) => Object.assign({ category: getCompanyCategory(transaction.description, places) }, transaction));

const bucketifyByCategory = (transactions) => transactions.reduce((result, current) => {
  const newBuckets = Object.assign({}, result);
  if (!newBuckets[current.category]) {
    newBuckets[current.category] = {
      sum: 0,
      transactions: [],
    };
  }
  newBuckets[current.category].sum += current.chargedAmount;
  newBuckets[current.category].transactions.push(current);
  return newBuckets;
}, {});

const bucketifyByCompany = (transactions) => transactions.reduce((result, current) => {
  const newBuckets = Object.assign({}, result);
  if (!newBuckets[current.description]) {
    newBuckets[current.description] = {
      sum: 0,
      transactions: [],
    };
  }
  newBuckets[current.description].sum += current.chargedAmount;
  newBuckets[current.description].transactions.push(current);
  return newBuckets;
}, {});

const buildDrilldown = function (chargedAmountBuckets) {
  const txnsDrilldown = [];
  for (const category in chargedAmountBuckets) {
    const buckets = bucketifyByCompany(chargedAmountBuckets[category].transactions);
    const dataBuckets = Object.keys(buckets).map((bk) => [bk, Math.abs(buckets[bk].sum)]);
    const categoryDrilldown = {
      id: category.toLowerCase(),
      data: dataBuckets,
    };
    txnsDrilldown.push(categoryDrilldown);
  }
  return txnsDrilldown;
};

const CompaniesChart = ({ creditCardTransactions, places }) => {
  const chargedAmountBuckets = bucketifyByCategory(addCategoryToTransactions(creditCardTransactions, places));
  const chargedAmountPercentageBuckets = [];
  for (const key in chargedAmountBuckets) {
    chargedAmountPercentageBuckets.push(
      {
        name: key,
        y: Math.abs(chargedAmountBuckets[key].sum),
        drilldown: key.toLowerCase(),
      });
  }

  const config = {
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
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
          },
        },
      },
    },
    series: [{
      name: 'Spent',
      colorByPoint: true,
      data: chargedAmountPercentageBuckets,
    }],
    drilldown: {
      series: buildDrilldown(chargedAmountBuckets),
    },
  };
  return (
    <ReactHighcharts config={config} />
  );
};

CompaniesChart.propTypes = {
  creditCardTransactions: PropTypes.array,
  places: PropTypes.any,
};

export default CompaniesChart;
