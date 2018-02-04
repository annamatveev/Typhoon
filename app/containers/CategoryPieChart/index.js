import { connect } from 'react-redux';
import { compose } from 'redux';
import CategoryPieChartView from 'components/CategoryPieChartView';
import { createStructuredSelector } from 'reselect';
import { makeSelectTxns, makeSelectMergedTxns, makeSelectPlaces, makeSelectLoading, makeSelectError } from 'containers/TyphoonProvider/selectors';
import { loadData } from 'containers/TyphoonProvider/actions';

export function mapDispatchToProps(dispatch) {
  return {
    onLoad: () => dispatch(loadData()),
  };
}

const mapStateToProps = createStructuredSelector({
  txns: makeSelectTxns(),
  mergedTxns: makeSelectMergedTxns(),
  places: makeSelectPlaces(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});


const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(CategoryPieChartView);
