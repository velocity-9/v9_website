// @flow

import Button from '@material-ui/core/Button';
import React from 'react';

export default function LoginButton() {
  const handleLogin = () => {
    window.open('http://v9_website.ngrok.io/api/auth/github', '_self');
  };

  return (
    <Button variant="outlined" color="primary" size="large" onClick={handleLogin}>Log In</Button>
  );
}
