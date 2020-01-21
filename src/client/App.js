import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CookiesProvider, withCookies } from 'react-cookie';

import Home from './Components/Pages/Home';
import SignIn from './Components/Pages/SignIn';
import Dashboard from './Components/Pages/Dashboard';
import ComponentStatus from './Components/Pages/ComponentStatus';

export default class App extends React.Component {

  render() {
    return (
      <CookiesProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/component/:user/:component" component={ComponentStatus} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
      </CookiesProvider>
    );
  }
}
