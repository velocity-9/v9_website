import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

export default class LoginButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    window.open("http://v9_website.ngrok.io/api/auth/logout", "_self");
  }

  handleLogin() {
    window.open('http://v9_website.ngrok.io/api/auth/github', '_self');
  }

  render() {
    const { isAuthenticated } = this.props;


    return (
      <div>
      {isAuthenticated ? (
        <div>
        <Button variant="contained" onClick={this.handleLogout}>Log Out</Button>
        </div>
        ) : (
          <Button variant="contained" onClick={this.handleLogin}>Sign In</Button>
        )}
      </div>
    );
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };
}