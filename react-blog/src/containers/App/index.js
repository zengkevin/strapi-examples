import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from '../HomePage';
import ArticlePage from '../ArticlePage';
import Navbar from '../../components/Navbar';

import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/:articleId" component={ArticlePage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
