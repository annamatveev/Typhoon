/**
 *
 * Asynchronously loads the component for TyphoonProvider
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
