import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './screens/Home/Home';
import Detail from './screens/Single/Detail';
import error404 from './screens/NotFound/error404';

const Router = () => (
  <BrowserRouter>
  <div className="main">
    <Switch>
      <Route
        exact
        path="/"
        component={Home}
      />
      <Route
        exact
        path="/movie/:movieid"
        component={Detail}
          />
      <Route
        component={error404}
      />
    </Switch>
  </div>
  </BrowserRouter>
);

export default Router;
