import React, { Component } from 'react';
import { Provider } from 'react-redux';

import AuthentificationContainer from './containers/Authentification'
import UserContainer  from './containers/User'
import { Router, Route } from 'react-router'


class App extends Component {
  render() {
    return (
      <Provider>
        <AuthentificationContainer/>
      
      </Provider>
    );
  }
}

export default App;
