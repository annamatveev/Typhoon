const getCompanyCategory = (company, places) => (places[company] && places[company] !== true && places[company].types[0]) || 'Unknown';

export const addCategoryToTransactions = (transactions, places) => transactions.map((transaction) => Object.assign({ category: getCompanyCategory(transaction.description, places) }, transaction));

export const bucketifyByCategory = (transactions) => transactions.reduce((result, current) => {
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

export const bucketifyByCompany = (transactions) => transactions.reduce((result, current) => {
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

export const buildDrilldown = function (chargedAmountBuckets) {
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

export const normalizeDataForChart = function (txns, categories, isDrilldown) {
  const chargedAmountBuckets = bucketifyByCategory(addCategoryToTransactions(txns, categories));
  const chargedAmountPercentageBuckets = [];
  for (const key in chargedAmountBuckets) {
    const point = {
      name: key,
      y: Math.abs(chargedAmountBuckets[key].sum),
    };
    if (isDrilldown) {
      point.drilldown = key.toLowerCase();
    }
    chargedAmountPercentageBuckets.push(point);
  }
  if (isDrilldown) {
    return { data: chargedAmountPercentageBuckets, drilldown: buildDrilldown(chargedAmountBuckets) };
  }
  return { data: chargedAmountPercentageBuckets };
};
