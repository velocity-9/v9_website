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
    fetch(`http://v9_website.ngrok.io/api/db/getComponentLogs?component=${this.state.github_repo}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
      }
    })
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
    const fixedLogText = this.state.componentLogs.map(entry => {
      if (entry.log_text != null) {
        return entry.log_text.split('\n');
      }
      return [];
    });

    console.log(fixedLogText);

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
              <td>{fixedLogText.map(item => (
                <p>{item}</p>
                ))}
              </td>
              <td>{entry.log_error}</td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
