// @flow

import React from 'react';

type Props = {
  github_repo: ?string
};

type State = {
  github_repo: string,
  isLoaded: boolean,
  componentLogs: Array<ComponentLogItem>
};

export default class LogTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      github_repo: this.props.github_repo != null ? this.props.github_repo : '',
      isLoaded: false,
      componentLogs: []
    };
  }

  componentDidMount() {
    this.getComponentLogs().then();
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
            'Access-Control-Allow-Credentials': 'true'
          }
        });
      if (!result.ok) {
        throw new Error(result.statusText);
      }

      console.log(result);

      const json = await result.json();
      console.log(json);
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
      return (<p>Loading...</p>);
    }

    console.log(this.state.componentLogs);

    const tableEntries = this.state.componentLogs.map((entry) => {
      if (entry.log_text != null) {
        return {
          execution_num: entry.execution_num,
          log_lines: entry.log_text.split('\n'),
          log_error: entry.log_error
        };
      }
      return { execution_num: entry.execution_num, log_lines: [], log_error: entry.log_error };
    }).filter((entry) => entry.execution_num !== 0);

    return (
      <div>
        <table border="1">
          <tr>
            <th>Execution Number</th>
            <th>Log Text</th>
            <th>Log Error</th>
          </tr>
          {tableEntries.map((entry) => (
            <tr>
              <td>{entry.execution_num}</td>
              <td>
                {entry.log_lines.map((item) => (
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
