import React from 'react';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';
import drilldown from 'highcharts-drilldown';
import buildConfig from './buildConfig';
import { normalizeDataForChart } from './transposeDataForPieChart';
drilldown(Highcharts);

class CategoryPieChartView extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.onLoad();
  }
  mergeTxns(txns) {
    return txns.reduce((accumulator, card) => accumulator.concat(card.txns), []);
  }
  render() {
    const { data } = this.props;
    const config = buildConfig(normalizeDataForChart(this.mergeTxns(data.get('txns')), data.get('places'), true));
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
