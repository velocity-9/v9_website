import React from 'react';

export default class ComponentStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      github_username: this.props.match.params.user,
      github_repo: this.props.match.params.component
    };
  }

  render() {
    return (
      <div>
        <h1>{ this.state.github_repo} Status:</h1>
      </div>
    )
  }
}