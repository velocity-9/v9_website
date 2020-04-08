// @flow

import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import React from 'react';
import { Link } from 'react-router-dom';

import ActionButton from 'client/Components/Pages/Dashboard/ActionButton';

type ComponentStatusRowProps = {
  component: DeployedComponentEntry
};

export default function ComponentStatusRow(props: ComponentStatusRowProps) {
  let componentStatus = 'Pending';
  let statusColor = { color: blue[600] };
  if (props.component.isDeploying) {
    componentStatus = 'Deploying';
  } else if (props.component.deploymentIntention === 'paused') {
    componentStatus = 'Paused';
    statusColor = { color: yellow[500] };
  } else if (props.component.deploymentIntention === 'active' && props.component.isRunning) {
    componentStatus = 'Running';
    statusColor = { color: green[500] };
  }

  return (
    <TableRow>
      <TableCell><Link to={`/component/${props.component.username}/${props.component.componentName}`}><Button color="primary">{ props.component.componentName }</Button></Link></TableCell>
      <TableCell>
        <FiberManualRecordIcon fontSize="large" style={statusColor} />
      </TableCell>
      <TableCell><Typography variant="h6">{componentStatus}</Typography></TableCell>
      <TableCell>
        <ActionButton component={props.component} />
      </TableCell>
    </TableRow>
  );
}
