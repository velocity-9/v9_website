// @flow

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';

import { makePostRequest } from 'client/util';

type ActionButtonProps = {
  component: ComponentDashboardEntry
};

export default function ActionButton(props: ActionButtonProps) {
  const [open, setOpen] = React.useState(false);

  const changeButtonState = async () => {
    const newDeploymentIntention = props.component.deploymentIntention === 'active' ? 'paused' : 'active';

    const apiUrl = '/api/component/sendDeploymentIntention';
    const body = {
      componentName: props.component.componentName,
      deploymentIntention: newDeploymentIntention
    };

    const response = await makePostRequest(apiUrl, JSON.stringify(body));
    if (!response.ok) {
      console.log('Failed to make secure POST call');
      setOpen(true);
    }
  };

  const handleClose = (event?: Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" variant="contained" onClick={changeButtonState} disabled={props.component.isDeploying}>
        {props.component.deploymentIntention === 'active' ? 'Pause' : 'Activate'}
      </Button>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error">
          Failed to change component state
        </MuiAlert>
      </Snackbar>
    </div>

  );
}
