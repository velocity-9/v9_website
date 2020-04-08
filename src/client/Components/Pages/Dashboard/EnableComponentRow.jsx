// @flow

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';

import { makePostRequest } from 'client/util';

type EnableComponentRowProps = {
  component: string
};

export default function EnableComponentRow(props: EnableComponentRowProps) {
  const [open, setOpen] = React.useState(false);

  const changeButtonState = async () => {
    const apiUrl = '/api/component/sendDeploymentIntention';
    const body = {
      componentName: props.component,
      deploymentIntention: 'active'
    };

    const response = await makePostRequest(apiUrl, JSON.stringify(body));

    if (!response.ok) {
      console.log('Failed to make secure POST call');
      throw new Error('Error making POST call!');
    }
  };

  const handleClose = (event?: Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <TableRow>
      <TableCell>{props.component}</TableCell>
      <TableCell>
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error">
            Failed to change component state
          </MuiAlert>
        </Snackbar>
        <Button color="primary" variant="contained" onClick={changeButtonState}>Start</Button>
      </TableCell>
    </TableRow>
  );
}
