
import { take, spawn, call, put } from 'redux-saga/effects';
import { LOAD_DATA } from 'containers/TyphoonProvider/constants';
import { dataLoaded, dataLoadingError } from 'containers/TyphoonProvider/actions';

import request from 'utils/request';

export function* getCreditCardData() {
  const txnsURL = 'http://localhost:3000/api/scraper';
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
  yield take(LOAD_DATA);
  yield spawn(getCreditCardData);
}
