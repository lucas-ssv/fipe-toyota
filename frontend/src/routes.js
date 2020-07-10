import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './components/Section';
import Modelo from './pages/modelo';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/cars/toyota" component={Modelo} />
    </Switch>
  </BrowserRouter>
);

export default Routes;