import React from 'react';
import { Link } from 'react-router-dom';

export default class Dashboard extends React.Component {
  state = {
    isLoaded: false,
    userFunctions: {}
  };

  componentDidMount() {
    this.updateUserFunctions();
  }

  updateUserFunctions() {
    console.log('Updating user functions');
    let callResult = {};
    fetch('http://v9_website.ngrok.io/api/db/getUserFunctions')
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({ userFunctions: result, isLoaded: true });
      }
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

    return (
      <div>
        <ul>
          {this.state.userFunctions.map((item) => (<li><Link to={`/component/${item.github_username}/${item.github_repo}`}>{item.github_repo}</Link></li>))}
        </ul>
      </div>
    );
  }
}
