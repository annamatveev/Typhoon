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
      chargedAmount: 0,
      txns: [],
    };
  }
  newBuckets[dateString].chargedAmount += current.chargedAmount;
  const total = result.total + current.chargedAmount;
  newBuckets[dateString].txns.push(current);
  return { total, buckets: newBuckets };
}, { total: 0, buckets: {} });

const normalizeDataForChart = function (chargedAmountBuckets) {
  const chargedAmountPercentageBuckets = [];
  for (const key in chargedAmountBuckets.buckets) {
    chargedAmountPercentageBuckets.push(
      {
        name: key,
        date: parseInt(key.split('/').join(''), 10),
        y: Math.abs(chargedAmountBuckets.buckets[key].chargedAmount),
      });
  }
  return chargedAmountPercentageBuckets.sort((a, b) => a.date - b.date);
};

const transposeDataForBarChart = function (txns, isDrilldown) {
  return normalizeDataForChart(bucketify(txns));
};

export default transposeDataForBarChart;
