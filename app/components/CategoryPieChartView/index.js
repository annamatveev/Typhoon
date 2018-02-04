import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';

import buildConfig from './buildConfig';
import { normalizeDataForPieChart } from './normalizeDataForPieChart';
import highchartsDrilldownWrapper from '../highchartsDrilldownWrapper';
highchartsDrilldownWrapper(Highcharts);

class CategoryPieChartView extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.onLoad();
  }
  render() {
    const { mergedTxns, places } = this.props;
    const config = buildConfig(normalizeDataForPieChart(mergedTxns, { map: places, to: 'category', from: 'description' }, true)); // TODO: Split to labels and normalize
    return (
      <ReactHighcharts config={config} />
    );
  }
}

CategoryPieChartView.propTypes = {
  mergedTxns: PropTypes.any.isRequired,
  places: PropTypes.any.isRequired,
  onLoad: PropTypes.func.isRequired,
};

export default CategoryPieChartView;
