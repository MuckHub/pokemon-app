import React from 'react';

import Main from './components/Main';
import Detailed from './components/Detailed';
import NotFound from './components/404';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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

        <Route path='/pokemon/:id'>
          <Detailed />
        </Route>

        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
