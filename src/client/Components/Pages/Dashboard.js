import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Util/NavBar';

export default class Dashboard extends React.Component {
  state = {
    isAuthenticated: false,
    username: '',
    isLoaded: false,
    userFunctions: {},
    numComponents: 0
  };

  componentDidMount() {
    this.validateAuth();
  }

  validateAuth() {
    fetch('http://v9_website.ngrok.io/api/auth/validateAuth', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
      }
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error('Failed to authenticate user');
      })
      .then((responseJson) => {
        this.setState({
          isAuthenticated: true,
          username: responseJson.user.username
        });
        this.updateUserFunctions();
      });
  }

  updateUserFunctions() {
    fetch('http://v9_website.ngrok.io/api/db/getUserFunctions', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.error) {
            this.setState({ isLoaded: true });
          } else {
            console.log(result);
            this.setState({
              isLoaded: true,
              userFunctions: result,
              numComponents: result.length
            });
          }
        }
      );
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
            {this.state.userFunctions.map(item => (
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
