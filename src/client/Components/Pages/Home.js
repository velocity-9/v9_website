import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';

function TopBar() {
  return (
    <React.Fragment>
      <Grid item xs={1}>
        <Paper>V9 Logo</Paper>
      </Grid>
      <Grid item xs={3}>
        <Button variant={'contained'} component={RouterLink} to={'/sign-in'}>Login</Button>
      </Grid>
    </React.Fragment>
  );
}

class Home extends React.Component {
  render() {
    return (
      <div>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3} justify={'space-between'}>
            <TopBar/>
          </Grid>
          <Grid container item xs={12} spacing={3} justify={'center'}>
            <Grid item xs={6}>
              <Paper>Engaging blurb about V9!</Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Home;
