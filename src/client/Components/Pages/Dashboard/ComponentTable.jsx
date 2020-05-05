// @flow

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import React from 'react';

import ComponentStatusRow from 'client/Components/Pages/Dashboard/ComponentStatusRow';


type ComponentTableProps = {
  components: Array<DeployedComponentEntry>
};

export default function ComponentTable(props: ComponentTableProps) {
  if (props.components === null || props.components === undefined) {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {props.components.map((item: DeployedComponentEntry) => (
            <ComponentStatusRow component={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
