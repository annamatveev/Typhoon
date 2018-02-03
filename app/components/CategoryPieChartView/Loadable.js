/**
 *
 * Asynchronously loads the component for CategoryPieChartView
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
