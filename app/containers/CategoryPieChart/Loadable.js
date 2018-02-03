/**
 *
 * Asynchronously loads the component for CategoryPieChart
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
