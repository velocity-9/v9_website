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

  async getComponentLogs() {
    try {
      const result = await fetch(`http://v9_website.ngrok.io/api/db/getComponentLogs?component=${this.state.github_repo}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
          }
        });
      if (!result.ok) {
        throw new Error(result.statusText);
      }

      const json = result.json();
      this.setState({
        isLoaded: true,
        componentLogs: json
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (!this.state.isLoaded) {
      return (<p />);
    }

    const numEntries = 50;
    const fixedLogText = this.state.componentLogs.map((entry) => {
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
          {this.state.componentLogs.slice(0, numEntries)
            .map(entry => (
              <tr>
                <td>{entry.execution_num}</td>
                <td>
                  {fixedLogText.map(item => (
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
