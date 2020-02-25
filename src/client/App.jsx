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
  username?: string,
  isAuthenticated: boolean
};

export default class App extends React.Component<void, AppState> {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false
    };
  }

  componentDidMount(): void {
    validateAuth().then((result: AppState) => {
      if (result.isAuthenticated) {
        this.setState({
          username: result.username,
          isAuthenticated: result.isAuthenticated
        });
      }
    });
  }

  render() {
    return (
      <CookiesProvider>
        <BrowserRouter>
          <Switch>
            <ProtectedRoute path="/dashboard" component={DashboardPage} isAuthenticated={this.state.isAuthenticated} username={this.state.username} />
            <ProtectedRoute path="/component/:user/:component" component={ComponentStatusPage} isAuthenticated={this.state.isAuthenticated} username={this.state.username} />
            <Route
              path="/"
              render={(props) => (
                <HomePage
                  {...props}
                  username={this.state.username}
                  isAuthenticated={this.state.isAuthenticated}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </CookiesProvider>
    );
  }
}
