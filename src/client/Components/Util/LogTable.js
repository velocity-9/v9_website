import React from 'react';

export default class LogTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      github_repo: this.props.github_repo,
      isLoaded: false
    };
  }

  componentDidMount() {
    this.getComponentLogs();
  }

  getComponentLogs() {
    fetch(`http://v9_website.ngrok.io/api/db/getComponentLogs?component=${this.state.github_repo}`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({ isLoaded: true, componentLogs: result });
      }
    );
  }

  render() {
    if (!this.state.isLoaded) {
      return (<p />);
    }

    const numEntries = 50;

    return (
      <div>
        <table border="1">
          <tr>
            <th>Execution Number</th>
            <th>Log Text</th>
            <th>Log Error</th>
          </tr>
          {this.state.componentLogs.slice(0, numEntries).map(entry => (
            <tr>
              <td>{entry.execution_num}</td>
              <td>{entry.log_text}</td>
              <td>{entry.log_error}</td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
