import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CircularProgress from '@material-ui/core/CircularProgress';

import './index.css';
import './i18n';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<CircularProgress />}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
