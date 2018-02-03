import { fromJS } from 'immutable';
import {
  LOAD_DATA_SUCCESS,
  LOAD_DATA,
  LOAD_DATA_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  data: { txns: [], places: [] },
});

function typhoonProviderReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['data', 'places'], [])
        .setIn(['data', 'txns'], []);
    case LOAD_DATA_SUCCESS:
      return state
        .setIn(['data', 'places'], action.data.places)
        .setIn(['data', 'txns'], action.data.txns)
        .set('loading', false);
    case LOAD_DATA_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}



export default typhoonProviderReducer;
