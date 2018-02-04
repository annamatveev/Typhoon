import React from 'react';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';
import transposeDataForBarChart from './normalizeDataForBarChart';
import buildConfig from './buildConfig';

import highchartsDrilldownWrapper from '../highchartsDrilldownWrapper';
highchartsDrilldownWrapper(Highcharts);

class MonthlyBarView extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.onLoad();
  }
  render() {
    const { data } = this.props;
    const txns = data.get('txns').reduce((accumulator, card) => accumulator.concat(card.txns), []);
    const config = buildConfig(transposeDataForBarChart(txns, false));
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
