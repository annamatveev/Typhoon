const normalizeDataForPieDrilldown = function (buckets, drilldownBy) {
  const dataDrilldown = [];
  for (const label in buckets) {
    const drilldownedBuckets = bucketify(buckets[label].originalData, drilldownBy);
    const dataBuckets = Object.keys(drilldownedBuckets).map((bk) => [bk, Math.abs(drilldownedBuckets[bk].chargedAmount)]);
    const labelDrilldown = {
      id: label.toLowerCase(),
      data: dataBuckets,
    };
    dataDrilldown.push(labelDrilldown);
  }
  return dataDrilldown;
};

const bucketify = (data, bucketifyBy) => data.reduce((result, current) => {
  const buckets = Object.assign({}, result);
  if (!buckets[current[bucketifyBy]]) {
    buckets[current[bucketifyBy]] = {
      chargedAmount: 0,
      originalData: [],
    };
  }
  buckets[current[bucketifyBy]].chargedAmount += current.chargedAmount;
  buckets[current[bucketifyBy]].originalData.push(current);
  return buckets;
}, {});

const findLabel = (datum, labels, fromLabel) =>
  (labels[datum[fromLabel]] && labels[datum[fromLabel]] !== true && labels[datum[fromLabel]].types[0]) || 'Unknown';

const labelData = (data, labels, fromLabel, toLabel) =>
  data.map((datum) => {
    const labeled = Object.assign({}, datum);
    labeled[toLabel] = findLabel(datum, labels, fromLabel);
    return labeled;
  });

export const normalizeDataForPieChart = function (data, drilldownMapping) {
  const labeledData = labelData(data, drilldownMapping.map, drilldownMapping.from, drilldownMapping.to);
  const labelBuckets = bucketify(labeledData, drilldownMapping.to);
  const dataPoints = [];
  for (const label in labelBuckets) {
    const dataPoint = {
      name: label,
      y: Math.abs(labelBuckets[label].chargedAmount),
    };
    if (drilldownMapping) {
      dataPoint.drilldown = label.toLowerCase();
    }
    dataPoints.push(dataPoint);
  }
  if (drilldownMapping) {
    return {
      data: dataPoints,
      drilldown: normalizeDataForPieDrilldown(labelBuckets, drilldownMapping.from),
    };
  }
  return {
    data: dataPoints,
  };
};
