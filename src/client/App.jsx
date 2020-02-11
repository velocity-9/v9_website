import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ComponentStatus from './Components/Pages/ComponentStatus';
import Dashboard from './Components/Pages/Dashboard';
import Home from './Components/Pages/Home';

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
