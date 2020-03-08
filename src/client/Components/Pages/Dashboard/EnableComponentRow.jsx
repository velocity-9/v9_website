// @flow

import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';

type EnableComponentRowProps = {
  component: ComponentDashboardEntry
};

export default function EnableComponentRow(props: EnableComponentRowProps) {
  const changeButtonState = async () => {
    const newDeploymentIntention = 'active';

    const apiUrl = '/api/db/sendDeploymentIntention';
    const body = {
      componentName: props.component.componentName,
      deploymentIntention: newDeploymentIntention
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      console.log('Failed to make secure POST call');
      throw new Error('Error making POST call!');
    }
  };

  return (
    <TableRow>
      <TableCell>{props.component.componentName}</TableCell>
      <TableCell><Button color="primary" variant="contained" onClick={changeButtonState}>Start</Button></TableCell>
    </TableRow>
  );
}
