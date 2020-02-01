import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Home from './component/Home';
import Book from './component/Book';

class App extends Component {
  state = {}
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Book/:keyword" component={Book} />

          </Switch>
        </Router>

      </div>
    );
  }
}


export default App;
