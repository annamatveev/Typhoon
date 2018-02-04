/**
 *
 * Asynchronously loads the component for MonthlyBarView
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
