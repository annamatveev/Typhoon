import React from 'react';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';
import drilldown from 'highcharts-drilldown';
import transposeDataForBarChart from './transposeDataForBarChart';
import buildConfig from './buildConfig';

drilldown(Highcharts);

class MonthlyBarView extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.onLoad();
  }
  mergeTxns(txns) {
    return txns.reduce((accumulator, card) => accumulator.concat(card.txns), []);
  }
  render() {
    const { data } = this.props;
    const config = buildConfig(transposeDataForBarChart(this.mergeTxns(data.get('txns')), false));
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
