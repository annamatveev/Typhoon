/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';
import HomePage from 'components/HomePage';
import { makeSelectData, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import { loadData } from '../App/actions';
import saga from './saga';


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

const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withSaga,
  withConnect,
)(HomePage);
