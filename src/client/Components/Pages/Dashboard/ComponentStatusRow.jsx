// @flow

import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

import ActionButton from 'client/Components/Pages/Dashboard/ActionButton';

type ComponentStatusRowProps = {
  component: ComponentDashboardEntry
};

export default function ComponentStatusRow(props: ComponentStatusRowProps) {
  const componentStatus = props.component.isDeploying ? 'Deploying' : props.component.deploymentIntention;
  return (
    <TableRow>
      <TableCell><Link to={`/component/${props.component.username}/${props.component.componentName}`}><Button color="primary">{ props.component.componentName }</Button></Link></TableCell>
      <TableCell><Typography variant="h6">{componentStatus}</Typography></TableCell>
      <TableCell>
        <ActionButton component={props.component} />
      </TableCell>
    </TableRow>
  );
}
