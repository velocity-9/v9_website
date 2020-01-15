import React from 'react';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import { BACKEND_BASE_URL } from '../../../../config';

export default class OAuth extends React.Component {
  state = {
    user: {},
    isDisabled: false
  };

  constructor(props) {
    super(props);

    // See https://www.freecodecamp.org/news/this-is-why-we-need-to-bind-event-handlers-in-class-components-in-react-f7ea1a6f93eb/
    this.startAuth = this.startAuth.bind(this);
    this.closeCard = this.closeCard.bind(this);
  }

  componentDidMount() {
    const { socket, provider } = this.props;

    socket.on(provider, (user) => {
      this.popup.close();
      this.setState({ user });
    });
  }

  checkPopup() {
    // Set interval returns the ID to be used by clearInterval()
    const check = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        this.setState({ isDisabled: false });
      }
    }, 1000);
  }

  openPopup() {
    const width = 600;
    const height = 600;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);
    const url = `${BACKEND_BASE_URL}/api/auth/${this.props.provider}?socketId=${this.props.socket.id}`;

    return window.open(url, '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`);
  }

  startAuth(e) {
    if (!this.state.isDisabled) {
      e.preventDefault();
      this.popup = this.openPopup();
      this.checkPopup();
      this.setState({ isDisabled: true });
    }
  }

  closeCard() {
    this.setState({ user: {} });
  }

  render() {
    const { user } = this.state;
    const { name, photo } = user;

    return (
      <div>
        { name
          ? (
            <div>
              <img src={photo} alt={name} />
              <h4>{name}</h4>
              <Button variant="contained" onClick={this.closeCard}>Sign Out</Button>
            </div>
          )
          : (
            <div>
              <Button variant="contained" onClick={this.startAuth}> Sign in with GitHub</Button>
            </div>
          )
        }
      </div>
    );
  }
}

OAuth.propTypes = {
  provider: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired
};
