// @flow

import Button from '@material-ui/core/Button';
import React from 'react';

type Props = {
  isAuthenticated: boolean
};

export default function LoginButton(props: Props) {
  const handleLogin = () => {
    window.open('http://v9_website.ngrok.io/api/auth/github', '_self');
  };

  const handleLogout = () => {
    window.open('http://v9_website.ngrok.io/api/auth/logout', '_self');
  };

  return (
    <div>
      {props.isAuthenticated ? (
        <div>
          <Button variant="contained" onClick={handleLogout}>Log Out</Button>
        </div>
      ) : (
        <Button variant="contained" onClick={handleLogin}>Sign In</Button>
      )}
    </div>
  );
}
