import React from 'react';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

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

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={this.updateComponents}>
              <Icon className="fas fa-sync" />
            </IconButton>
          </Toolbar>
        </AppBar>

        <ul>
          {items.map(worker => (
            <li key={worker.worker_id}>{worker.worker_id}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
