import { createSelector } from 'reselect';

/**
 * Direct selector to the typhoonProvider state domain
 */
const selectTyphoonProviderDomain = (state) => state.get('typhoonProvider');

const makeSelectLoading = () => createSelector(
  selectTyphoonProviderDomain,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectTyphoonProviderDomain,
  (globalState) => globalState.get('error')
);

const makeSelectData = () => createSelector(
  selectTyphoonProviderDomain,
  (globalState) => globalState.get('data')
);

const makeSelectTxns = () => createSelector(
  makeSelectData(),
  (data) => data.get('txns')
);

const makeSelectMergedTxns = () => createSelector(
  makeSelectTxns(),
  (txns) => txns.reduce((accumulator, card) => accumulator.concat(card.txns), []),
);

const makeSelectPlaces = () => createSelector(
  makeSelectData(),
  (data) => data.get('places')
);

const makeSelectTyphoonProvider = () => createSelector(
  selectTyphoonProviderDomain,
  (substate) => substate.toJS()
);

export default makeSelectTyphoonProvider;
export {
  selectTyphoonProviderDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectTxns,
  makeSelectMergedTxns,
  makeSelectPlaces,
};
