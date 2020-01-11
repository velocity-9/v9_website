import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Components/Pages/Home';
import SignIn from './Components/Pages/SignIn';

export default class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/sign-in'>
            <SignIn/>
          </Route>
          <Route path='/'>
            <Home/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
