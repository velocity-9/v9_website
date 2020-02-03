import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import Home from './Components/Pages/Home';
import Dashboard from './Components/Pages/Dashboard';
import ComponentStatus from './Components/Pages/ComponentStatus';

export default function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/component/:user/:component" component={ComponentStatus} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </CookiesProvider>
  );
}
