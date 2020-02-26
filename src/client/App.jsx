// @flow

import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ComponentStatusPage from 'client/Components/Pages/ComponentStatusPage/ComponentStatusPage';
import DashboardPage from 'client/Components/Pages/Dashboard/DashboardPage';
import HomePage from 'client/Components/Pages/Home/HomePage';
import ProtectedRoute from 'client/Components/Util/ProtectedRoute';
import { validateAuth } from 'client/util';

type AppState = {
  username: ?string
};

export default class App extends React.Component<void, AppState> {
  constructor() {
    super();
    this.state = {
      username: null
    };
  }

  componentDidMount(): void {
    validateAuth().then((result: AppState) => {
      this.setState(result);
    });
  }

  render() {
    return (
      <CookiesProvider>
        <BrowserRouter>
          <Switch>
            <ProtectedRoute path="/dashboard" component={DashboardPage} username={this.state.username} />
            <ProtectedRoute path="/component/:user/:component" component={ComponentStatusPage} username={this.state.username} />
            <Route
              path="/"
              render={(props) => (
                <HomePage
                  {...props}
                  username={this.state.username}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </CookiesProvider>
    );
  }
}
