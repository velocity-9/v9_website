// @flow

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import React from 'react';

import EnableComponentRow from 'client/Components/Pages/Dashboard/EnableComponentRow';

type EnableComponentTableProps = {
  components: Array<string>
};

export default function ComponentTable(props: EnableComponentTableProps) {
  console.log(props.components);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {props.components.map((item: string) => (
            <EnableComponentRow component={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
