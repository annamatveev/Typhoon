import React from 'react';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';

import buildConfig from './buildConfig';
import { normalizeDataForPieChart } from './normalizeDataForPieChart';

import drilldown from 'highcharts-drilldown';
const drilldownWrapper = (Highcharts) => {
  if (!window.highchartsDrilldownLoaded) {
    window.highchartsDrilldownLoaded = true;
    drilldown(Highcharts);
  }
}


class CategoryPieChartView extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.onLoad();
  }
  render() {
    const { data } = this.props; // TODO: make select for txns and places
    const txns = data.get('txns').reduce((accumulator, card) => accumulator.concat(card.txns), []); // TODO: merge transactions
    const config = buildConfig(normalizeDataForPieChart(txns, { map: data.get('places'), to: 'category', from: 'description' }, true));
    return (
      <ReactHighcharts config={config} />
    );
  }
}

CategoryPieChartView.propTypes = {
  data: PropTypes.object.isRequired,
  onLoad: PropTypes.func.isRequired,
};

export default CategoryPieChartView;
