import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTyphoonProvider from './selectors';
import reducer from './reducer';
import saga from './saga';


export class TyphoonProvider extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return React.Children.only(this.props.children);
  }
}

TyphoonProvider.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createStructuredSelector({
  typhoonprovider: makeSelectTyphoonProvider(),
});


const withConnect = connect(mapStateToProps, null);

const withReducer = injectReducer({ key: 'typhoonProvider', reducer });
const withSaga = injectSaga({ key: 'typhoonProvider', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TyphoonProvider);
