import React, { useEffect, useState } from 'react';

import Main from './components/Main';

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

        <Route path='/pokemon'>
          <Main />
        </Route>

        <Route path='/pokemon/:id'>
          <div>POKEMON</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
