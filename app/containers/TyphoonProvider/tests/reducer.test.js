
import { fromJS } from 'immutable';
import typhoonProviderReducer from '../reducer';

describe('typhoonProviderReducer', () => {
  it('returns the initial state', () => {
    expect(typhoonProviderReducer(undefined, {})).toEqual(fromJS({}));
  });
});
