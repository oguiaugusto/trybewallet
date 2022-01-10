import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Wallet, NotFound } from '../pages';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/carteira" component={ Wallet } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default Routes;
