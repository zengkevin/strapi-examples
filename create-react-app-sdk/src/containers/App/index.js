import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AuthPage from '../../containers/AuthPage';
import ConnectPage from '../../containers/ConnectPage';
import HomePage from '../../containers/HomePage';
import PrivateRoute from '../../containers/PrivateRoute';

import './styles.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            {/* A user can't go to the HomePage if is not authenticated */}
            <Route path="/auth/:authType/:id?" component={AuthPage} />
            <PrivateRoute path="/" component={HomePage} exact />
            <Route exact path="/connect/:provider" component={ConnectPage} />
            {/* <PrivateRoute exact path="/product" component={ProductPage} />
            <PrivateRoute path="/:contentType/:id" component={EditPage} />
            <Route path="" component={NotFoundPage} /> */} */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
