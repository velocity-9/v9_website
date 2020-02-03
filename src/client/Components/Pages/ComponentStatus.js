import React from 'react';
import StatTable from '../Util/StatTable';
import LogTable from '../Util/LogTable';
import NavBar from '../Util/NavBar';

export default class ComponentStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      github_repo: this.props.match.params.component,
    };
  }

  render() {
    return (
      <div>
        <NavBar isAuthenticated />
        <h1>
          { this.state.github_repo}
          {' '}
          Status:
        </h1>
        <LogTable github_repo={this.state.github_repo} />
        <br />
        <StatTable github_repo={this.state.github_repo} />
        <br />
      </div>
    );
  }
}
