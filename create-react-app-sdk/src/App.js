import React, { Component } from 'react';
import Strapi from 'strapi-sdk-javascript';
import logo from './logo.svg';
import './App.css';
const strapi = new Strapi('http://localhost:1337');

class App extends Component {
  async componentDidMount() {
    try {
      const c = await strapi.getEntries('product');
      console.log(c);
    } catch(err) {
      console.log(err);
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
