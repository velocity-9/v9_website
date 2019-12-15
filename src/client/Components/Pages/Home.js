import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  root: {
      background: 'black'
  },
  logo: {
    maxWidth: 50,
  },
  // This group of buttons will be aligned to the right
  rightToolbar: {
    marginLeft: 'auto',
    marginRight: -12,
  },
  menuButton: {
    marginRight: 16,
    marginLeft: -12,
  },
});

class Home extends React.Component {
  constructor(props) {
    console.log("Test");
    super(props);
    this.state = {
      isLoaded: false,
      items: []
    };

    this.updateComponents = this.updateComponents.bind(this);
  }

  componentDidMount() {
    this.updateComponents();
  }

  updateComponents() {
    console.log('Updating components');
    fetch('http://v9_dep_mgr.patcody.io/status')
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result
        });
      }
    );
  }

  render() {
    const isLoaded = this.state.isLoaded;
    let items = this.state.items;
    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    const { classes } = this.props;

    return (
      <div>
        <AppBar position="static" color="secondary" className={classes.root}>
          <Toolbar>
            <section className={classes.menuButton}>
            <img src="/favicon.ico" alt="logo" className={classes.logo} />
            </section>
            <Typography variant="h4" edge="end" color="inherit">Welcome to Velocity 9!</Typography>
            <section className={classes.rightToolbar}>
                <IconButton edge="end" color="inherit" onClick={this.updateComponents}>
                  <Icon className="fas fa-sync" />
                </IconButton>
            </section>
          </Toolbar>
        </AppBar>

        <ul>
          {items.map(worker => {
            let data = JSON.parse(worker.status);

            return <li key={worker.worker_id}>
              Worker #{worker.worker_id}
              <ul>
                <li> CPU Usage: {data["cpu_usage"]} </li>
                <li> Memory Usage: {data["memory_usage"]} </li>
                <li> Network Failure Rate: {data["network_usage"]} </li>
                <li> Components: { "[" + data["active_components"].map( cmp => {
                    console.log(cmp);
                    return (cmp["id"]["user"] + "/" + cmp["id"]["repo"]);
                }).join(",") + "]"}
                </li>
              </ul>
            </li>;
          })}
        </ul>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};


// export default Home;
export default withStyles(styles)(Home);
