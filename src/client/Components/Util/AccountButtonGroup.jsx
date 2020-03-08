// @flow

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

type AccountButtonGroupProps = {
  username: string
};

export default function AccountButtonGroup(props: AccountButtonGroupProps) {
  const handleLogout = () => {
    window.open('http://v9_website.ngrok.io/api/auth/logout', '_self');
  };

  return (
    <ButtonGroup size="small" color="primary">
      <Button variant="outlined" component={RouterLink} to="/dashboard">Dashboard</Button>
      <Button variant="outlined" onClick={handleLogout}>
        <Avatar>{props.username.charAt(0)}</Avatar>
        &nbsp;
        Logout
      </Button>
    </ButtonGroup>
  );
}
