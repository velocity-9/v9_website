import React from 'react';
import io from 'socket.io-client';
import _ from 'underscore';
import { Link } from 'react-router-dom';

import { API_URL } from '../../../../config';

const socket = io(API_URL);

export default class Dashboard extends React.Component {
  state = {
    isAuthenticated: false,
    isLoaded: false,
    userFunctions: {}
  };

  componentDidMount() {
    this.updateUserFunctions();
  }

  updateUserFunctions() {
    fetch('http://v9_website.ngrok.io/api/db/getUserFunctions')
    .then(res => res.json())
    .then(
      (result) => {
        let users = result.map(component => component.github_username);
        let userFunctions = {};
        users.map(user => {
          userFunctions[user] = _.filter(result, (item) => item.github_username === user);
        });

        console.log(userFunctions);

        this.setState({ userFunctions, isLoaded: true });
      }
    );
  }

  renderUserComponents(user) {
    return (
      <div>
        <h3>{user}</h3>
        <ul>
          {this.state.userFunctions[user].map(name => (
            <li>{name}</li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    const users = Object.keys(this.state.userFunctions);
    return (
      <div>
        <h1>Component Dashboard</h1>
        <h2>Components:</h2>
        {users.map(user => (
          <div>
            <h3>{user}</h3>
            <ul>
              {this.state.userFunctions[user].map(item => (
                <li><Link to={`/component/${item.github_username}/${item.github_repo}`}>{item.github_repo}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}
