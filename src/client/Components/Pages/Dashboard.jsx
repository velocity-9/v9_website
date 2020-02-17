// @flow

import React from 'react';
import { Link } from 'react-router-dom';

import validateAuth from '../../util';
import NavBar from '../Util/NavBar';

type DashboardState = {
  isAuthenticated: boolean,
  isLoaded: boolean,
  numComponents: number,
  username: string,
  userComponents: Array<ComponentId>
};

export default class Dashboard extends React.Component<void, DashboardState> {
  constructor() {
    super();


    this.state = {
      isAuthenticated: false,
      isLoaded: false,
      numComponents: 0,
      username: '',
      userComponents: []
    };
  }

  componentDidMount() {
    validateAuth().then((result) => {
      this.setState(result);
      return this.updateUserFunctions();
    });
  }

  async updateUserFunctions() {
    try {
      const result = await fetch('http://v9_website.ngrok.io/api/db/getUserComponents', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        }
      });

      if (!result.ok) {
        throw new Error(result.statusText);
      }

      const json = await result.json();
      if (json.error) {
        this.setState({ isLoaded: true });
      } else {
        console.log(json);
        this.setState({ isLoaded: true, userComponents: json, numComponents: json.length });
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div>
          <p>Loading...</p>
          {this.state.isAuthenticated ? (
            <p>Authenticated: true</p>
          ) : (
            <p>Authenticated: false</p>
          )}
        </div>
      );
    }

    return (
      <div>
        <NavBar isAuthenticated={this.state.isAuthenticated} />
        <h1>Component Dashboard</h1>
        <h2>
          Components for
          {this.state.username}
          :
        </h2>
        {this.state.numComponents === 0 ? (
          <h4>No components exist, add one to V9!</h4>
        ) : (
          <ul>
            {this.state.userComponents.map((item: ComponentId) => (
              <li>
                <Link to={`/component/${item.github_username}/${item.github_repo}`}>
                  {item.github_repo}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
