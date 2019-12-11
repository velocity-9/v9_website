import React from 'react';
import Home from './Components/Pages/Home';

export default class App extends React.Component {

  // componentDidMount() {
  //   fetch('/api/getUsername')
  //     .then(res => res.json())
  //     .then(user => this.setState({ username: user.username }));
  // }

  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}
