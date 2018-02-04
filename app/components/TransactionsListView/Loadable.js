/**
 *
 * Asynchronously loads the component for TransactionsListView
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
