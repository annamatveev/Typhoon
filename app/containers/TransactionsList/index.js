import { connect } from 'react-redux';
import { compose } from 'redux';
import TransactionsListView from 'components/TransactionsListView';
import { createStructuredSelector } from 'reselect';
import { makeSelectData, makeSelectLoading, makeSelectError } from 'containers/TyphoonProvider/selectors';
import { loadData } from '../TyphoonProvider/actions';

export function mapDispatchToProps(dispatch) {
  return {
    onLoad: () => dispatch(loadData()),
  };
}

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});


const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(TransactionsListView);
