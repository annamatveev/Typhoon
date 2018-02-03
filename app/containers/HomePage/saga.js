
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_DATA } from 'containers/App/constants';
import { dataLoaded, dataLoadingError } from 'containers/App/actions';

import request from 'utils/request';

export function* getCreditCardData() {
  const txnsURL = 'http://localhost:3000/api/transactionsMock';
  const placesURL = 'http://localhost:3000/api/places';

  try {
    const txns = yield call(request, txnsURL);
    const places = yield call(request, placesURL);
    yield put(dataLoaded({ txns, places }));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}

export default function* loadData() {
  yield takeLatest(LOAD_DATA, getCreditCardData);
}
