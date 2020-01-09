import React from 'react';
import io from 'socket.io-client';
import OAuth from '../Util/OAuth';
import { API_URL } from '../../config';

const socket = io(API_URL);

export default class SignIn extends React.Component {
  render() {
    return (
      <div>
        <p>Sign up!</p>
        <OAuth socket={socket} provider={'github'} key={'github'} />
      </div>
    );
  }
}
