/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { makeSelectLocale } from './selectors';
import LanguageProvider from 'components/LanguageProvider';

const mapStateToProps = createSelector(
  makeSelectLocale(),
  (locale) => ({ locale })
);

export default connect(mapStateToProps)(LanguageProvider);
