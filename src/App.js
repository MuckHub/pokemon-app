import React, { useEffect, useState } from 'react';

import Main from './components/Main';
import Detailed from './components/Detailed';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>

        <Route exact path='/pokemon'>
          <Main />
        </Route>

        <Route exact path='/pokemon/:id'>
          <Detailed />
        </Route>

        <Route path='*'>
          <div>Something went wrong</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
